import React, {useState, useEffect} from 'react'
import "./Contact.css"
import { UserContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
    
  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    const userContact = async ()=>{
        try{
          const res = await fetch('/getUserData',{
            method:"GET",
            headers:{
              "Content-Type": "application/json",
              Accept : "application/json"
            }
          });
    
          const data = await res.json();
          setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
    
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }
    
        }catch(err){
          console.log(err);
        }
      }
    
      useEffect(()=>{
        userContact();
      },[]);

      const handleInputs = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
    
        setUserData({...userData, [name]:value});
      }
      const {state} = useContext(UserContext);
      if(state){
        var contactForm = async (e)=>{
          e.preventDefault();
      
          const {name, email, phone, message} = userData;
      
          const res = await fetch('/contact',{
            method: "POST",
            headers:{
              "Content-Type" : "application/json",
            },
            body: JSON.stringify({
              name, email, phone, message
            })
          });
      
          const data = await res.json();
      
          if(res.status === 401){
            alert("Pls Enter all fields");
          }
          else if(res.status === 201){
            alert("message sent successfully!");
            setUserData({...userData, message:""})
          }
        }
      }else{
        navigate("/login");
      }

     

  return (
    <div className='contact'>
        <div className="left">
            <div className="container">
            <div className="header">
                      <hr />
                        <h6>View Store</h6>

                    </div>
                <iframe width="100%" height="90%" id="gmap_canvas" src="https://maps.google.com/maps?q=Paris%20Computers%20152,%20Modi%20St,%20Borabazar%20Precinct,%20Ballard%20Estate,%20Fort,%20Mumbai,%20Maharashtra%20400001&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            
            </div>
        </div>
        <div className="right">
            <div className="container">
                <form method="POST" className='cf'>
                    <div className="header">
                      <hr />
                        <h6>Contact Form</h6>

                    </div>
                    <div className="element">
                        <input type="text" name="name" id="name" placeholder='Enter Name' value={userData.name} onChange={handleInputs}/> <br />
                    </div>
                    <div className="element">
                        <input type="text" name="email" id="email" placeholder='Enter Email' value={userData.email} onChange={handleInputs}/> <br />
                    </div>
                    <div className="element">
                        <input type="text" name="phone" id="phone" placeholder='Contact Number' value={userData.phone} onChange={handleInputs}/> <br />
                    </div>
                    <div className="element">
                    <textarea placeholder="Message" name="message" value={userData.message} onChange={handleInputs} cols="50" rows="10"></textarea>
                    </div>
                    <div>
                        <button type='submit' onClick={contactForm}>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Contact