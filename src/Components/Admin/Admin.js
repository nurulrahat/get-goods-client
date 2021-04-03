import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import './admin.css'
const Admin = () => {
    const imgApi='7bb7d090f59fadc4402c1878c34f21f9';
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageUrl,setImageUrl] =useState()
    const onSubmit = data => {
        console.log(data)
        const productData={
            name: data.name, 
            price: data.price,
            about: data.about,
            quantity: data.quantity,
            img: imageUrl
        }
        const url=`http://localhost:5000/admin`
        fetch(url,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        }).then(res=>console.log('database response successfully'))
       
    };
    const handleImage=(event)=> {
console.log(event.target.files);
const imageData = new FormData()
imageData.set('key','7bb7d090f59fadc4402c1878c34f21f9')
imageData.append('image',event.target.files[0])
axios.post('https://api.imgbb.com/1/upload', imageData)
  .then(function (response) {
    setImageUrl(response.data.data.display_url);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
const deleteProduct=(event,id)=> {
      //console.log(event.target.parentNode);
      fetch(`/delete/${id}`, {
          method: 'DELETE'
      }).then(response => response.json())
      .then(result =>{ console.log('deleted successfully')
      if (result) {
      event.target.parentNode.style.display='none' 
      }
  })}
    return (
        <div className="row justify-content-between">
        <div className="col-4 formCls text-center">
          <h2 className="text-light">Add Product </h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue="productName" {...register("name")} />
     <br/>
     <input type="text" name="about" placeholder="about" {...register("about")} />
     <br/>
     <input type="number" name="price" placeholder="price" {...register("price")} />
     <br/>
     <input type="number" name="quantity"  placeholder="quantity"  {...register("quantity")} />
     <br/>
      <input name="image" type="file" defaultValue=""  onChange={handleImage} />
      
      <br/>
      <input type="submit" />
    </form>
    </div>
    <div className="col-4">
      <button onClick={() =>deleteProduct()}> Delete </button>
    </div>
        </div>
   
   )
};

export default Admin;