import axios from "axios";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";

export default function CreateProduct() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')

    const { currUser } = useContext(UserContext);
    const token = currUser?.token


    const navigate = useNavigate();
    const handleSubmit = (e) => {
        const productData = new FormData();
        productData.append('name', name);
        productData.append('category', category);
        productData.append('price', price);
        const create = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, productData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
                if (response.status === 201) return navigate(`/`)
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
        create();
    }


    return (
        <>
            {currUser ?
                <div className="product__detail">
                    <h1>Create Product</h1>
                    <section className="">
                        <div className="container">
                            <form action="form" onSubmit={handleSubmit}>
                                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} autoFocus />
                                <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                                <input type="text" placeholder="Category" value={price} onChange={e => setCategory(e.target.value)} />
                                <button type="submit">Submit</button>
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