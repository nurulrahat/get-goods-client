import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import './checkOut.css'
const CheckOut = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/products`
    console.log(id)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [product, setProduct] = useState({})
    useEffect(() => {

        fetch(`http://localhost:5000/checkout/${id}`)
            .then(response => response.json())
            .then(result => setProduct(result))


    }, [id])
    console.log(product)
    
    const handleCheckout = ()=> {
    
        sessionStorage.setItem('productId', id)
        console.log('productId stored',id)
    }

    return (
        <div className="container text-light">
            <h1>CheckOut</h1>
            <div className="cardCls" >
                <h3 className="">Product: {product.name}</h3>
                <p className="">About: {product.about}</p>
                <p className="">Price: {product.price}$</p>
                <p className="">Quantity: {product.quantity}</p>
                <label htmlFor="date">Order Date</label>
                <input type="date" name="date" id="date"/>
                <input type="text" name="name" id="name" placeholder="your name.."/>
                <button className="btn btn-primary" onClick={handleCheckout}>CheckOut</button>
            </div>


        </div>
    );
};

export default CheckOut;