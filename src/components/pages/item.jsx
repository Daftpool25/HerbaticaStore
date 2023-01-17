import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../pure/modal';
import toast, { Toaster } from 'react-hot-toast';

function Item({myId, setCarListItems, myCarListItems, userState}) {

  const [product, setProduct] = useState({})
  const  [editMode, setEditMode] = useState(false)
  const params=useParams();
  useEffect(() => {
    fetch(`http://localhost:2000/API/shop/${params.name}`).
      then(response => response.json()).
      then(json => setProduct(json)).
      catch(error => toast.error("Error al cargar"))
  }, [])
  

  //!Navigate
  const navigate=useNavigate();
  function goTo(route) {
    navigate(route);
  }

  //!ADD PRODUCT TO CAR AND VERIFY IF IT ALREADY EXIST
  function addProductToCar() {
    if(!userState){
      toast.error("Necesitas crear un usuario")
    }
    else if (myCarListItems.length===0){
      setCarListItems([...myCarListItems,{name:product.commonName,price:product.price,quanty:1}])
      toast.success(`${product.commonName} agregada al carrito`)

    }else{

      let itemToIncrease=myCarListItems.find(item => item.name===product.commonName);

      if(itemToIncrease !== undefined){
          itemToIncrease.quanty=itemToIncrease.quanty+1;
          setCarListItems([...myCarListItems])
          toast.success(`Una nueva unidad de ${product.commonName} agregada al carrito`)
          return
      }
      setCarListItems([...myCarListItems,{name:product.commonName,price:product.price,quanty:1}])
      toast.success(`${product.commonName} agregada al carrito`)
    }
  }


  //!EDIT PRODUCT
  function editProduct(event) {
    event.preventDefault()
    fetch(`http://localhost:2000/API/${params.name}`,{
      method:'PUT',
      body:JSON.stringify(product),
      headers: {
        'Content-type': 'application/json'
      }

    }). then(response => response.json()).
    then(json => {
      if(json.error){
        toast.error(json.mensaje);
      }else{
        toast.success('¡Producto Editado!');
        setEditMode(false)
      }

    }).
    catch(error => {
      toast.error(error);
    })
    
  }
  
  //!DELETE PRODUCT
  function removeProduct() {
    fetch(`http://localhost:2000/API/${params.name}`,{
      method:'DELETE',
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }).
      then(response => response.json()).
      then(json => {
        if(json.error){
          toast.error(json.mensaje);
        }else{
          toast.success('¡Producto Eliminado!');
        }
      }).
      catch(error => {
        toast.error(error.message);
      })
  }

  const style={width: "3rem", height: "3rem"}


  return (
  
   <div className="fullContainer w-100 position-relative backgroundJumbotron1">
       <Modal remove={removeProduct} tittle="Espera!" desc="¿Estás seguro deseas eliminar este producto?" btn1="No" btn2="Si, eliminar"/>
        <Toaster></Toaster>
   {
    product.commonName === undefined ?
        <div className="w-100  p-5 d-flex align-items-center justify-content-center">
             <div class="spinner-grow my-5 text-warning" style={style} role="status">
             <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        :
        <div>
            <img src={product.photos} className="w-100" alt="product"/>
            {
              editMode?
              <div className="d-flex flex-column align-items-center p-5 bg-white rounded-bottom rounded-5">
                  <form className="d-flex flex-column gap-4 justify-content-center w-75 py-5">
                    
                    <h1 className='nunito text-dark fw-bold fs-1 text-center mb-5'>Haz algunos cambios</h1>

                    <label htmlFor="commonNameInputEdit" className="nunito fs-3 text-dark fw-light">Nombre:</label>
                    <input value={product.commonName} onChange={e => setProduct({...product,commonName:e.target.value})} className='form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3' id="commonNameInputEdit" type="text" />
                    
                    <label htmlFor="scientistNameInputEdit" className="nunito fs-3 text-dark fw-light">Nombre científico:</label>
                    <input value={product.scientistName} onChange={e => setProduct({...product,scientistName:e.target.value})} className='form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3' id="scientistNameInputEdit" type="text" />
                    
                    <label htmlFor="descriptionInputEdit" className="nunito fs-3 text-dark fw-light">Descripción:</label>
                    <textarea  value={product.description} onChange={e => setProduct({...product,description:e.target.value})} className='form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3' id="descriptionInputEdit" type="text" />
                    
                    <label htmlFor="typeInputEdit" className="nunito fs-3 text-dark fw-light">Categoría:</label>
                    <input value={product.type} onChange={e => setProduct({...product,type:e.target.value})} className='form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3' id="typeInputEdit" type="text" />
                    
                    <label htmlFor="priceInputEdit" className="nunito fs-3 text-dark fw-light">Precio:</label>                
                    <input value={product.price} onChange={e => setProduct({...product,price:e.target.value})} className='form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3' id="priceInputEdit" type="text" />
                    
                    <button onClick={editProduct} className="btn btn-lg btn-success bg-green text-white fs-2 fw-bold nunito rounded-5 my-2">Guardar Cambios</button>
                  </form>
              </div>
              :
              <div className="p-5 row g-0 bg-white rounded-bottom rounded-5"> 
              
                      
                    <div className="d-flex flex-column  justify-content-center">
                      <h1 id="tittle"  className="text-dark fw-bold text-dark nunito ">{product.commonName}</h1>
                      <p className="nunito fs-3 text-dark fw-regular mb-5">{product.description}</p>
                      <div className="d-flex flex-row flex-wrap flex-sm-nowrap justify-content-around">
                          <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                              <p className='text-secondary nunito fs-3 fw-light'>Nombre Científico</p>
                              <h2 className="fw-bold text-green nunito ">{product.scientistName}</h2>
                          </div>
                          <div className="col-5 text-center col-sm-auto">
                              <p className='text-secondary nunito fs-3 fw-light'>Categoría</p>
                              <h2 className="fw-bold text-green nunito ">{product.type}</h2>
                          </div>
                          <div className="col-5 text-center col-sm-auto">
                              <p className='text-secondary nunito fs-3 fw-light'>Precio</p>
                              <h2 className="fw-bold text-green nunito ">{product.price}$</h2>
                          </div>
                      </div>
                    </div>

                  <button className="btn btn-lg btn-success bg-green text-white fs-2 fw-bold nunito rounded-5 my-5" onClick={addProductToCar}>Agregar al carrito</button>
                  {
                  myId===product.createdBy?
                    <div className='d-flex flex-row justify-content-center my-1 gap-1'>
                      <button onClick={() => setEditMode(true)} className="nunito fs-1 rounded-5 fw-light btn btn-dark w-50 ">Editar</button><button data-bs-toggle="modal" data-bs-target="#exampleModal" className="nunito fs-1 rounded-5 fw-light btn btn-secondary w-50">Eliminar</button>
                    </div>
                  :
                    <span></span>
                  }
                  <p className="card-text text-center mb-5"><small class="text-muted">Last updated 3 mins ago</small></p>
              
            </div>
            }
        </div>
    }
   </div>
  
  )
}

export default Item

