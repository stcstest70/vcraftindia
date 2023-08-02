import React from 'react'
import Banner from '../banner/Banner.js'
import CategorySlider from '../categorySlider/CategorySlider.js'
import './Home.css';
import TrendingProduct from '../TrendingProduct/TrendingProduct.js';
// import Notice from './Notice';
// import { CartState } from '../../context/Context.js';
import { useState, useEffect } from 'react';
const Home = () => {
  // const {state} = CartState();
  // console.log(state);
  const links = document.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.currentTarget.getAttribute('href');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// const [showNotice, setShowNotice] = useState(true);
// useEffect(() => {
//   const noticeShown = sessionStorage.getItem('noticeShown');
//   if (noticeShown) {
//     setShowNotice(false);
//   } else {
//     sessionStorage.setItem('noticeShown', 'true');
//   }
// }, []);
// const handleCloseNotice = () => {
//   setShowNotice(false);
// };
  return (
    <div>
      {/* {showNotice && <Notice onClose={handleCloseNotice} />} */}
        <Banner />
        <div className="categorySliderDiv">
            <CategorySlider />
        </div>
        <div className="trendingProductDiv">
            <TrendingProduct /> 
        </div>
    </div>
  )
}

export default Home