import React,{useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Logout = () => {
    const history = useNavigate();
    const {state, dispatch} = useContext(UserContext);
    useEffect(()=>{
        fetch('https://vci-api.onrender.com/logout', {
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER", payload:false})
            history('/', {replace:true});
            if (res.status != 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    });
  return (
    <div>
        <h1>
            Logout Page
        </h1>
    </div>
  )
}

export default Logout