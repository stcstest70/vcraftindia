import React from 'react'
import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { cartReducer } from './Reducers';

const Cart = createContext();

const getLocalCartData = () =>{
    let localCartData = localStorage.getItem("UserCart");
    if(localCartData === null){
        return [];
    }else{
        return JSON.parse(localCartData)
        // const item = JSON.parse(localCartData);
        
	    // const now = new Date();
        // if (now.getTime() > JSON.parse(localCartData).expiry) {
            
        //     localStorage.removeItem("UserCart");
        //     return [];
        // }
    }
}

const Context = ({ children }) => {
    // const products = AllProduct;
    const [state, dispatch] = useReducer(cartReducer,{
        // products: products,
        // cart:[]
        cart:getLocalCartData()
    })
  return <Cart.Provider value={{state, dispatch}}>{children}</Cart.Provider>
  
}

export default Context

export const CartState = ()=>{
    return useContext(Cart)
}