import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import DeleteProduct from '../DeleteProduct/DeleteProduct';
import './admin.css'
const Admin = () => {
  const imgApi = '7bb7d090f59fadc4402c1878c34f21f9';
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageUrl, setImageUrl] = useState()

  const [allProducts, setAllProducts] = useState([])
  const url = `https://obscure-ridge-98206.herokuapp.com/products`;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllProducts(data))
    // setProduct(productsData)
    console.log(allProducts)
  }, [])

  const onSubmit = data => {
    console.log(data)
    const productData = {
      name: data.name,
      price: data.price,
      about: data.about,
      quantity: data.quantity,
      img: imageUrl
    }
    const url = `https://obscure-ridge-98206.herokuapp.com/admin`
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(productData)
    }).then(res => alert('Product added successfully'))

  };
  const handleImage = (event) => {
    console.log(event.target.files);
    const imageData = new FormData()
    imageData.set('key', '7bb7d090f59fadc4402c1878c34f21f9')
    imageData.append('image', event.target.files[0])
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        setImageUrl(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div className="row justify-content-around">
      <div className="col-4 formCls text-center">
        <h2 className="text-light">Add Product </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue="productName" {...register("name")} />
          <br />
          <input type="text" name="about" placeholder="about" {...register("about")} />
          <br />
          <input type="number" name="price" placeholder="price" {...register("price")} />
          <br />
          <input type="number" name="quantity" placeholder="quantity"  {...register("quantity")} />
          <br />
          <input name="image" type="file" defaultValue="" onChange={handleImage} />

          <br />
          <input type="submit" />
        </form>
      </div>
      <div className="col-4">

        <table className="table table-hover mt-5">
          <thead>
            <tr className="text-light">
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              allProducts.map(product => <DeleteProduct product={product} key={product._id}></DeleteProduct>)
            }
          </tbody>
        </table>


      </div>
    </div>

  )
};

export default Admin;