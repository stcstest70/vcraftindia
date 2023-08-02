import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import reg from "../../image/reg.jpg";
import { Spinner } from 'react-bootstrap';
import validator from 'validator';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "", phone: "", address: "", city: ""
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  // const [error, setError] = useState('');
  // const [error2, setError2] = useState('');
  const validatePassword = (e) => {
    setPassword(e.target.value);
  }
  const validateCpassword = (e) => {
    setCpassword(e.target.value);
  }
  const validateemail = (e) => {
    setEmail(e.target.value);
    // if (!validator.isEmail(email)) {
    //   setError("please Enter a valid email");
    // }
    // else{
    //   setError('');
    //   return true
    // }
    // if(regex.test(email)===false){
    //   setError("please Enter a valid email");
    // }
  }
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');

  const validatePhone = (e) => {
    setPhone(e.target.value);
    // const cleanNumber = phone.toString().replace(/\D/g, '');

    // if (cleanNumber.length !== 10 || !validator.isMobilePhone(cleanNumber).toString()) {
    //   setError2("Enter a valid phone number");
    // }
    // else{
    //   setError2('');
    //   return true
    // }

  }
  const [msg, setMsg] = useState("");
  const currentPageURL = window.location.origin; 
  

  const PostData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { name, address, city } = user;
    if (!name || !email || !phone || !pincode || !city || !address || !password || !cpassword) {
      setLoading(false);
      window.alert("Please Enter all fields!");
    }
    else if (!validator.isEmail(email)) {
      setLoading(false);
      window.alert("Enter a valid Email");
    }
    else if (phone.length !== 10 || !validator.isMobilePhone(phone.toString().replace(/\D/g, '')).toString()) {
      setLoading(false);
      window.alert("Enter a valid Phone Number");
    }
    else if (pincode.length !== 6) {
      setLoading(false);
      window.alert("Enter a valid PINCODE");
    }
    else if (!validator.isLength(password, { min: 8 })) {
      setLoading(false);
      window.alert("Password must be at least 8 characters long.");
    }
    else if (!validator.isStrongPassword(password)) {
      setLoading(false);
      window.alert("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.");
    }
    else if (password !== cpassword) {
      setLoading(false);
      window.alert("Password and Confirm Password do not match");
    }
    else {
      const { name, address, city } = user;
      const res = await fetch("/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, phone, address, city, pincode, password, currentPageURL
        })
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        setLoading(false);
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      }
      else if (res.status === 201) {
        setLoading(false);
        console.log("Registration Successfull!!");
        setMsg(res.message);
        window.alert("Registration Successfull! An email has been sent to your account, please verify!");
        // navigate("/login");
      }

    }

  }
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regex2 = /\d/;
  return (
    <div className='registerPage'>
      <div className='registerContainer'>
        <div className="regImgContainer">
          <div className="regImg">
            <img src={reg} alt="Register here" />
          </div>
        </div>
        <form className='registerForm'>
          <h2> Register Now</h2> <br />
          <div className='form-ele'>
            <div className="ele">
              <label htmlFor="name">Name </label> <br />
              <input type="text" name="name" id='name' value={user.name} onChange={handleInputs} required /><br />
            </div>
            <div className="ele">
              <label htmlFor="address">Address </label> <br />
              <input type="text" name="address" id='address' value={user.address} onChange={handleInputs} required /><br />
            </div>
            <div className="ele">
              <label htmlFor="city">City </label> <br />
              <input type="text" name="city" id='city' value={user.city} onChange={handleInputs} required /><br />
            </div>
            <div className="ele">
              <label htmlFor="pincode">Pincode </label> <br />
              <input type="Number" name="pincode" id='pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} required /><br />
            </div>
            <div className="ele">
              <label htmlFor="email">E-mail </label> <br />
              <input type="email" name="email" id='email' value={email} onChange={validateemail} required /><br />

            </div>
            {/* <p>{error}</p> */}
            <div className="ele">
              <label htmlFor="phone">Contact No.  </label> <br />
              <input type="Number" name="phone" id='phone' pattern="[1-9]{1}[0-9]{9}" value={phone} onChange={validatePhone} required /><br />
            </div>
            {/* <p>{error2}</p> */}
            <div className="ele">
              <label htmlFor="password">Enter Password </label> <br />
              <input type="text" name="password" id='password' value={password} onChange={validatePassword} required /><br />
            </div>
            <span className='password-description'>Password must be at least 8 characters long, must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.</span>
            <div className="ele">
              <label htmlFor="cpassword">Retype Password </label>
              <input type="text" name="cpassword" value={cpassword} onChange={validateCpassword} id='cpassword' required /><br /><br />
            </div>
            <div className="register">
              <button><Link to="/">Cancel</Link></button>
              {loading ? <div className="spinner"><Spinner animation="border" /></div> : <button type='submit' onClick={PostData}>Submit</button>}

            </div>
            <div className="signin">
              <h6>Already have an account ? <Link to="/login">Sign In</Link></h6>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Register