import React from 'react';
import './Home.css';

const Notice = ({ onClose }) => {
    return (
        //   <div className="notice">
        //     <button className="close-button" onClick={onClose}>
        //       &times;
        //     </button>
        //     <div className="notice_header">
        //         <h4>*Notice</h4>
        //     </div>
        //     <div className="notice_content">
        //         <li>This is a demo website, depicting the entire process of E-Commerce website, including register, login, contact, searching, payment, and order placement!</li>
        //         <li>Any transaction done will not be deducted form the client side! To try the website, use any demo card details such as &#40; <span>Card Number : 4242 4242 4242 4242 , Exp date: 12/23, cvv: 123</span> &#41; </li>
        //     </div>
        //   </div>
        <div className="notice-container">
            <div className="notice-content">
                <div className="notice_header">
                    <h4>*Notice</h4>
                </div>
                <div className="notice_content">
                    <li>• This is a demo website, depicting the entire process of E-Commerce website, including register, login, contact, searching, payment, and order placement!</li>
                    <li>• Any transaction done will not be deducted form the client side! To try the website, use any demo card details such as &#40; <span>Card Number : 4242 4242 4242 4242 , Exp date: 12/23, cvv: 123</span> &#41; </li>
                </div>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className="notice-backdrop"></div>
        </div>
    );
};

export default Notice;