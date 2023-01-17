import React, { useState } from 'react'
import ProductCard from "../pure/productCard"
import { useNavigate } from 'react-router-dom'

function ProductsList({productsListName, data}) {

  const navigate=useNavigate();
  function goTo(route) {
    navigate(route);
  }

  const style={width: "3rem", height: "3rem"}

  return (
    <div className='container mb-5 text-center'>
        <h1 className='mb-5 fw-bold text-dark'>{productsListName}</h1>
        {data[0]?         
        <div className="d-flex flex-wrap justify-content-center mt-5">
        {data.map(item => <ProductCard goToItem={ () => goTo(`/item/${item.commonName}`)}  key={item.id} commonName={item.commonName} description={item.description} price={item.price} photos={item.photos} type={item.type} scientistName={item.scientistName}/>)}
        </div>:
        <div class="spinner-grow my-5 text-warning" style={style} role="status">
        <span class="visually-hidden">Loading...</span>
        </div>}
    </div>
  )
}

export default ProductsList