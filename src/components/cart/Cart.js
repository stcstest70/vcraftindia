import React from 'react';
import "./Cart.css";
import { CartState } from '../../context/Context';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const { state: { cart }, dispatch } = CartState();
    const [total, setTotal] = useState();
    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.sellingPrice) * curr.qty, 0));
    }, [cart])
    const Itemcountzero = () => {
        if (cart.length === 0) {
            return <span>No item selected</span>
        }
    }
    const { state } = useContext(UserContext);
    const loginCheck = () => {
        if (state) {
            navigate("/orderpage")
        }
        else {
            navigate("/login");
        }
    }

    const componentDidMount = () => {
        if (!state) {
            sessionStorage.setItem('previousUrl', window.location.href);
        }
    }
    useEffect(() => {
        localStorage.setItem("UserCart", JSON.stringify(cart))
    }, [cart])


    // useEffect(() => {
    //     axios.get('https://vci-api.onrender.com/checkCookiePresent').then((res) => {
    //         if (res.status === 206) {
    //             dispatch({ type: "USER", payload: true })
    //         } else if (res.status === 406) {
    //             dispatch({ type: "USER", payload: false })
    //         } else {
    //             console.log("some error in nav");
    //         }
    //     });
    //     componentDidMount();
    // }, []);
    const checkTokenPresent = async (userToken) => {
        try {
            const res = await fetch('https://vci-api.onrender.com/checkCookiePresent', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userToken
                })
            });
            if (res.status === 206) {
                dispatch({ type: "USER", payload: true })
            } else if (res.status === 406) {
                dispatch({ type: "USER", payload: false })
            } else {
                console.log("some error in nav");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const userToken = sessionStorage.getItem('UserToken');
        checkTokenPresent(userToken);
        componentDidMount();
    }, []);
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
        <div className='cartContainer'>
            <Itemcountzero />
            {
                cart.map((prod, i) => {
                    return <div className="cartItem" key={i}>
                        <div className="items">
                            <div className="image">
                                <img src={prod.image} alt={prod.name} />
                            </div>
                            <div className="name">
                                <span>{prod.name}</span>
                            </div>

                            <div>
                                <div className="quantity">
                                    {/* <i class="fa-solid fa-minus" /> */}
                                    <select className="qty" onChange={(e) =>
                                        dispatch({
                                            type: "CHANGE_CART_QTY",
                                            payload: {
                                                _id: prod._id,
                                                qty: e.target.value
                                            }
                                        })
                                    } value={prod.qty}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    {/* <i class="fa-solid fa-plus" /> */}
                                </div>
                                <div className="price">
                                    <span>₹ </span><span>{prod.sellingPrice}</span>
                                </div>
                                <div className="del">
                                    <i class="fa-sharp fa-solid fa-trash" onClick={() => {
                                        dispatch({
                                            type: "REMOVE_FROM_CART",
                                            payload: prod
                                        })
                                    }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
            <div className="summary">
                <span className='total'>Subtotal ({cart.length}) items</span>
                <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
                <Button type="button" disabled={cart.length === 0} onClick={loginCheck}>
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    )
}

export default Cart