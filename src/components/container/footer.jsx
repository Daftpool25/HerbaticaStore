import React from 'react';
import linkedin from "../../images/icons/linkedin.svg";
import github from "../../images/icons/github.svg";


function Footer() {
  return (
    <footer className="p-5 bgPrimaryColor d-flex flex-row flex-wrap">
            <div className="col-sm-4 col-12">
                <p className=" fs-3 text-light fw-bold">Herbática</p>
                <p className="text-light fw-light">Dirección: P. sherman, calle Wallaby 42.</p>
                <p className="text-light fw-light">Sidney -Australia</p>
                <p className="text-light fw-light">0375-546-8973</p>
                <p className="text-light fw-light">hola@herbatica.com</p>
            </div>
            <div className="col-sm-4 col-12">
                <p className=" fs-3 text-light fw-bold">Conócenos</p>
                <p className="text-light fw-light">Blog</p>
                <p className="text-light fw-light">Acerca de nosotros</p>
                <p className="text-light fw-light">Contáctanos</p>
            </div>
            <div className="col-sm-4 col-12">
                <p className=" fs-3 text-light fw-bold">Términos y Condiciones</p>
                <p className="text-light fw-light">Políticas</p>
                <p className="text-light fw-light">Privacidad</p>
                <p className="text-light fw-light">Términos de uso</p>       
            </div>
            <div className='col-12 mt-5 text-center'>
              <p className='text-white fs-4 nunito'> Made by Christopher Acosta</p>
              <a href="https://github.com/Daftpool25"><img  className="invert mx-1 links" width="40px"  src={github} alt="github" /></a>
              <a href="https://www.linkedin.com/in/christopher-acosta-dev26"><img  className="invert mx-1 links" width="40px" src={linkedin} alt="linkedin" /></a>
            </div>
    </footer>
  )
}

export default Footer