import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';



function Register({state,changeState,setCurrentUser,download,upload}) {

  const [data, setData] = useState({name:"", lastName:"", phone:"", email:"", password:"",profilePhoto:"", country:"", state:"",address:""})
  const [imgCatcher, setImgCatcher]=useState("");
  const [nextPage, setNextPage]=useState(false);
  const navigate=useNavigate();


  function goTo(route) {
    navigate(route);
  }

  //!CREATE USER FUNCTION
  function createUser() {
    fetch('http://localhost:2000/API/users/usersList',{
      method: "POST",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(data)
    }).
    then(response => response.json()).
    then(json => {

      if(json.error){
        toast.error("Error: "+ json.message)
      }else if(!json.error && json.message===""){
        toast.error("Error")
      }else{
        
        setCurrentUser([json.respuesta]);
        toast.success('¡Bienvenido!');
        changeState(true)
      }

    }).
    catch(error => {
      toast.error("Error: "+ error.message)
    })
  }
  
  //!IMG UPLOADER AND DOWNLOADER (GET URL)
  async function getImgURL() {
    let name= `users/${data.email}-${data.name}-profilePhoto`

    if(data.name==="" || data.lastName==="" || data.email==="" || data.phone==="" || data.state==="" || data.address==="" || data.country==="" ){
      toast.error("Complete los campos vacios")
      return null
    }
        await upload(name,imgCatcher);
        await download(name).then(url => setData({...data,profilePhoto:url})) 
  }
  //!CREATE PRODUCT WHEN Y GET A IMG URL
     useEffect(() => {
      if(data.profilePhoto!==""){return createUser()}
    }, [data.profilePhoto])


  //!Redirect auth user
  useEffect(() => {
    if(state){
      goTo("/shop")
    }
  })
  

  return (
    <div className="fullContainer loginBg d-flex justify-content-center">
      <Toaster />
      {
        !nextPage?
        <div className="fullcontainer d-flex flex-column col-10 col-sm-9 col-md-5 justify-content-center text-center gap-3">
            <h1 className="text-light fw-bold nunito">Registrarte</h1>
            <input value={data.name} onChange={e => setData({...data,name:e.target.value}) } className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3"  type="Text" placeholder='Nombre' />
            {data.name.length <= 3 && data.name.length !== 0 && <p className="fs-4 nunito text-white">Debe ser un nombre real</p>}
            
            <input value={data.lastName} onChange={e => setData({...data,lastName:e.target.value}) }  className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" type="Text" placeholder='Apellido' />
            {data.lastName.length <= 3 && data.lastName.length !== 0 && <p className="fs-4 nunito text-white">Debe ser un apellido real</p>}
            
            <input value={data.phone} onChange={e => setData({...data,phone:e.target.value}) }  className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" type="Number" placeholder='Teléfono' />
            {data.phone.length <= 7 && data.phone.length !== 0 && <p className="fs-4 nunito text-white">Ingresa tu nurmero de teléfono completo o válido</p>}
            
            
            <input value={data.email} onChange={e => setData({...data,email:e.target.value}) } className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" type="Email" placeholder='Ejemplo@email.com'  />
            {!data.email.includes("@") && data.email.length !== 0  && <p className="fs-4 nunito text-white">Ingrese un email válido</p>}
            
            <input value={data.password} onChange={e => setData({...data,password:e.target.value}) }  className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" type="Text" placeholder='Contraseña' />
            {data.password.length <= 7 && data.password.length !==0 &&  <p className="fs-4 nunito text-white">Contraseña muy corta</p>}
            
            {data.password.length > 7 && data.name.length > 3 && data.lastName.length > 3 && data.email.includes("@") && data.phone.length > 7? 
              <button onClick={() => setNextPage(true)} className="btn btn-success bg-green text-white w-100 fw-bold rounded-5 fs-3 nunito">Listo</button>
              :
              <p className="text-light fw-bold fs-3 nunito">...</p>
            } 

        </div>
        :
        <div className="fullContainer  d-flex flex-column col-10 col-sm-7 col-md-5 justify-content-center text-center gap-3">
            <h1 className="text-light fw-bold nunito">Registrarte</h1>

            <input value={data.country} onChange={e => setData({...data,country:e.target.value}) } className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3"  type="Text" placeholder='País' />
            
            <input value={data.state} onChange={e => setData({...data,state:e.target.value}) }  className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" type="Text" placeholder='Estado o provincia' />
            
            <input value={data.address} onChange={e => setData({...data,address:e.target.value}) }  className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" type="text" placeholder='Ciudad y dirección' />
            
            
            <input  onChange={e => setImgCatcher(e.target.files[0]) } className="form-control nunito text-dark fw-light bg-grey fs-4 border-0 px-4 py-3" type="file"/>
            
            {data.country.length >0  && data.state.length !== 0  && data.address.length !== 0 && imgCatcher!==""?
            
              <button onClick={getImgURL} className="btn btn-success bg-green text-white w-100 fw-bold rounded-5 fs-3 nunito">Listo</button>
              :
              <p className="text-light fw-bold fs-3 nunito">...</p>
            } 

        </div>
      }
    </div>
  )
}

export default Register