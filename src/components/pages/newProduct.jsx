import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'



function NewProduct({myId,upload, download}) {

    //!HOOKS
    const [data, setData] = useState({scientistName:"", commonName:"", price:"", photos:"", description:"", type:"",createdBy:myId});
    const[imgFile,setImgFile]=useState();
    

    //!NAVIGATE
    const navigate=useNavigate();
    function goTo(route) {
      navigate(route);
    }

    function createItem() { 
        fetch('http://localhost:2000/API', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json()) 
            .then(json => {
              if(json.error){
                toast.error("Error: "+ json.mensaje)
              }else{
                toast.success('¡Tu planta ha sido publicada!')
                navigate(`/item/${data.commonName}`)
                setData({scientistName:"", commonName:"", price:"", photos:"", description:"", type:"",createdBy:myId})
              }
            })
            .catch(err => {
                toast.error("Error: "+ err.message)
            })
    }

  //!IMG UPLOADER AND DOWNLOADER (GET URL)
    async function getImgURL() {
      let name= `products/${data.commonName}-${myId}`

      if(data.commonName==="" || data.scientistName==="" || data.price==="" || data.type==="" || data.description==="" ){
        toast.error("Complete los campos vacios")
        return null
      }
          await upload(name,imgFile);
          await download(name).then(url => setData({...data,photos:url})) 
    }

    //!CREATE PRODUCT WHEN Y GET A IMG URL
    useEffect(() => {
      if(data.photos===""){return null}else{createItem()}
    }, [data.photos])
    

  return (
    <div className='d-flex justify-content-center align-items-center py-5'>
      <Toaster />
        <div className='d-flex flex-column col-12 col-sm-7 col-md-5 gap-3 rounded-5 my-5'>
            <h1  className="fw-bold text-dark">Comienza a vender</h1>
            <input className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" value={data.scientistName} onChange={e => setData({...data,scientistName:e.target.value})} placeholder='Nombre científico' type="text" />
            <input className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" value={data.commonName} onChange={e => setData({...data,commonName:e.target.value})} placeholder='Nombre común' type="text" />

            <input className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3"  onChange={e => setImgFile(e.target.files[0])} placeholder='test' type="file" />
 
            <textarea className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" value={data.description} onChange={e => setData({...data,description:e.target.value})} placeholder='Descripción'  />
            <input className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" value={data.price} onChange={e => setData({...data,price:e.target.value})} placeholder='Precio' type="number" />
            <select  className="form-select nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" aria-label=".form-select-lg " defaultValue='default' onChange={e => setData({...data,type:e.target.value})}>
                <option value="default" disabled="disabled" >Elija una opción</option>
                <option value="Interior" >Interior</option>
                <option  value="Exterior" >Exterior</option>
            </select>
            <button className="btn btn-success bg-green text-white w-100 fw-bold rounded-5 fs-3 nunito" onClick={getImgURL}>Subir producto</button>
        </div>

    </div>
  )







}

export default NewProduct