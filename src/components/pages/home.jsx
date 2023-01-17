import React, { useEffect, useState } from 'react'
import Jumbotron from "../pure/jumbotron"
import Section from "../pure/section"
import ThreeCol from "../container/threeCol"
import ProductList from "../container/productsList"
import { useNavigate,useSearchParams } from 'react-router-dom'



function Home() {

  //HOOKS
  const [insideData, setInsideData] = useState([]);
  const [outsideData, setOutsideData] = useState([]);

  //!MODEL FUNCTION TO GET DATA 
  function callAPI(route,where) {
    fetch(`http://localhost:2000/API/${route}`).
    then(data => data.json()).
    then(json =>{
      where(json)
    }).
    catch( error => console.log(error))
  }
  useEffect(() => {
    callAPI("interior",setInsideData);
    callAPI("exterior",setOutsideData);
  }, [])


  //!NAVIGATE
  const navigate = useNavigate()
  function goTo(route) {
    navigate(route);
  }




  return (
    <div className="d-flex flex-column pt-4 bg-grey">
      <Jumbotron navigate={() => goTo("/shop")} background="backgroundJumbotron1" tittle="Adopta una planta" text="Nosotros nos encargamos de que llegue a tus manos" btnText="¡Obten una!"/>
      <ThreeCol/>
      <Section color="insideBg" textColor="text-light" tittle="Interior" desc="Descubre las mejores plantas para mantener en el interior de tu hogar" btn="¡Conocelas!" btnColor="btn-success btn-lg bg-green rounded-5 text-white nunito fs-3 fw-bold"/>
      <ProductList data={insideData} productsListName="De interior mas vendidas"/>
      <Section color="outsideBg justify-content-end text-end" textColor="text-light " tittle="Tu jardín" desc="Decora balcones, jardines y terrazas con hermosas plantas de exterior" btn="¡Descubrir!" btnColor="btn-success btn-lg bg-green rounded-5 text-white nunito fs-3 fw-bold"/>
      <ProductList   data={outsideData} productsListName="De exterior mas vendidas"/>
      <Jumbotron navigate={() => goTo("/sell")} background="backgroundJumbotron2" tittle="Vende" text="Comienza a expandir tu producción, vende tus plantas" btnText="¡Comenzar!"/>


    </div>
  )
}

export default Home