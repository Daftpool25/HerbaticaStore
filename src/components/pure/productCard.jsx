import React from 'react';

function ProductCard({goToItem,commonName,scientistName,description,price,photos,type}) {

  const style1={width: "18rem"}
  return (
 

    <div className="card m-2 rounded-5 overflow-hidden border-0" style={style1} onClick={goToItem}>
      <div className='card-img-top position-relative'>
           <img src={photos} height="300px" className="card-img-top" alt="product"/>
           <span className="nunito bg-green rounded-5 px-4 fw-bold fs-4 text-white position-absolute top-0 end-0 mx-1 my-2">{type}</span>
      </div>
    <div className="py-3 d-flex flex-row justify-content-center">
      <div className="w-75 d-flex flex-column text-start">
         <h2 className="nunito fs-4 fw-bold text-dark">{commonName}</h2>
         <p className="nunito fw-light text-secondary">{scientistName}</p>
      </div>
      <div>
          <p className="text-green fw-bold fs-4">${price}</p>
      </div>
    </div>
    </div>
  )
}

export default ProductCard

/**

 */