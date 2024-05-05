import { Link } from "react-router-dom";

export default function ProductItem({product}){
    const {_id,product_id,name,price, category} = product;

    return(
        <div className="product__item">

            <div className="product__content">
                <div className="product__container-btn">
                    <Link to={`product/${_id}/edit`}> Edit</Link>
                    <Link to={`product/${_id}/delete`}> Delete</Link>
                </div>
                <p>{category}</p>
                <p>product_id: {product_id}</p>
                <p>product_name: {name}</p>
                <p>price: {price}</p>
            </div>
        </div>
    );
}