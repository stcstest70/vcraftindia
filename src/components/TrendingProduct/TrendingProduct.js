import React from 'react'
import Slider from "react-slick";
import axios from 'axios';
import { useState, useEffect } from 'react';
import './TrendingProduct.css'
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
// import { TrendProduct } from '../../StaticData/TrendProduct';

const TrendingProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
     useEffect(()=>{
      axios.get('/getTrendingProductPX')
    .then((res)=> {
      setData(res.data);
      setLoading(false);
    })
    .catch((err)=>{console.log(err,'there is an error')});
  },[setData]);
  var settings = {
    dots: true,
    infinite: true,
    pauseOnHover: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };

  //to get to top of the next page
  const links = document.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.currentTarget.getAttribute('href');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      window.location.href = target;
    }, 1); // adjust delay time if necessary
  });
});
return (

  <div className='catSlider'>
    <h5> Trending Products </h5>
    {
      loading ? <div className="spinner"><Spinner animation="border"/></div>: <Slider {...settings}>
      { data.map((singleData)=>{
         return <div className='xyz' key={singleData._id}>
          <Link to={`/products/${singleData._id}`} key={singleData._id} className='link'>
            <div className="imgContainer">
              <img src={singleData.image} alt={singleData.name}  className='catImg' />
              <div className="discount">{Math.floor((singleData.originalPrice - singleData.sellingPrice)*100/singleData.originalPrice)}% Off</div>
            </div>
            <div className="catName">
            <h6>{singleData.name}</h6>
            </div>
          </Link>
         </div>
  
      })}
    </Slider> 
    }
    
  </div>
)
}

export default TrendingProduct