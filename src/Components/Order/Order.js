import React from 'react';
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../App';

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let productId =sessionStorage.getItem('productId');
    return (
        <div>
                <h1>User: {loggedInUser.email}</h1>
                <h3>Your product:{productId}</h3>
        </div>
    );
};

export default Order;