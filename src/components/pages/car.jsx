import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import cancel from "../../images/icons/cancel.svg";
import check from "../../images/icons/check.svg";


function Car({myCarListItems, setCarListItems}) {

    const [total, setTotal] = useState(0)
    let [successState,setSuccessState]=useSearchParams();
    const navigate= useNavigate()

    let counter =0

    useEffect(() => {
        myCarListItems.map( item => counter=counter+(item.price*item.quanty))
        setTotal(counter)
    },[myCarListItems])
        
    function increase(name) {
        let product = myCarListItems.find(item => item.name === name)
        product.quanty=product.quanty+1;
        setCarListItems([...myCarListItems])
    }
    function decrease(name) {
        let product = myCarListItems.find(item => item.name === name);
        if(product.quanty > 1){product.quanty=product.quanty-1};
        setCarListItems([...myCarListItems])
    }
    function remove(name){
        let newList = myCarListItems.filter(item => item.name !== name);
        setCarListItems(newList)
    }

    //!Pay
    function pay (){
        if(myCarListItems.length ===0){
            toast.error("No has seleccionado productos")
        }else{
            fetch('http://localhost:2000/API/create-checkout-session',{
                method:'POST',
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body:JSON.stringify(myCarListItems)
            }).then(res => res.json()).
            then(json => {console.log(json);  window.location.replace(json.url)}).
            catch(err => console.log(err))
        }
       
    }
    

  return (
    <div className=' loginBg  p-5 '>
        <Toaster></Toaster>
        { successState.get('success')===null &&
             <div className="d-flex fullContainer flex-row justify-content-between  align-items-center flex-wrap flex-md-nowrap">
                <div className="fit-content d-flex flex-column bg-white rounded-5 p-5 col-12 col-md-4 gap-2 ">
                    <h1  className="fw-bold text-green nunito">Mi carrito</h1>
                    {
                        myCarListItems.map(item =>{
                            return(<div key={item.name} className='d-flex flex-row justify-content-between'>
                                <span className="text-secondary fs-4">{item.name}</span>
                                <span className="text-secondary fs-4">{item.price}$</span>
                            </div>)
                        }) 
                    }
                    <hr />
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <span className="fs-1 nunito text-dark">Total</span>
                        <span className="fs-2 nunito text-dark">{total}$</span>
                    </div>
                    <button onClick={pay} className="btn btn-success bg-green text-white rounded-5 nunito fs-3 fw-bold my-1">Pagar</button>
                </div>
                <div className="fit-content d-flex flex-column bg-white rounded-5 p-5  col-12 col-md-7 gap-3">
                    <h1 className="fw-bold text-green nunito">Items:</h1>
                    {
                        myCarListItems.map( item =>{
                            return(
                            <div key={item.name} className='d-flex flex-row justify-content-between align-items-center flex-wrap flex-sm-nowrap'>
                                <button className="d-sm-block d-none btn btn-lg rounded-5 btn-dark  fw-bold nunito" onClick={()=>remove(item.name)}>X</button>
                                <span className="fs-4 text-secondary mb-3">{item.name}</span>
                                <span className="d-flex flex-row align-items-center gap-3">
                                    <button className="btn btn-lg rounded-5 btn-light  fw-bold" onClick={() => decrease(item.name)}>-</button>
                                        <span className="fs-4 text-secondary">{item.quanty}</span>
                                    <button className="btn btn-lg rounded-5 btn-light  fw-bold" onClick={()=>increase(item.name)}>+</button>
                                     <button className=" d-block d-sm-none btn btn-lg rounded-5 btn-dark  fw-bold nunito" onClick={()=>remove(item.name)}>X</button>
                                </span>
                                <hr className="d-block d-sm-none"/>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        } 

        {
            successState.get("success")==="true" &&
            <div className="d-flex fullContainer flex-row justify-content-center  align-items-center flex-wrap flex-md-nowrap">
                <div onClick={() => navigate("/account")} className="bigger d-flex flex-column justify-content-center align-items-center bg-white rounded-5 text-center p-5 col-10 col-md-4 gap-2 ">
                    <h1 className="fw-bold text-green nunito">¡Pago realizado con éxito!</h1>
                    <img src={check} alt="checkIcon" width="100px" className='opacity-50'/>
                </div>
            </div>
        }

        {
        successState.get("canceled")==="true" &&
            <div className="d-flex fullContainer flex-row justify-content-center  align-items-center flex-wrap flex-md-nowrap">
                <div onClick={() => navigate("/account")} className="bigger fit-content d-flex flex-column justify-content-center align-items-center bg-white rounded-5 p-5 col-10 text-center col-md-4 gap-2 ">
                    <h1 className="fw-bold text-green nunito">No se realizó el pago</h1>
                    <img src={cancel} alt="errorIcon" width="100px" className='opacity-50'/>
                </div>
            </div>
        }
    </div>
  )
}

export default Car