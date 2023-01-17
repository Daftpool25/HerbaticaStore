import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../pure/modal';
import toast, { Toaster } from 'react-hot-toast';



function Account({userData, userState, myProducts, setMyProducts}) {

  const navigate=useNavigate();
  function goTo(route) {
    navigate(route);
  }

  //!GetMyProductsList
  function getMyProducts() {
    fetch(`http://localhost:2000/API/misProductos/${userData.id}`).
      then(response => response.json()).
      then(json => {
          setMyProducts(json)
      }).catch(error=> toast.error("Error al cargar los productos"))
  }
  useEffect(() => {
    getMyProducts()
  }, [userData])
  

  //!DELETE PROFILE
  function removeProfile(){
    fetch(`http://localhost:2000/API/usersTable/${userData.id}`,{
      method:'DELETE'
    }).then(response => response.json()).
    then( json => {
      if(json.error){
        toast.error(json.mensaje)
      }else{
        userState(false);
        toast.success("Usuario elimnado exitosamente")
      }

    }).
    catch(error => {        
      toast.error(error.message)
      })
  }

  


  return (
    <div className="p-5 d-flex flex-column align-items-center gap-5 bg-grey ">
      <Toaster></Toaster>
      {
        userData.profilePhoto?
        
        <img src={userData.profilePhoto} className="rounded-circle col-10 col-sm-4 mt-5" alt="profilePhoto" />
        :
        <div className="spinner-grow text-warning" style={{width: "3rem", height: "3rem"}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
      <div className="rounded-5 p-5 pt-3 w-100 bg-white d-flex flex-column justify-content-center align-items-center">
              <h1 className='my-4 col-12 text-center fw-bold text-green'>Tu perfil:</h1>
              <div className="d-flex flex-wrap flex-sm-nowrap">              
                  <div className="">
                    <p className="text-secondary fs-3 fw-light mx-3"><span className="fw-bold text-secondary">Nombre:</span> {userData.name+" "+userData.lastName}</p>
                    <p className="text-secondary fs-3 fw-light mx-3"><span className="fw-bold text-secondary">Email:</span> {userData.email}</p>
                    <p className="text-secondary fs-3 fw-light mx-3"><span className="fw-bold text-secondary">Teléfono:</span>  {userData.phone}</p>
                  </div>
                  <div className="">
                    <p className="text-secondary fs-3 fw-light mx-3"><span className="fw-bold text-secondary">País:</span> {userData.country}</p>
                    <p className="text-secondary fs-3 fw-light mx-3"><span className="fw-bold text-secondary">Estado:</span> {userData.state}</p>
                    <p className="text-secondary fs-3 fw-light mx-3"><span className="fw-bold text-secondary">Dirección:</span> {userData.address}</p>
                  </div>
              </div>
      </div>

      <div className="d-flex flex-column justify-content-center bg-white rounded-5 p-5 w-100">
        
          <h1 className="text-center fw-bold text-green">Plantas Obtenidas:</h1>
          <p className="text-center fw-light fs-3 text-secondary">Compras realizadas 0</p>
          
      </div>

      <div className="d-flex flex-column justify-content-center bg-white rounded-5 p-5 w-100">
            <h1 className="text-center fw-bold text-green">Plantas en Venta:</h1>
            {
              myProducts.length>0?
              <div className=" d-flex flex-row justify-content-around flex-wrap col-12 my-3">
              {myProducts.map( item => <p className="nunito fs-3 fw-light text-white bg-green rounded-5 py-3 px-5 links" onClick={() => goTo(`/item/${item.commonName}`)} key={item.id}>{item.commonName}</p>)}
              </div>
              :
              <p className='text-center fw-light fs-3 text-secondary'>
                Ninguna...
              </p>
            }
      </div>
      <div className="d-flex flex-row flex-wrap flex-sm-nowrap gap-1 w-100 mb-5">
            <button className="nunito fs-1  rounded-5 fw-light btn btn-dark col-12 col-sm-50">Notificaciones <span class="badge text-secondary">0</span></button>
            <button  className="nunito fs-1 rounded-5 fw-light btn btn-secondary col-12 col-sm-50" onClick={removeProfile}>Eliminar cuenta</button>
      </div>
    </div>
  )
}

export default Account