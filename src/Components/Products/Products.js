import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './products.css'
const Products = (props) => {
    const {_id,name,about,price,img}=props.product;
    console.log(props.product)
    console.log(_id)
    const history =useHistory()
    const handleBuyNow=(id)=>{
        console.log(id)
        history.push(`/checkout/${id}`)
    }
    return (
        <div className="col text-center">
            <div className="card cardImage">
                <img src={img} class="card-img-top" alt="..." />
                <div className="card-body">
                <h5 className="card-title">{name}</h5> 
                <p className="card-text">{about}</p>
                  <div><h3>{price}$</h3>
                  {
                      <Link to={`/checkout/${_id}`}><button className="btn btn-primary" onClick={()=>handleBuyNow(_id)}>Buy Now</button></Link>
                  }
                       </div>
                </div>
            </div>
        </div>
    );
};

export default Products;