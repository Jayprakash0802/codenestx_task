import { useState,useEffect } from "react";
import axios from "axios"
import ProductItem from "./ProductItem";

export default function Home(){
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`)
                setProducts(response?.data)
            }catch(err){
                console.log(err.response.data.message)
            }
        }
        fetchProduct();
    },[])
    return(
        <>
            {products.length?
                <section className="products">
                    <div className="container product__container">
                        {products.map((product)=>(<ProductItem key={product?.id} product={product}/>))}
                    </div>
                </section>
                :
                <h2 className="center"> No Products found</h2>
            }

        </>
    );
}