import React from 'react'

function Jumbotron({background, tittle, text, btnText, navigate}) {
  
  const backgroundStyle= `p-5 rounded-5 ${background}`
  
  return (  
     <div className="container-fluid mt-3 mb-5">
        <div className={backgroundStyle} >
            <div className="container-fluid py-5 ">
                <h1 className="display-5 fw-bold text-light">{tittle}</h1>
                <p className="col-md-5 fs-2 text-light fw-light">{text}</p>
                <button onClick={navigate} className="nunito btn btn-lg btn-succcess bg-green rounded-5 fw-bold fs-3 px-5 text-white growButton">{btnText}</button>
            </div>
        </div>
    </div>
    
  )
}

export default Jumbotron