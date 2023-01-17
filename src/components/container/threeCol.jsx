import React from 'react'
import DetailsCard from "../pure/detailsCards"

function ThreeCol() {



  return (
    <div className="container d-flex flex-row flex-wrap">
      <DetailsCard   icon="potted_plant" tittle="Variedad" details=" de especies, las tenemos todas."/>
      <DetailsCard  icon="local_shipping" tittle="Envíos" details="a todas partes del mundo."/>
      <DetailsCard icon="check_circle" tittle="Calidad" details="en todos nuestros ejemplares."/>
    </div>
  )
}

export default ThreeCol