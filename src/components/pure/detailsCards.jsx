import React from 'react'

function DetailsCars({icon,tittle,details}) {
  return (
    <div className='container col-xs-12 col-sm-12 col-md-3 d-flex flex-column rounded-5 text-center bg-white my-2 p-5'>
        <span className="material-symbols-outlined pb-3">{icon}</span>
        <h1 className="text-dark fw-bold">{tittle}</h1>
        <p className="fs-4 fw-light greycolor">{details}</p>
    </div>
  )
}

export default DetailsCars