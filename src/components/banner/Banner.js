import React from 'react'
// import b2 from "../../image/b2.jpg"
// import b5 from "../../image/b5.jpg"
// import b1 from "../../image/b1.jpg"
import banner1 from '../../image/banner1.png'
// import banner2 from '../../image/banner2.png'
import banner3 from '../../image/banner3.png'
// import banner4 from '../../image/banner4.png'
import banner6 from '../../image/banner6.png'
// import {b1} from "../image/b1.jpg"

const Banner = () => {
  return (
    <React.Fragment>
<div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={banner6} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={banner3} className="d-block w-100" alt="..."/>
    </div>
    {/* <div className="carousel-item">
      <img src={banner2} className="d-block w-100" alt="..."/>
    </div> */}
    
    <div className="carousel-item">
      <img src={banner1} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </React.Fragment>
  )
}

export default Banner