import './Login.css'
import React from 'react'
import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';

const ResetPassword = () => {

    const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    const id = param.id;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
                const res = await fetch(`https://vci-api.onrender.com/user/${param.id}/resetPassword/${param.token}`, {
                    method: 'GET',
                  });
                  if(res.status === 200){
                    setValidUrl(true);
                  }else if(res.status === 400){
                    setValidUrl(false);
                  }
				
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
    // console.log('valid url is ' + validUrl);

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const resetPassword = async (e)=>{
        setLoading(true);
        e.preventDefault();
        if(!password || !cpassword){
            window.alert('Please enter all fields');
            setLoading(false);
        }
        else if(password!== cpassword){
            window.alert('Password and Confirm password do not match');
            setLoading(false);
        }
        else{
            try {
                const res = await fetch('https://vci-api.onrender.com/resetPassword', {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        id,
                        password
                    })
                });
                if(res.status === 201){
                    window.alert('Password Updated successfully');
                    setLoading(false);
                    navigate('/login');
                }else if(res.status === 400){
                    window.alert('Please enter all fields');
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                window.alert('Internal server error');
                setLoading(false);
            }
        }
    }
    return (
        
    <Fragment>
    {validUrl ? (
        <div>
        <form className="loginPage" method="POST">
          <h2> Reset Password</h2> <br /> <br />
          <div className='labF'> <label for="email"><i className="fa-solid fa-lock" />
          </label> <input type="password" name="email" id="email" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div> <br />
          <div className='labF'> <label for="password"><i className="fa-solid fa-lock" />
          </label> <input type="password" name="userpassword" id="password" placeholder='Confirm Password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} required/>
          </div> <br />
  
          <div className="signIn">
            {loading ? <Spinner animation="border" /> : <button type="submit" name="signIn" onClick={resetPassword}>Reset Password</button>  }
            
          </div>
        </form>
      </div>
    ) : (
        <h1>404 Not Found</h1>
    )}
</Fragment>
    )
}

export default ResetPassword