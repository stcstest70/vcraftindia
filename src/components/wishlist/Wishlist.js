import React, { useEffect } from 'react';
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CartState } from '../../context/Context';
import { WishlistState } from '../../context/Context1';
import { Button } from 'react-bootstrap';
import './wishlist.css';

const Wishlist = () => {

    const {
        state: { cart },
        dispatch
    } = CartState();

    const {
        state1: { wishlist },
        dispatch1
    } = WishlistState();
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

    useEffect(() => {
        localStorage.setItem("UserWishlist", JSON.stringify(wishlist))
    }, [wishlist]);

    const Emptywishlist = () => {
        if (wishlist.length === 0) {
            return (
                <div className="nowishlist">
                    <h3>NO ITEM IN WISHLIST</h3>
                </div>
            )
        }
        else{
            //do nothing
        }
    }
    return (
        <div className='wishlistcontainer'>
            <div className="wishlistheader">
                <h2>YOUR WISHLIST</h2>
            </div>
            <div className="products">
                <div className="pcontainer">
                    {
                        wishlist.map((myProduct) => {
                            const id = myProduct._id;
                            return (
                                <div className='pmyCards'>
                                    <div className="pcard">
                                        <Card className='my-3 p-3 rounded' key={myProduct._id}>
                                            <Link to={`/products/${myProduct._id}`} key={myProduct._id}>
                                                <Card.Img src={myProduct.image} alt={myProduct.name} className="card-img" key={myProduct._id} />
                                            </Link>
                                            {/* <div className="ws"><i class="fa-brands fa-gratipay"></i></div> */}
                                            <div className="ws">{
                                                wishlist.some((p) => p._id === myProduct._id) ? (
                                                    <i class="fa-brands fa-gratipay activewishlist" onClick={() => {
                                                        dispatch1({
                                                            type: "REMOVE_FROM_WISHLIST",
                                                            payload: myProduct
                                                        })
                                                    }}></i>
                                                ) : (
                                                    <i class="fa-brands fa-gratipay" onClick={() => {
                                                        dispatch1({
                                                            type: "ADD_TO_WISHLIST",
                                                            payload: myProduct
                                                        })
                                                    }}></i>
                                                )
                                            }</div>
                                            <Card.Body>
                                                <Card.Text as='div' className='ptype' key={myProduct._id}>
                                                    {myProduct.type}
                                                </Card.Text>
                                                <Card.Title as="div">
                                                    <strong className='strong' key={myProduct._id}>{myProduct.name}</strong>
                                                </Card.Title>
                                                <Card.Text as='div'>
                                                    <div className="pprice" key={myProduct._id}>
                                                        <p>₹ {myProduct.originalPrice}</p>
                                                        <h6>₹ {myProduct.sellingPrice}</h6>
                                                    </div>
                                                </Card.Text>
                                                <Card.Text>
                                                    {
                                                        cart.some((p) => p._id === myProduct._id) ? (
                                                            <Button variant='danger' onClick={() => {
                                                                dispatch({
                                                                    type: "REMOVE_FROM_CART",
                                                                    payload: myProduct
                                                                })
                                                            }}>
                                                                REMOVE FROM CART
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={() => {
                                                                dispatch({
                                                                    type: "ADD_TO_CART",
                                                                    payload: myProduct
                                                                })
                                                            }}>
                                                                ADD TO CART
                                                            </Button>
                                                        )
                                                    }
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Emptywishlist />
        </div>
    )
}

export default Wishlist