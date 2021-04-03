import React, { useEffect, useState } from 'react';
// import productsData from '../../fakeData/fakeData.json';
import Products from '../Products/Products';
import './home.css'
const Home = () => {
    const [product, setProduct] = useState([]);
    const url = `http://localhost:5000/products`;
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
            {/* <div className="d-flex justify-content-center" id="spinner">
                <div className="spinner-border" role="status">  
                </div>
            </div> */}
        </div>
    );
};

export default Home;
