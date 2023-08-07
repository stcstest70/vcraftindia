import React, { useState, useEffect, useContext } from 'react';
import { CartState } from '../../context/Context';
import './SinglePP.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
import { WishlistState } from '../../context/Context1';
import { UserContext } from '../../App';
import { Spinner } from 'react-bootstrap';
import EnlargedImageModal from './EnlargerImageModal';

const SinglePP = ({ Product, id }) => {
    const { state } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const {
        state: { cart },
        dispatch
    } = CartState();

    const {
        state1: { wishlist },
        dispatch1
    } = WishlistState();

    // console.log(wishlist);

    let finalObj = {};


    for (let i = 0; i < Product.length; i++) {
        Object.assign(finalObj, Product[i]);
    }

    //   var someDate = new Date();
    // var numberOfDaysToAdd = 2;
    // var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    // const now = new Date();

    //   const item = {
    // 	value: cart,
    // 	expiry: new Date().getTime() + 86400000,
    // }
    useEffect(() => {
        localStorage.setItem("UserCart", JSON.stringify(cart))
    }, [cart])
    useEffect(() => {
        localStorage.setItem("UserWishlist", JSON.stringify(wishlist))
    }, [wishlist])
    //modal variable
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //form variable
    const [userData, setUserData] = useState({ reviewerName: "", reviewtitle: "", reviewDescription: "" });
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    //variable to adjust add review button function

    const [addReviewFormIfUserPresent, setaddReviewFormIfUserPresent] = useState(false);

    const reviewFormIfUserLoggedIn = () => {
        if (addReviewFormIfUserPresent) {
            handleShow();
        }
        else {
            navigate('/login');
        }
    }
    const componentDidMount = () => {
        if (!addReviewFormIfUserPresent) {
            sessionStorage.setItem('previousUrl', window.location.href);
        }
    }
    //getting user name initially also additional purpose pincode
    // const [loading, setLoading] = useState(false);
    const [pincode, setPincode] = useState('');
    const [pincodeAvailable2, setPincodeAvailable2] = useState();

    const getUserDetails = async () => {
        try {
            const userToken = sessionStorage.getItem('UserToken');
            const res = await fetch('https://vci-api.onrender.com/getUserData', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userToken
                })
            });

            const udata = await res.json();
            const data = udata.user;
            if (data) {
                setUserData({ ...userData, reviewerName: data.name });
                setaddReviewFormIfUserPresent(true);
                if (data.pincode >= 400001 && data.pincode <= 400104) {
                    setPincodeAvailable2(true);
                    setLoading(false);
                } else {
                    setPincodeAvailable2(false);
                    setLoading(false);
                }

            }
            if (!res.status === 200) {
                console.log("User not logged in");
            }

        } catch (err) {
            console.log(err);
        }
    }
    const [productImageUrl, setProductImageUrl] = useState('');
    useEffect(() => {

        getUserDetails();
        componentDidMount();

        // also getting image url for enlarge modal
        Product.map((p) => {
            setProductImageUrl(p.image);
        })
    }, []);
    // console.log(productImageUrl);



    //form submit

    const handleSubmit = async function (e) {
        e.preventDefault();
        const prodId = id;
        const { reviewerName, reviewtitle, reviewDescription } = userData;
        const userToken = sessionStorage.getItem('UserToken');
        const res = await fetch('https://vci-api.onrender.com/addReview', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prodId, reviewerName, rating, reviewtitle, reviewDescription, userToken
            })
        });
        if (res.status === 201) {
            window.alert("Review Sent Successfully successful");
        } else if (res.status === 401) {
            window.alert("Review not sent, user not logged in");
        } else if (res.status === 405) {
            window.alert("Please fill all the fields");
        } else {
            window.alert("Some error occured, please try again later");
        }
        handleClose();
    }

    //rating stars

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    //getting avgRating API
    const [averageRating, setaverageRating] = useState(0);

    const getAvgRating = async function () {
        try {
            const res = await fetch(`https://vci-api.onrender.com/reviews/average-score/${id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json"
                }
            });
            const data = await res.json().then(data => {
                const averageRating = data.averageRating;
                setaverageRating(averageRating);
            });
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getAvgRating();
    }, [setaverageRating]);


    // const DeliveryCharge = () => {
    //     Product.map((prod) => {
    //         setdelche(prod.deliveryCharge)

    //     });
    //     if (delche === 0) {
    //         return <h5 className='delh5' >Free</h5>
    //     } else {
    //         return <h5 className='delh5' >₹ {delche}</h5>
    //     }
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

    // console.log(Product.deliveryCharge);

    const [pincodeAvailable, setPincodeAvailable] = useState('');
    const handleCheckAvailability = () => {
        if (pincode === null || pincode.length !== 6) {
            setPincodeAvailable('Enter a valid Pincode');
        }
        else if (pincode >= 400001 && pincode <= 400104) {
            setPincodeAvailable('Product available for your location');
        } else {
            setPincodeAvailable('Product not available for your location');
        }
    };

    //large image modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // console.log(isModalOpen);

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className='singlePP'>
                {isModalOpen && (
                    <EnlargedImageModal imageUrl={productImageUrl} onClose={handleCloseModal} />
                )}
                {/* <EnlargedImageModal imageUrl={productImageUrl} onClose={handleCloseModal} /> */}
                <div className='PPleft'>
                    {Product.map((obj) => (
                        <div className="productImgContainer">
                            <img key={obj.id} src={obj.image} className="productImg" alt="ProductName" onClick={handleImageClick} />
                            {
                                wishlist.some((p) => p._id === obj._id) ? (
                                    <i class="fa-brands fa-gratipay activewishlist" onClick={() => {
                                        dispatch1({
                                            type: "REMOVE_FROM_WISHLIST",
                                            payload: obj
                                        })
                                    }}></i>
                                ) : (
                                    <i class="fa-brands fa-gratipay" onClick={() => {
                                        dispatch1({
                                            type: "ADD_TO_WISHLIST",
                                            payload: obj
                                        })
                                    }}></i>
                                )
                            }
                        </div>

                    ))}


                    <div className="btns">

                        {
                            cart.some((p) => p._id === id) ? (
                                <Button variant='danger' onClick={() => {
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: finalObj
                                    })
                                }}>
                                    REMOVE FROM CART
                                </Button>
                            ) : (
                                <Button onClick={() => {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: finalObj
                                    })
                                }}>
                                    ADD TO CART
                                </Button>
                            )
                        }
                        <Link to="/cart">
                            <button onClick={() => {
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: finalObj
                                })
                            }}>
                                BUY NOW
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='PPright'>
                    {Product.map((obj) => (


                        <div key={obj.id}>
                            <h2 key={obj.id}>{obj.name}</h2>

                            <div className='price'>
                                <h5 key={obj.id}>₹ {obj.originalPrice}</h5>
                                <h1 key={obj.id}>₹ {obj.sellingPrice}</h1>
                                <h3 key={obj.id}>{Math.floor((obj.originalPrice - obj.sellingPrice) * 100 / obj.originalPrice)}% off*</h3>
                            </div>
                        </div>
                    ))}
                    {!state ? (<>
                        <div className="checkAvailability">
                            <input
                                type="Number"
                                name="pin"
                                id="pin"
                                placeholder='Enter Pincode'
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                            <button onClick={handleCheckAvailability}>Check</button>
                        </div>
                        <div className='pincode_status'>{pincodeAvailable}</div>
                    </>

                    ) : loading ? <Spinner animation="border" /> : pincodeAvailable2 ? (
                        <div className='pincode-a-h'>Product available for your location</div>
                    ) : (
                        <div className='pincode-a-h'><span>*</span>Product not available for your location</div>
                    )}


                    {/* <div className="description del">
                        <h4>On Product Delivery Charge : ₹ 50</h4>
                        <DeliveryCharge />
                        {Product.map((obj) => (
                            
                            <h5 className='delh5' key={obj.id}>₹ {obj.deliveryCharge}</h5>
                        ))}
                    </div> */}
                    <div className="btns">
                        {
                            cart.some((p) => p._id === id) ? (
                                <Button variant='danger' onClick={() => {
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: finalObj
                                    })
                                }}>
                                    REMOVE FROM CART
                                </Button>
                            ) : (
                                <button onClick={() => {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: finalObj
                                    })
                                }}>
                                    ADD TO CART
                                </button>
                            )
                        }
                        <Link to="/cart">
                            <button onClick={() => {
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: finalObj
                                })
                            }}>
                                BUY NOW
                            </button>
                        </Link>
                    </div>
                    <div className="descriptionSection">

                        <div className="description">
                            <h4>Description</h4>
                            {Product.map((obj) => (
                                <>
                                    <h5 key={obj.id}>{obj.name}</h5>
                                    <h6>{obj.description}</h6>
                                    <h5 key={obj.id}>Dimension  :  {obj.dimension}</h5>
                                </>

                            ))}
                            {/* <ul>
                                <li>Advantage: Good price, good A grade quality, New Condition.</li>
                                <li>New compatible Toner Cartridge.</li>
                                <li>100% Compatible and Genuine Product.</li>
                                <li>Made with high quality components and superior chemical toner powder.</li>
                                <li>Compatible for: Printer Xerox WC5222/ 5225/ 5230 100% tested and quality guaranteed.</li>
                            </ul> */}
                        </div>
                        <div className="description">
                            <h4>Seller</h4>
                            <ul>
                                <li>vCraftIndia</li>
                                <li>6 months guaranteed</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviewContainer">
                <div className="reviewHeader">
                    <div className="avgRating">
                        <h3>Average Rating: {Product ? (
                            <>{averageRating}</>
                        ) : (
                            <p>Loading product...</p>
                        )}</h3>
                    </div>
                    <div className="addReviewbtn">
                        <Button onClick={reviewFormIfUserLoggedIn}>
                            Add Review
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Give Review</Modal.Title>
                            </Modal.Header>
                            <form method="post">
                                <Modal.Body>
                                    <div className="element">
                                        <input type="text" name="reviewerName" id="reviewerName" placeholder='Enter Name' value={userData.reviewerName} onChange={handleInputs} /> <br />
                                    </div>
                                    <div className="element_rating">
                                        <span className="ratingText">Rate : </span>
                                        {[...Array(5)].map((star, i) => {
                                            const ratingvalue = i + 1;
                                            return (
                                                <label>
                                                    <input
                                                        type='radio'
                                                        name='rating'
                                                        value={ratingvalue}
                                                        onClick={() => (setRating(ratingvalue))}
                                                    />
                                                    <FaStar
                                                        color={ratingvalue <= (hover || rating) ? "#ffc107" : "#C7C7C7"}
                                                        className='star'
                                                        onMouseEnter={() => setHover(ratingvalue)}
                                                        onMouseLeave={() => setHover(null)}
                                                    />

                                                </label>
                                            )
                                        })} <br />
                                    </div>
                                    <div className="element">
                                        <input type="text" name="reviewtitle" id="reviewtitle" placeholder='Title' value={userData.reviewtitle} onChange={handleInputs} /> <br />
                                    </div>
                                    <div className="element">
                                        <textarea name="reviewDescription" id="reviewDescription" placeholder='Enter review' value={userData.reviewDescription} onChange={handleInputs} /> <br />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                </div>
                <div className="reviewfooter">

                    {Product.map((obj, i) => (
                        <div key={i}>
                            <div>{obj.reviews.map((re) => {
                                return <div className="reviewfooteritem">
                                    <div className="itemheader">
                                        <div className={"stars" + re.rating}>
                                            <span>{re.rating}</span>
                                            <span><img src="/img/star-img.png" alt="⭐" /></span>
                                        </div>
                                        <div className="reviewtitle">
                                            {re.reviewtitle}
                                        </div>
                                    </div>
                                    <div className="reviewBy">
                                        By: {re.reviewerName}
                                    </div>
                                    <div className="itemdescription">
                                        {re.reviewDescription}
                                    </div>
                                </div>
                            })}</div>
                        </div>
                    ))}
                    {Product.map((prod) => {
                        let totalRe = prod.reviews.length;
                        if (totalRe === 0) {
                            return <div className="reviewfooteritem noreview">
                                <h4>No Reviews Yet!!</h4>
                            </div>
                        }
                        else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default SinglePP