const { v4: uuid } = require("uuid")


const Product = require("../../db/models/product")

const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(new Error("Fill in all fields (Login)"));
        }
        if(username !== "RealAdmin" && password !== "admin@123") return next(new Error("Invalid credentials"))
        const token = jwt.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token });

    } catch (error) {
        console.error(error);
        return next(new Error("Something went wrong"));
    }
};

const create = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { username, password } = decodedToken;

        if (!username || !password) {
            return next(new Error("Invalid token"));
        }

        if (username === "RealAdmin" && password === "admin@123") {

            const { price, name, category } = req.body;

            if (!price || !name || !category) return next(new Error("fill in all fields"))
            const newProduct = await Product.create({ product_id: uuid(), price, name, category });
            res.status(200).json(newProduct);
        } else {
            return next(new Error("Unauthorized"));
        }

    } catch (error) {
        console.error(error);
        return next(new Error("Something went wrong"));
    }
};
const edit = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { username, password } = decodedToken;
        const productId = req.params.id;
        if (!username || !password) {
            return next(new Error("Invalid token"));
        }
        if (username === "RealAdmin" && password === "admin@123") {

            const { price, name, category } = req.body;
            if (!price || !name || !category) return next(new Error("fill in all fields"));
            const updateFields = { price, name, category };
            let updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateFields });
            if (!updatedProduct) return next(new Error("couldn't update product"))
            res.status(200).json(updatedProduct);
        } else {
            return next(new Error("Unauthorized"));
        }
        
    } catch (error) {
        return next(new Error(error));
    }
}

const delProduct = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { username, password } = decodedToken;
        const productId = req.params.id;
        if (username === "RealAdmin" && password === "admin@123") {
            if(!productId) return next(new Error("product unavailable"))
                await Product.findByIdAndDelete(productId);
            res.json(`product ${productId} deleted successfully`)
        }
        else{
            return next(new Error("Unauthorized"));
        }

    } catch (error) {
        return next(Error(error));
    }
}

const getProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        return next(new Error(error))
    }
}

module.exports = { login, edit, delProduct, create, getProduct }