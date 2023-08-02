import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const currentPageURL = window.location.origin; 

    const checkUserEmail = async (e) => {
        setLoading(true);
        e.preventDefault();
        const res = await fetch('https://vci-api.onrender.com/forgotPassword', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                email, currentPageURL
            })
        });
        if (res.status === 201) {
            window.alert('Reset Password Link has been sent to your Email !');
            setLoading(false);
        } else if (res.status === 400) {
            window.alert('Please fill all fields !');
            setLoading(false);
        }
        else if (res.status === 401) {
            window.alert('Email not registered.Please sign up !');
            setLoading(false);
        }
        else if (res.status === 402) {
            window.alert('Internal server error !');
        }
    }
    return (
        <div>
            <form className="loginPage" method="POST">
                <h2> Recover Password</h2> <br /> <br />
                <div className='labF'> <label for="email"><i className="fa-solid fa-user" />
                </label> <input type="text" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div> <br />
                <div className="signIn">
                    {loading ? <Spinner animation="border" /> :
                        <button type="submit" name="signIn" onClick={checkUserEmail}>Submit</button>
                    }</div><br /> <br />

                <div className="signup">
                    <h6>Don't have a account ? <Link to="/register">Sign Up</Link></h6>
                </div>

            </form>
        </div>
    )
}

export default ForgotPassword