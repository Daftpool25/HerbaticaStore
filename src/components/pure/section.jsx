import React from 'react'

function Section({tittle,desc, btn, color, textColor, btnColor}) {

    const classSection=`container-fluid d-flex p-5 my-5 ${color}`
    const h1Class=`display-5 fw-bold mt-5 ${textColor}`;
    const pClass=`${textColor}`;
    const btnClass=`btn btn-lg mb-5 ${btnColor}`;


  return (
    <div className={classSection} >
        <div className="d-flex flex-column col-sm-4 col-8 ">
             <h1 className={h1Class}>{tittle}</h1>
             <p className={pClass}>{desc}</p>
              <button className={btnClass}>{btn}</button>
        </div>

    </div>
  )
}

export default Section