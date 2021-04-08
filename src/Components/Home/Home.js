import React, { useEffect, useState } from 'react';
// import productsData from '../../fakeData/fakeData.json';
import Products from '../Products/Products';
import './home.css'
const Home = () => {
    const [product, setProduct] = useState([]);
    const [spin, setSpin] = useState(true);
    const url = `https://obscure-ridge-98206.herokuapp.com/products`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setSpin(false)
            })
        // setProduct(productsData)

    }, [])

    return (
        <div className="container">
            { spin ? 
            <div class="d-flex justify-content-center text-center m-5 ">
                <div id="spinnerId" class="spinner-border text-success m-5 " role="status">
                    {/* <span class="visually-hidden">Loading...</span> */}
                </div>
            </div> :
                <div className="row row-cols-1 row-cols-md-3 g-5 background ">
                    {
                        product.map(product => <Products product={product} key={product._id}></Products>)

                    }

                </div>
            }
        </div>
    );
};

export default Home;
