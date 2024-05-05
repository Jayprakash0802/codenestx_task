import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./context";

export default function EditProduct() {
    const { currUser } = useContext(UserContext);
    const token = user?.token
    const { id } = useParams();
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [product, setProduct] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`);
                setProduct(response?.data);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    }, [])

    useEffect(() => {
        if (product) {
            setPrice(product.price || '');
            setCategory(product.category || '');
            setName(product.name || '');
        }
    }, [product]);

    const edit = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append('name', name);
        productData.append('category', category);
        productData.append('price', price);

        try {
            await axios.patch(`${process.env.REACT_APP_BASE_URL}/product/${id}/edit`, productData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
            navigate(`/`);

        } catch (err) {
            console.log(err.response.data.message);
        }
    }


    return (
        <>
            {currUser ?
                <div className="product__detail">
                    <h1>Edit Product</h1>
                    <section className="">
                        <div className="container">
                            <form action="form" onSubmit={edit}>
                                <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} autoFocus />
                                <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
                                <input type="text" placeholder="Category" value={price} onChange={e=>setCategory(e.target.value)} />
                                <button type="submit"> Submit</button>
                            </form>
                        </div>
                    </section>
                </div>
                :
                <h1>You are Not admin</h1>
                }
        </>
    );
}