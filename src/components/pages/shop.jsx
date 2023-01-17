import React, { useState,useEffect, useRef } from 'react'
import ProductList from "../container/productsList"
import { useSearchParams } from 'react-router-dom'



function Shop() {


  //Hooks
  const [data, setData] = useState([]);


  //! GET PRODUCTS LISTS
  useEffect(() => {
    
    if(params.get('name')){
      fetch(`http://localhost:2000/API/shop?name=${params.get('name')}`).
      then(response => response.json())  
     .then(json => {setData([json])})    
     .catch(err => console.log('Solicitud fallida', err)); 
    }else{
        getAllProducts()
    }

  }, [])

  function getAllProducts(){
    fetch('http://localhost:2000/API')
    .then(response => response.json())  
    .then(json => {setData(json)})    
    .catch(err => console.log('Solicitud fallida', err));
  }
  
  //! GET PRODUCTS FROM A SEARCH
  const [params, setParams] = useSearchParams()
  function searchProducts() {
    fetch(`http://localhost:2000/API/shop?name=${params.get('name')}`).
         then(response => response.json())  
        .then(json => {setData([json])})    
        .catch(err => console.log('Solicitud fallida', err)); 
  }

  //!SORTS

  const sortByScientisInput=useRef("");
  function sortScientistName(event){
    event.preventDefault();
    const newData = data.filter(item => item.scientistName===sortByScientisInput.current.value);
    setData(newData)
  }

  const sortByPricesInput=useRef("");
  function sortByPrices(event){
    event.preventDefault();
    const value=sortByPricesInput.current.value;
    const newData= data.filter(item => item.price < value)
    setData(newData)
  }

  function sortByAsc(event){
    event.preventDefault();
    data.sort((a,b) => a.price - b.price)

    setData([...data])
  }

  function sortByDesc(event){
    event.preventDefault();
    data.sort((a,b) =>   b.price - a.price)

    setData([...data])

  }

  function outsideFilter(method){
    if(method==="Exterior"){
      const newData= data.filter( item => item.type==method)
      setData(newData);
      return;
    }
    const newData= data.filter( item => item.type==method)
    setData(newData)
  }





  return (
    <div className="bg-grey">

      <div className='d-flex flex-row flex-wrap flex-sm-nowrap align-items-center justify-content-center m-5 px-4 py-4 gap-4 bg-white rounded-5'>
        <input value={params.get('name')} onChange={e => setParams({name:e.target.value})} type="text"  placeholder="Buscar"  className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 rounded-5 px-4 py-3" />
        <button onClick={searchProducts} className="btn btn-dark text-white col-12 col-sm-3 fw-bold rounded-5 fs-3 nunito">Buscar</button>
      </div>

      <div className='d-flex flex-row flex-wrap flex-sm-nowrap mx-5 '>
          <div id='filterMenu' className='d-flex flex-column  bg-white rounded-5 p-5 mb-5'>

                <h1 className='fw-bold text-dark mb-3'>Filtros:</h1>

                <form onSubmit={sortScientistName}>
                  <label className="text-green fs-4 fw-bold nunito mt-4" htmlFor="searchScientistNameInput">Nombre científico</label>
                    <input className="form-control border-0 bg-grey fs-4 nunito text-dark" type="text" id='searchScientistNameInput' ref={sortByScientisInput} />
                </form>
                <form onSubmit={sortByPrices}>
                   <label className="text-green fs-4 fw-bold nunito mt-4" htmlFor="searchScientistName">Precio máximo</label>
                     <input className="form-control border-0 bg-grey fs-4 nunito text-dark" id='searchScientistName'  type="numbers" ref={sortByPricesInput} />
                </form>

                <label className="text-green fs-4 fw-bold nunito mt-4">Ordenar por:</label>
                  <button className="btn btn-light text-dark rounded-5 nunito fs-4 fw-light my-1" onClick={sortByAsc}>Menor precio</button>
                  <button className="btn btn-light rounded-5 nunito fs-4 fw-light my-1" onClick={sortByDesc}>Mayor precio</button>
                <label className="text-green fs-4 fw-bold nunito mt-4">Categorías:</label>
                  <button className="btn btn-light text-dark rounded-5 nunito fs-4 fw-light my-1" onClick={()=>outsideFilter("Interior")}>Interior</button>
                  <button className="btn btn-light rounded-5 nunito fs-4 fw-light my-1" onClick={() =>outsideFilter("Exterior")}>Exterior</button>
                  
                  <button className="btn btn-success bg-green text-white rounded-5 nunito fs-4 fw-bold my-1" onClick={getAllProducts}>Mostrar todo</button>

          </div>

          <ProductList  productsListName="Consigue tu planta ideal" data={data}/>
      
      </div>
    </div>
  )
}

export default Shop