import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import SinglePP from '../singleProductPage/SinglePP';
import { Spinner } from 'react-bootstrap';

const ProductsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
     useEffect(()=>{
      axios.get(`/getProdByID_SP_PX/${id}`)
    .then((res)=> {
      setData(res.data);
      setLoading(false);
    })
    .catch((err)=>{console.log(err,'there is an error')});
  },[setData]);
  // console.log(data);
  return (
    <div>
      {
        loading ? <div className="spinner"><Spinner animation="border"/></div>: <SinglePP Product={data} id={id} />
      }
    </div>
  )
}

export default ProductsPage