import React from 'react';

const OrderList = (props) => {
    console.log(props.product)
    const { name, quantity, price, date } = props.product;

    return (
        <>
           <tr className="text-light">
                        <td>{name}</td>
                        <td>{price}</td>
                        <td>{quantity}</td>
                        <td>{date}</td>
                    </tr>
        </>
    );
};

export default OrderList;