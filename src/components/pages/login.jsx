import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import storage from '../../utils/storage';



function Login({state, setState, setCurrentUser}) {

  //Hooks
  const [loginData, setLoginData] = useState({email:"", password:""})

  //!NAVIGATE
  const navigate=useNavigate();
  function goTo(route) {
    navigate(route);
  }


   //!LOGIN
  function login() {
      fetch('http://localhost:2000/API/users/',{
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(loginData)
      }).
      then(response => response.json()).
      then(json => {

        if(json.error){
          toast.error(json.message)
        }
        else if(json.response.quanty.length>0){
          setCurrentUser(json.response.quanty);
          storage.set("authToken",json.response.token)
          toast.success('¡Bienvenido!');
          setState(true);
        }else{
          toast.error("El usuario no existe")
        }
      }).
      catch(err => toast.error("Error: "+ err.message))
    }
  

  return (
    <div className="fullContainer d-flex flex-column justify-content-center loginBg">
        <Toaster></Toaster>
          <div className="container d-flex flex-column  col-md-5 text-center justify-content-center align-items-center gap-3">
              <h1 className="text-light fw-bold" >Iniciar Sesión</h1>
              
              <input className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" value={loginData.email} onChange={e => setLoginData({...loginData,email:e.target.value})} type="email" placeholder="Email" />
              {loginData.email.length < 4 && loginData.email.length !== 0 && <p className="text-light">Email muy corto</p>}

              <input className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3"  value={loginData.password} onChange={e => setLoginData({...loginData,password:e.target.value}) } type="password" placeholder="Contraseña" />
              {loginData.password.length < 4 && loginData.password.length !== 0 && <p className="text-light">Contraseña muy corta</p>}

              <button className="btn btn-success bg-green text-white w-100 fw-bold rounded-5 fs-3 nunito" onClick={login}>Entrar</button>

              <p onClick={() => goTo("/register")} className="text-light links fs-4 nunito fw-light">No tengo una cuenta, Registrarme</p>
              
          </div>
    </div>
  )
}

export default Login