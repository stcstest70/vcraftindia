import React from 'react'
import "./Footer.css"
import axios from 'axios';
import {useState, useEffect} from 'react'
// import { Category } from '../../StaticData/Category';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [data, setData] = useState([]);
     useEffect(()=>{
      axios.get('https://vci-api.onrender.com/getCategoryPX')
    .then((res)=> setData(res.data))
    .catch((err)=>{console.log(err,'there is an error')});
  },[setData]);
  // console.log(data[0].name);
  return (
    <div>
      <div className='footer'>
        <div className="footer-grid">
          <div className="footer-component">
            <ul>
              <h6>ABOUT US</h6>
              <Link to='/'><li>HOME</li></Link>
              <Link to={`/matchedProduct/Idols`}><li>PRODUCTS</li></Link>
              {/* <Link to={`/matchedProduct/${data[0].name}`}><li>PRODUCTS</li></Link> */}
              <Link to="/contact"><li>CONTACT</li></Link>
              <li>TRACK ORDER</li>
            </ul>
          </div>
          <div className="footer-component">
            <ul>
              <h6>CATEGORIES</h6>
              {
                data.map((cat)=>{
                  return <Link to={`/matchedProduct/${cat.name}`} key={cat._id}>
                    <li>{cat.name}</li>
                  </Link>
                })
              }
            </ul>
          </div>
          <div className="footer-component">
            <ul>
              <h6>CONTACT</h6>
              <li><i className="fa-solid fa-square-phone"></i><span>---------</span></li>
              <li><i className="fa-solid fa-envelope"></i><span>suryodayatechnologies@gmail.com</span></li>
              <li>Timing : 10:00 am-9:00pm</li>
            </ul>
          </div>
          <div className="footer-component">
            <ul>
              <h6>Reach Us At:</h6>
              <li>suryodayatechnologies@gmail.com</li>    
            </ul>
          </div>
        </div>

      </div>
      <div className="footer-end">
        <h6>Copyright 2022 © vci.in | All Rights Reserved</h6>
      </div>
    </div>
  )
}

export default Footer