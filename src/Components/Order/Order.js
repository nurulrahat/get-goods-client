import React from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import OrderList from '../OrderList/OrderList';

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderData,setOrderData]= useState([])
    let productId =sessionStorage.getItem('productId');
    useEffect(() => {
        fetch('https://obscure-ridge-98206.herokuapp.com/orderdata?eml='+loggedInUser.email,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              
            }
        })
        .then(res=>res.json())
        .then(data=>setOrderData(data))
    },[])
    
    return (
        <div className="container text-light">
                <h1>User: {loggedInUser.email}</h1>
                <table className="table table-hover mt-5">
                <thead>
                    <tr className="text-light">
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orderData.map(product=> <OrderList product={product}></OrderList>)
                }
                </tbody>
            </table>
               
        </div>
    );
};

export default Order;