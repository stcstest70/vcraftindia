import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from "../../App"

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentPageURL = window.location.origin; 

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        currentPageURL
      })
    });
    const data = await res.json();
    if (res.status === 201) {
      window.alert("Login Successfull!");
      console.log("Login Successfull!");
      dispatch({ type: "USER", payload: true })
      // navigate("/");
      const previousUrl = sessionStorage.getItem('previousUrl');
      if (previousUrl) {
        sessionStorage.removeItem('previousUrl');
        window.location.href = previousUrl;
      } else {
        // redirect the user to the default page
        window.location.href = '/';
      }
    }
    else if (res.status === 400) {
      window.alert("An email has been sent to your account. Please verify to continue!");
    }
    else if (res.status === 401) {
      window.alert("Email is not registered !");
    }
    else if (res.status === 402) {
      window.alert("Invalid Credentials  !");
    }
    else {
      window.alert("Some error occured in login");
    }
  }

  return (
    <div>
      <form className="loginPage" method="POST">
        <h2> Login Here</h2> <br /> <br />
        <div className='labF'> <label for="email"><i className="fa-solid fa-user" />
        </label> <input type="text" name="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div> <br />
        <div className='labF'> <label for="password"><i className="fa-solid fa-lock" />
        </label> <input type="password" name="userpassword" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div> <br />

        <div className="signIn">
          <button type="submit" name="signIn" onClick={loginUser}>Sign In</button>
        </div>
        <br /> 
        <div className="signup">
          <h6>Don't have a account ? <Link to="/register">Sign Up</Link></h6>
        </div>
        <div className="signup">
          <h6>Don't remember password ? <Link to="/forgotpassword">Forgot Password</Link></h6>
        </div>
      </form>
    </div>
  )
}

export default Login