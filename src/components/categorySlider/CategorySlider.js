import React from 'react'
import "./CategorySlider.css"
import Slider from "react-slick";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
// import { Category } from '../../StaticData/Category';
// import { Navigate } from 'react-router-dom';
const CategorySlider = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://vci-api.onrender.com/getCategoryPX')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => { console.log(err, 'there is an error') });
  }, [setData]);

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

  return (

    <div className='catSlider'>
      <h5> Explore Categories </h5>
      {/* {
        loading? <div className="spinner"><Spinner animation="border"/></div> : <Slider {...settings}>
        {data.map((singleData)=>{
           return <div className='cat'  key={singleData._id}>
              <Link to={`/matchedProduct/${singleData.name}`}>
              <div className="imgContainer">
                <img src={singleData.image} alt={singleData.name} className='catImg' />
              </div>
              <div className="catName">
              <h6>{singleData.name}</h6>
              </div>
              </Link>
  
           </div>
  
        })}
      </Slider> 
      } */}


      {/* for two category */}
      {/* <div className="category_container">
        <div className="category_item">
          <div className="category_img">
            <img src="./img/cat-2.png" alt="Buddha Idols" />
          </div>
        </div>
        <div className="category_item">
          <div className="category_img">
            <img src="./img/cat-1.png" alt="Key Holders" />
          </div>
        </div>
      </div> */}

      {/* for static 7 categories */}
      <Slider {...settings}>
        <div className='cat'>
          <Link to={`/matchedProduct/Idols`}>
            <div className="imgContainer">
              <img src="./img/cat-2.png" alt="Buddha Idols" className='catImg' />
            </div>
            <div className="catName">
              <h6>Buddha Idols</h6>
            </div>
          </Link>
        </div>
        <div className='cat'>
          <Link to={`/matchedProduct/Key Holder`}>
            <div className="imgContainer">
              <img src="./img/cat-1.png" alt="Key Holder" className='catImg' />
            </div>
            <div className="catName">
              <h6>Key Holder</h6>
            </div>
          </Link>
        </div>
        <div className='cat'>
          <Link to={`/matchedProduct/Idols`}>
            <div className="imgContainer">
              <img src="./img/cat-4.jpeg" alt="Key Holder" className='catImg' />
            </div>
            <div className="catName">
              <h6>Buddha Idols</h6>
            </div>
          </Link>
        </div>
        <div className='cat'>
          <Link to={`/matchedProduct/Key Holder`}>
            <div className="imgContainer">
              <img src="./img/cat-5.png" alt="Buddha Idols" className='catImg' />
            </div>
            <div className="catName">
              <h6>Key Holder</h6>
            </div>
          </Link>
        </div>
        <div className='cat'>
          <Link to={`/matchedProduct/Idols`}>
            <div className="imgContainer">
              <img src="./img/cat-6.jpeg" alt="Key Holder" className='catImg' />
            </div>
            <div className="catName">
              <h6>Buddha Idols</h6>
            </div>
          </Link>
        </div>
        <div className='cat'>
          <Link to={`/matchedProduct/Key Holder`}>
            <div className="imgContainer">
              <img src="./img/cat-7.png" alt="Buddha Idols" className='catImg' />
            </div>
            <div className="catName">
              <h6>Key Holder</h6>
            </div>
          </Link>
        </div>
        <div className='cat'>
          <Link to={`/matchedProduct/Idols`}>
            <div className="imgContainer">
              <img src="./img/cat-8.jpeg" alt="Key Holder" className='catImg' />
            </div>
            <div className="catName">
              <h6>Buddha Idols</h6>
            </div>
          </Link>
        </div>
        <div className='cat'>
          <Link to={`/matchedProduct/Key Holder`}>
            <div className="imgContainer">
              <img src="./img/cat-3.png" alt="Buddha Idols" className='catImg' />
            </div>
            <div className="catName">
              <h6>Key Holder</h6>
            </div>
          </Link>
        </div>
      </Slider>
    </div>
  )
}

export default CategorySlider