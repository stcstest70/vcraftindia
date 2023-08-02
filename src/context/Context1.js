import React from 'react'
import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react'
import { wishlistReducer } from './Reducers';

const Wishlist = createContext();

const getLocalCartData = () =>{
    let localCartData = localStorage.getItem("UserWishlist");
    if(localCartData === null){
        return [];
    }else{
        return JSON.parse(localCartData)
    }
}

const Context1 = ({ children }) => {
    // const products = AllProduct;
    const [state1, dispatch1] = useReducer(wishlistReducer,{
        // products: products,
        // cart:[]
        wishlist:getLocalCartData()
    })
  return <Wishlist.Provider value={{state1, dispatch1}}>{children}</Wishlist.Provider>
  
}

export default Context1

export const WishlistState = ()=>{
    return useContext(Wishlist)
}