import React, { useEffect, useState } from 'react'
import './TrackOrders.css'
import { useNavigate } from 'react-router-dom'
import { Spinner } from "react-bootstrap";

const TrackOrders = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [orderData, setOrderData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const previousUrl = sessionStorage.getItem('previousUrlpaymentpage');
    useEffect(()=>{
        if(previousUrl){
            getOrderDetails();
        }
        sessionStorage.removeItem('previousUrlpaymentpage');
    },[]);
    
    const loginCheck = async () => {
        const res = await fetch('https://vci-api.onrender.com/getUserData', {
            method: 'GET',
            headers: {
                "Accept": "appliation/json"
            }
        });
        if (res.status === 401) {
            navigate('/login');
        }
        const data = await res.json();
        setData(data);
    }
    const getOrderDetails = async () => {
        const dataPromise = fetch('https://vci-api.onrender.com/getOrderDetails');
        dataPromise.then((response) => {
            return response.json();
        })
            .then((data) => {
                setOrderData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    const NoOrdersYet = ()=>{
        if(orderData.length === 0){
            return <h3>No Orders Yet !</h3>
        }
    }

    const ProductItems = () => {
        // create an array to accumulate the JSX elements
        const productItems = [];

        orderData.map((orderObject) => {
            const { products, _id, status, createdAt } = orderObject;
            const datePart = createdAt.slice(0, 10);
            products.map((array) => {
                array.map((prod) => {
                    const { _id: prodId, name, qty, sellingPrice, image } = prod; // destructure the required fields
                    const key = `${_id}-${prodId}`;
                    productItems.push(
                        <div key={key} className="orderItem">
                            <div className="orderitem1">
                                <img src={image} alt={name} />
                            </div>
                            <div className='orderitem234container'>
                                <div className="orderitem2">
                                    <div className="itemname">
                                        <span>{name}</span>
                                    </div>
                                    <div className="itemqty">
                                        <span>Quantity : {qty}</span>
                                    </div>
                                </div>
                                <div className="orderitem3">
                                    <div className="itemprice">₹ {sellingPrice * qty}</div>
                                </div>
                                <div className="orderitem4">
                                    <div className="orderstatus">Date : {datePart}</div>
                                    <div className="orderstatus">Status : {status}</div>
                                </div>
                            </div>


                        </div>
                    );
                });
            });
        });

        // return the accumulated JSX elements
        return (
            <div>
                {productItems}
            </div>
        );
    };


    useEffect(() => {
        loginCheck();
        getOrderDetails();
    }, [setData && setOrderData]);

    return (
        <div className='TrackOrders'>
            <div className="orderContainer">
                <div className="orderheader">
                    <h2>Your Orders</h2>
                </div>
                <div className="orderItemContainer">
                    {isLoading ? <Spinner animation="border" /> : <ProductItems />}
                </div>
            </div>

            <div className="noOrders">
                {isLoading ? <></>:<NoOrdersYet />}
            </div>
        </div>
    )
}

export default TrackOrders