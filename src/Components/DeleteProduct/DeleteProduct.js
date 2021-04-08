import React from 'react';

const DeleteProduct = (props) => {
    const {_id,name,price,quantity} = props.product;
    const deleteProduct=(id,elem) => {
        //console.log(event.target.parentNode);
        fetch(`https://obscure-ridge-98206.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
        .then(result =>{
             alert('Deleted successfully -please check Home Page  ')
        // if (result) {
        //    const tr= document.getElementById('tableRow');
        //    elem.parentNode.parentNode.removeChild() 
        // }
    })}
    return (
       
            <>
           <tr id="tableRow" className="text-light">
                        <td>{name}</td>
                        <td>{price}</td>
                        <td>{quantity}</td>
                        <td> {<button onClick={() =>deleteProduct(_id,this)}> Delete </button>}</td>
                    </tr>
        </>
     
      
    );
};

export default DeleteProduct;