import React from 'react'
import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import verified from "../../image/verified.jpg"
import './emailVerify.css'

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	// console.log(param.id);
	// console.log(param.token)
    
    useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
                const res = await fetch(`/user/${param.id}/verify/${param.token}`, {
                    method: 'GET',
                  });
                  const data = await res.json();
				// const url = `/user/${param.id}/verify/${param.token}`;
				// const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
  return (
    <Fragment>
			{validUrl ? (
                <div className='verified-container'>
					<div className='verified-img-container'>
						<img src={verified} alt="Email Verified" />
					</div>
					<h1 className='verified-img-header'>Email verified successfully</h1>
					<div className='verified-btn-container'>
						<Link to="/login" >
							<button className='verified-btn'>Login</button>
						</Link>
					</div>
					
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
  )
}

export default EmailVerify;