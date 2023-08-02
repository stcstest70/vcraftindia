import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { AiFillHeart } from 'react-icons/ai';
import { Spinner } from 'react-bootstrap';
import validator from 'validator';
import ConfirmBox from '../ConfirmBox/ConfirmBox';
import { CartState } from '../../context/Context';
import { WishlistState } from '../../context/Context1';

const Profile = () => {
    const {
        state: { cart },
        dispatch
    } = CartState();

    const {
        state1: { wishlist },
        dispatch1
    } = WishlistState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const loginCheck = async () => {
        setLoading(true);
        const res = await fetch('/getUserData', {
            method: 'GET',
            headers: {
                "Accept": "appliation/json"
            }
        });
        if (res.status === 401) {
            setLoading(false);
            navigate('/login');
        }
        const data = await res.json();
        setData(data);
        setid(data._id);
        setName(data.name);
        setaddress(data.address);
        setcontact(data.phone);
        setemail(data.email);
        setLoading(false);
    }
    useEffect(() => {
        loginCheck();
    }, []);

    //edit buttons
    const [edit1, setEdit1] = useState(false);
    const [edit2, setEdit2] = useState(false);

    //variables
    const [id, setid] = useState('');
    const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [contact, setcontact] = useState('');
    const [email, setemail] = useState('');

    //form submit

    const handlesubmit1 = async () => {
        const cleanNumber = contact.toString().replace(/\D/g, '');

        if (cleanNumber.length !== 10 || !validator.isMobilePhone(cleanNumber).toString()) {
            window.alert('Invalid Contact Number')
        } else {
            if (name === '' || address === '') {
                window.alert('Enter all fields')
            }
            else {
                try {
                    const res = await fetch('/updateProfileInfo', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            id, name, address, contact
                        })
                    });
                    if (res.status === 201) {
                        window.alert("Personal Information Updated Successfully!");
                        loginCheck();
                        
                    }
                    else if (res.status === 401) {
                        window.alert("Error : Please Enter all fields, from Server");
                    } else {
                        window.alert("Internal server error");
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const handlesubmit2 = async () => {
        if (!validator.isEmail(email)) {
            window.alert('Please Enter a valid E-mail');
        } else {
            try {
                const res = await fetch('/updateProfileEmail', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        id, email
                    })
                });
                if (res.status === 201) {
                    window.alert("Email Updated Successfully!");
                    navigate('/login');
                }
                else if (res.status === 401) {
                    window.alert("Error : Please Enter all fields, from Server");
                } else {
                    window.alert("Internal server error");
                }

            } catch (error) {
                console.log(error);
            }
        }
    }
    //confirm box 
    const [open, setOpen] = useState(false);
    function openConfirmBox() {
        setOpen(true);
    }
    const deleteUser = async () => {
        try {
            const res = await fetch('/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                })
            });
            if (res.status === 201) {
                localStorage.removeItem("UserCart");
                localStorage.setItem("UserCart", JSON.stringify([]));
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: cart
                });
                localStorage.removeItem("UserWishlist");
                localStorage.setItem("UserWishlist", JSON.stringify([]));
                dispatch1({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: wishlist
                });
                window.alert("Account deleted Successfully!");
                navigate('/');
            }
            else if (res.status === 401) {
                window.alert("Error : Please Enter all fields, from Server");
            } else {
                window.alert("Internal server error");
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='profilePageContainer'>
            {loading ? <Spinner /> : <div className="profilepage">
                <div className="profileleft">
                    <div className="helloUser">
                        <div className="profilelogo">
                            <img src="./img/profilelogo.png" alt="Profile" />
                        </div>
                        <div className="profileName">
                            <span>Hello,</span><br /><h6>{data.name}</h6>
                        </div>
                    </div>
                    <div className="userOptions">
                        <div className="optionlist">
                            <ul>
                                <li className='li2'><img src="./img/user.png" alt="user" /> <span>PROFILE</span></li>
                                <li className='li1'><img src="./img/orders.png" alt="orders" /> <span><Link to='/trackOrders'>MY ORDERS</Link></span></li>
                                <li className='li4'><AiFillHeart /> <span><Link to='/wishlist'>WISHLIST</Link></span></li>
                                <li className='li3'><RiLogoutCircleRLine /> <span><Link to='/logout'>LOGOUT</Link></span></li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className="optionlist2">
                            <div className="optioncontainer">
                                <div className="option2">
                                <img src="./img/user.png" alt="user" /> <span>PROFILE</span>
                                </div>
                                <div className="option2">
                                <img src="./img/orders.png" alt="orders" /> <span><Link to='/trackOrders'>ORDERS</Link></span>
                                </div>
                            </div>
                            <div className="optioncontainer">
                                <div className="option2">
                                <AiFillHeart /> <span><Link to='/wishlist'>WISHLIST</Link></span>
                                </div>
                                <div className="option2">
                                <RiLogoutCircleRLine /> <span><Link to='/logout'>LOGOUT</Link></span>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="profileright">
                    <div className="personaldetails">
                        <div className="detailss">
                            <h5>Personal Information</h5> <button onClick={() => setEdit1(!edit1)}>{edit1 ? 'Cancel' : 'Edit'}</button>
                            <button id='savebtn' onClick={handlesubmit1} className={edit1 ? 'savebtn savebtn_active' : "savebtn"}>Save</button>
                        </div>
                        <div className="changedetails">
                            <div className={edit1 ? 'changedetailsdiv1' : 'changedetailsdiv1 edit_active'}>
                                <div className="detail">
                                    <span>Name</span>
                                    <span>{data.name}</span>
                                </div>
                                <div className="detail">
                                    <span>Address</span>
                                    <span>{data.address}</span>
                                </div>
                                <div className="detail">
                                    <span>Contact</span>
                                    <span>{data.phone}</span>
                                </div>
                            </div>
                            <div className={edit1 ? 'changedetailsdiv2 edit_active' : 'changedetailsdiv2'}>
                                <div className="detail detailformelement">
                                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="detail detailformelement">
                                    <input type="text" placeholder='Address' value={address} onChange={(e) => setaddress(e.target.value)} required />
                                </div>
                                <div className="detail">
                                    <input type="Number" placeholder='Contact Number' value={contact} onChange={(e) => setcontact(e.target.value)} required />
                                </div>
                            </div>

                            <div className="detailss">
                                <h5>E-Mail Address</h5> <button onClick={() => setEdit2(!edit2)}>{edit2 ? 'Cancel' : 'Edit'}</button>
                                <button id='savebtn' onClick={handlesubmit2} className={edit2 ? 'savebtn savebtn_active' : "savebtn"}>Save</button>
                            </div>
                            <div className={edit2 ? "emailnote" : "emailnote displaynone"}>
                                <span>#Note: Changing E-mail will log you out and require you to verify new Email address!</span>
                            </div>
                            <div className={edit2 ? 'changedetailsdiv1' : 'changedetailsdiv1 edit_active'}>
                                <div className="detail detailemail">
                                    <span>Email</span>
                                    <span>{data.email}</span>
                                </div>

                            </div>
                            <div className={edit2 ? 'changedetailsdiv2 edit_active' : 'changedetailsdiv2'}>
                                <div className="detail detailemail">
                                    <input type="text" placeholder='Address' value={email} onChange={(e) => setemail(e.target.value)} />

                                </div>
                            </div>

                        </div>
                        <div className="deactivate">
                            <span onClick={() => openConfirmBox()}>Deactivate Account</span>
                        </div>
                        <div className="profulerightimg">
                            <img src="./img/profilefooter.png" alt="profile page" />
                        </div>
                    </div>

                </div>
            </div>}

            <ConfirmBox
                open={open}
                closeDialog={() => setOpen(false)}
                deleteFunction={deleteUser}
            />
        </div>
    )
}

export default Profile