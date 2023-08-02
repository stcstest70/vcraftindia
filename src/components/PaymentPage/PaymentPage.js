import React, { useEffect, useState } from 'react'
import './PaymentPage.css'
import axios from 'axios'
import { CartState } from '../../context/Context'
import Modal from 'react-bootstrap/Modal';
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const PaymentPage = () => {
    const navigate = useNavigate();
    //cart data
    const { state: { cart }, dispatch } = CartState();
    //fetching user details
    const [userDetails, setUserDetails] = useState([]);
    const [pincodeAvailable, setPincodeAvailable] = useState(false);
    const handleChangeAdress = async () => {

        const res = await fetch('/changeAdress', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address
            })
        });
        if (res.status === 200) {
            window.alert('Address updated...!');
            // window.location.reload();
        } else if (res.status === 500) {
            window.alert('There was some error while updating address...!');
        }
        handleClose();
    }
    const handleChangeAdress2 = async () => {

        const res = await fetch('/changeAdress', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address: locationAddress
            })
        });
        if (res.status === 200) {
            window.alert('Address updated...!');
            // window.location.reload();
        } else if (res.status === 500) {
            window.alert('There was some error while updating address...!');
        }
        handleClose();
    }
    useEffect(() => {
        axios.get('/getUserData').then((res) => {
            setUserDetails(res.data);
            if(userDetails.pincode >= 400001 && userDetails.pincode <= 400104){
                setPincodeAvailable(true);
            }
        })
    }, [setUserDetails, handleChangeAdress2, handleChangeAdress]);

    const userName = userDetails.name;
    const userEmail = userDetails.email;
    const userAddress = userDetails.address;
    const pincode = userDetails.pincode;
    
    const [total, setTotal] = useState();
    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.sellingPrice) * curr.qty, 0));
    }, []);
    // console.log(pincodeAvailable);
    //modal variables

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //change address
    const [address, setAddress] = useState(null);
    
    


    //geoloation api
    const [locationAddress, setLocationAddress] = useState(null);
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            //   console.log(latitude , longitude);
            getAddressFromCoordinates(latitude, longitude);
        }, (error) => {
            console.log(error);
        });
    }
    async function getAddressFromCoordinates(latitude, longitude) {
        const API_KEY = 'pk.dc21a1a38b8d418ffe5878c3b770a122';
        fetch(`https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => setLocationAddress(data.display_name))
            .catch(error => console.error(error));
    }
    const LocationByLocationIQ = () => {
        if (locationAddress != null) {
            return <div>
                <div>
                    {locationAddress}
                </div>
                <div>
                    <button className='btnp submit' onClick={handleChangeAdress2}>Save</button>
                </div>
            </div>
        } else {
            return <div></div>
        }
    }

    //total delivery charge

    let totalDeliveryCharge = 0;

    for (const product of cart) {
        const { deliveryCharge, qty } = product;
        totalDeliveryCharge += deliveryCharge * qty;

    }
    //payment braintree
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const getToken = async () => {
        try {
            const { data } = await axios.get("/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    //  (yes)  console.log(clientToken);
    useEffect(() => {
        getToken();
        // setcartdata(cart);
    }, []);
    //handle payment
    // const [cartdata, setcartdata] = useState(null);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const res = await fetch("/braintree/payment",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    nonce,
                    cart,
                })
            })
            
            if (res.status === 201) {
                window.alert('Transaction Successful !');
                localStorage.removeItem("UserCart");
                localStorage.setItem("UserCart", JSON.stringify([]));
                sessionStorage.setItem('previousUrlpaymentpage', window.location.href);
                // setcartdata(cart);
                // sendEmailToBuyer();
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: cart
                });
                setLoading(false);

                navigate("/trackOrders");
                toast.success("Payment Completed Successfully ");
            } else if (res.status === 500) {
                setLoading(false);
                window.alert('Transaction Failed... Please try again...!');
            } else {
                setLoading(false);
                window.alert('Internal Server Error');
            }


        } catch (error) {
            console.log(error);
            toast.error("Transaction Failed, Please try again...!");
            setLoading(false);
        }
    };
    // const testemailsend = ()=>{

    //         sendEmailToBuyer(userEmail,cartdata);
    // }
    // const sendEmailToBuyer =async (userEmail, cartdata)=>{
    //     const res = await fetch('/sendPurchaseDetailsToBuyer', {
    //         method:"POST",
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         credentials: 'include',
    //         body:JSON.stringify({
    //             userEmail,
    //             cartdata
    //         })
    //     })
    // }
    const links = document.querySelectorAll('a');
    //to get to top of the next page
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
        <div className='paymentPage'>

            <div className="ppleft">
                <div className="shippingDetails">
                    <h3>SHIPPING</h3>

                    <span>Name : <span>{userName}</span></span>
                    <span>Email : <span>{userEmail}</span></span>
                    <span>Address : <span>{userAddress}</span></span>
                    <button onClick={handleShow}>Change</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <div>Select Delivery Address</div>
                        </Modal.Header>
                        <Modal.Body id='modalborderbottom'>
                            <div className="addAdress">
                                <label htmlFor="changeAddress">Add Adress : </label><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="changeAddress" id="changeAddress" /><br />
                                {/* <button variant="secondary" className='btnp cancel' onClick={handleClose}>
                                    Cancel
                                </button> */}
                                <button variant="primary" className='btnp submit' onClick={handleChangeAdress}>
                                    Save
                                </button>
                            </div></Modal.Body>
                        <Modal.Body>
                            <div className="uselocation">
                                <div className="useLocation">Use Current Location </div>
                                <div className="getlocation">
                                    <img src="./img/location.jpg" alt="locationIcon" />
                                    <button onClick={getCurrentLocation} className='getlocationbtn'>Use current location</button>

                                </div>

                                <LocationByLocationIQ />
                            </div></Modal.Body>
                    </Modal>
                </div>
                <div className="cartitems">
                    <h3>ORDER SUMMARY</h3>
                    {cart.map((prod, i) => {
                        return <div className="cartitem" key={i}>
                            <div className="image image100">
                                <img src={prod.image} alt={prod.name} />
                            </div>
                            <div className="name cname">
                                <span>{prod.name}</span>
                            </div>
                            <div className='pqtyandprice'>
                                <div className="Pqty">
                                    <span>({prod.qty})</span>
                                </div>
                                <div className="price Pprice">
                                    <span>₹ </span><span>{prod.sellingPrice}</span>
                                </div>
                            </div>

                        </div>
                    })}
                </div>
            </div>
            <div className="pprighr">
                <div className="pricedetails">
                    <h3>PRICE DETAILS</h3>
                    <span>Price ({cart.length}) : <span>{total}</span></span>
                    <span>Delivery Charges : <span>₹{totalDeliveryCharge + 60}</span></span>
                    <div className="totalPayable">
                        <span>Total Payable : </span><span>₹ {total + totalDeliveryCharge + 60}</span>
                    </div>
                </div>
                <div className="pay">
                    {
                        !clientToken || cart.length === 0 ? ('') : (
                            <>
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: "vault",
                                        }
                                    }}
                                    onInstance={(instance) => setInstance(instance)}
                                />

                                <button
                                    className="makePaymentbtn"
                                    onClick={handlePayment}
                                    disabled={loading || !instance || !userDetails || !pincodeAvailable}
                                >{loading ? <Spinner animation="border" /> : "Make Payment"}
                                </button>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default PaymentPage