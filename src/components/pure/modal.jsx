import React from 'react'

function Modal({remove,tittle,desc,btn1,btn2}) {



  return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="nunito fs-3 text-dark fw-bold" id="exampleModalLabel">{tittle}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p className="nunito text-secondary fw-light">{desc}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="nunito btn btn-secondary rounded-5 px-5" data-bs-dismiss="modal">{btn1}</button>
                    <button onClick={remove} type="button" className="nunito btn btn-success bg-green rounded-5 px-5">{btn2}</button>
                </div>
                </div>
            </div>
        </div>
   
  )
}

export default Modal