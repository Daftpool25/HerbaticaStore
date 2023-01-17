import React, { useState, useEffect } from 'react';
import {Link, Route, Routes, BrowserRouter,Navigate, useSearchParams} from "react-router-dom";
import Home from "../src/components/pages/home";
import Account from "../src/components/pages/account";
import Login from "../src/components/pages/login";
import Register from "../src/components/pages/register";
import Shop from "../src/components/pages/shop";
import NewProduct from "../src/components/pages/newProduct";
import Item from "../src/components/pages/item";
import Car from "../src/components/pages/car";
import Footer from "../src/components/container/footer";
//STYLES
import "./styles/styles.scss";
import logo from "./images/icons/main.png";
import store from "./images/icons/store.png";
import car from "./images/icons/car.png";
import profile from "./images/icons/profile.png";
import login from "./images/icons/login.svg";
import logout from "./images/icons/logout.svg";
import linkedin from "./images/icons/linkedin.svg";
import github from "./images/icons/github.svg";
import menu from "./images/icons/menu.png";
import menuOpen from "./images/icons/menuOpen.png";

//UTILS
import storage from './utils/storage';
//FIREBASE
import { download, upload } from './controllers/firebaseController';







function App() {

  //TODO user with same email, same products
  //TODO sort the backend (codes and modules)
  //TODO modal window
  //TODO catch buys by users



    //TOOLTIPS
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    //CAR
    const [myCarListItems,setCarListItems]=useState([])


    //DATA FROM USER LOGGED & user login state
    const [currentAuthUser, setCurrentAuthUser]=useState([""])
    const [state,setState]=useState(false);
    const [myProducts,setMyProducts]=useState([""])

    //Menu
    const [menuState, setMenuState] = useState(false);


    //!Stay logged
    useEffect(() => {
      const accessToken = storage.get('authToken');
      if(accessToken){
        setState(true);
        if(!state && !currentAuthUser[0]){
          fetch('http://localhost:2000/API/users/token',
              {headers:{
                Accept: 'application/json',
                Authorization: `bearer ${accessToken}`
              }}).
          then(response => response.json()).
          then(json =>{
            console.log(json);
            setCurrentAuthUser(json)
          }).
          catch(error => console.log(error))
        }
      };
      
    },[])
    
    
  


    //LOGOUT
    function logOut() {
      storage.remove("authToken");
      setCurrentAuthUser([""])
      setState(false);
  
    }





  return (
    <BrowserRouter >
        <aside className="px-sm-5 px-2 py-2 d-flex flex-row justify-content-between flex-wrap flex-sm-nowrap fixed-top">

          <Link  to="/" className="text-decoration-none d-flex flex-row align-items-center"> 
            <div className="d-flex align-items-center gap-2 opacity">
              <img width="38px" height="38px" src={logo} alt="mainLogo"/>
              <span className="text-decoration-none text-light fs-1 fw-bold ">Herbática</span>
            </div>
          </Link>
          
          <div className="d-none d-sm-flex gap-4 ">
              <Link className="d-flex align-items-center gap-2 text-decoration-none fs-2 fw-light text-light " to="/shop">
                  <img width="35px" height="35px" src={store} alt="shoppingLogo" className="opacity"
                       data-bs-toggle="tooltip" data-bs-placement="left"
                       data-bs-custom-class="custom-tooltip"
                       data-bs-title="Tienda"
                  />
              </Link>
              <Link className="d-flex align-items-center gap-2 text-decoration-none fs-2 fw-light text-light" to="/carrito">
                 <img  width="35px" height="35px" src={car} alt="carLogo" className="opacity"
                                        data-bs-toggle="tooltip" data-bs-placement="left"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Carrito"
                 />
              </Link>
              <Link className="d-flex align-items-center gap-2 text-decoration-none fs-2 fw-light text-light" to="/account">
                  <img width="35px" height="35px" src={profile} alt="profileLogo"  className="opacity"
                                         data-bs-toggle="tooltip" data-bs-placement="left"
                                         data-bs-custom-class="custom-tooltip"
                                         data-bs-title="Perfil"
                  />
              </Link>

          {
            state===true?
            <Link className="text-decoration-none fs-2 fw-light text-light" onClick={logOut} to="/login">
                                <img width="35px" height="35px" src={logout} alt="profileLogo"  className="opacity"
                                         data-bs-toggle="tooltip" data-bs-placement="left"
                                         data-bs-custom-class="custom-tooltip"
                                         data-bs-title="Cerrar Sesión" />
            </Link>
            :
            <Link className="text-decoration-none fs-2 fw-light text-light" to="/login">
                                        <img width="35px" height="35px" src={login} alt="profileLogo"  className="opacity"
                                         data-bs-toggle="tooltip" data-bs-placement="left"
                                         data-bs-custom-class="custom-tooltip"
                                         data-bs-title="Iniciar sesión" />
            </Link>
          }
          </div>

          <div className='d-flex d-row align-items-center d-sm-none' onClick={!menuState? () => setMenuState(true):() => setMenuState(false)}>
             <img width="35px" height="35px" src={!menuState? menu:menuOpen} alt="profileLogo"  className="opacity"/>
          </div>

          <div className={menuState? "col-12 d-flex flex-column justify-content-center align-items-center gap-4 px-3 py-5":"d-none" }> 
              <Link to="/shop" className="d-flex flex-row gap-3 opacity text-decoration-none"onClick={()=> setMenuState(false)}>
                 <img width="35px" height="35px" src={store} alt="shoppingLogo" className="opacity"/>
                 <span className='text-white nunito fs-3 fw-bold'>Tienda</span>
              </Link>
              <Link to="/carrito" className="d-flex flex-row gap-3 opacity text-decoration-none"onClick={()=> setMenuState(false)}>
                 <img width="35px" height="35px" src={car} alt="shoppingLogo" className="opacity"/>
                 <span className='text-white nunito fs-3 fw-bold'>Carrito</span>
              </Link>
              <Link to="/account" className="d-flex flex-row gap-3 opacity text-decoration-none"onClick={()=> setMenuState(false)}>
                 <img width="35px" height="35px" src={profile} alt="shoppingLogo" className="opacity"/>
                 <span className='text-white nunito fs-3 fw-bold'>Mi pefil</span>
              </Link>
              {
                state===true?
                <Link to="/login" className="d-flex flex-row gap-3 opacity text-decoration-none rounded-5 bg-green py-2 px-4" onClick={() => { logOut(); setMenuState(false)}}>
                    <img width="35px" height="35px" src={logout} alt="shoppingLogo" className="opacity"/>
                    <span className='text-white nunito fs-3 fw-bold'>Cerrar Sesión</span>
                </Link>
                :
                <Link to="/login" className="d-flex flex-row gap-3 opacity text-decoration-none rounded-5 bg-green py-2 px-4"onClick={()=> {setMenuState(false)}}>
                   <img width="35px" height="35px" src={login} alt="shoppingLogo" className="opacity"/>
                   <span className='text-white nunito fs-3 fw-bold'>Cerrar Sesión</span>
                 </Link>
              }

          </div>

        </aside>

        <main>

          <Routes>
             <Route path='/' element={<Home />}/>
             <Route path='/shop' element={<Shop />}/>
             <Route path='/item/:name' element={<Item myCarListItems={myCarListItems} setCarListItems={setCarListItems} myId={currentAuthUser[0].id} userState={state}/>}/>
             <Route exact path='/item' element={<Shop/>}/>
             <Route path='/login' element={state===true? <Navigate to="/account" replace/>:<Login state={state} setState={setState} setCurrentUser={setCurrentAuthUser}/>}/>
             <Route path='/register' element={state===true? <Navigate to="/account" replace/>:<Register state={state} changeState={setState} setCurrentUser={setCurrentAuthUser} download={download} upload={upload}/>}/>
             <Route path='/account' element={state===true? <Account userState={setState} userData={currentAuthUser[0]} myProducts={myProducts} setMyProducts={setMyProducts} />: <Navigate to="/login" replace/>}/>

             <Route path='/sell' element={state===true? <NewProduct  myId={currentAuthUser[0].id} upload={upload} download={download}/>: <Navigate to="/login" replace/>}/>
             <Route path='/carrito' element={state===true? <Car myCarListItems={myCarListItems} setCarListItems={setCarListItems} userState={state}/>: <Navigate to="/login" replace/>} />
          </Routes>
          <Footer/>
        </main>
    </BrowserRouter>
  )
}

export default App