import React, { useEffect, useState } from 'react';
// import productsData from '../../fakeData/fakeData.json';
import Products from '../Products/Products';
import './home.css'
const Home = () => {
    const [product, setProduct] = useState([]);
    const url = `https://obscure-ridge-98206.herokuapp.com/products`;
    let spin = false;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
        // setProduct(productsData)
        console.log(product)
    }, [])
    if (product) {
        spin = true;
    }
    //     const spinnerFeature=()=> {
    //         if(spin)
    //         document.getElementById("spinner").style.display="none"
    //     }
    // spinnerFeature();
    return (
        <div className="row row-cols-1 row-cols-md-4 g-5 background ">

            {
                product.map(product => <Products product={product} key={product._id}></Products>)

            }
            { <div class="d-flex justify-content-center m-5 ">
                <div id="spinnerId" class="spinner-border text-success m-5 d-none " role="status">
                    {/* <span class="visually-hidden">Loading...</span> */}
                </div>
            </div>}
        </div>
    );
};

export default Home;
