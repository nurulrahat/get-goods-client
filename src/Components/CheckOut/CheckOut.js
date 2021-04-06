import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
// import { useEffect, useState } from 'react/cjs/react.development';
import './checkOut.css';
import { UserContext } from '../../App';

const CheckOut = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { id } = useParams();
    // const url = `https://obscure-ridge-98206.herokuapp.com/products`
    console.log(id)

    console.log(loggedInUser)
    const [product, setProduct] = useState({})
    useEffect(() => {

        fetch(`https://obscure-ridge-98206.herokuapp.com/checkout/${id}`)
            .then(response => response.json())
            .then(result => setProduct(result))
    }, [id])
    console.log(product)

    const handleCheckout = () => {

        sessionStorage.setItem('productId', id)
        console.log('productId stored', id)
        const oderDate = document.getElementById('date').value;
        const userName = document.getElementById('name').value;
        const orderedDetails = {
            name: product.name,
            about: product.about,
            price: product.price,
            quantity: product.quantity,
            email: loggedInUser.email,
            user: userName,
            date: oderDate,
        }
        console.log(orderedDetails)
        const url = `https://obscure-ridge-98206.herokuapp.com/insertorder`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderedDetails)
        }).then(res => console.log('ordered database response successfully'))
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
                <input type="date" name="date" id="date" />
                <input type="text" name="name" id="name" placeholder="your name.." />
                <button className="btn btn-primary" onClick={handleCheckout}>CheckOut</button>
            </div>


        </div>
    );
};

export default CheckOut;