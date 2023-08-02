import Nav from "./components/navbar/Nav";
import Footer from "./components/footer/Footer"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import ProductPP from './components/singleProductPage/SinglePP';
import { Routes, Route } from "react-router-dom";
import Home from './components/home/Home.js';
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/Logout";
import { createContext, useReducer } from 'react';
import { initialState, reducer } from "./reducer/UseReducer";
// import { Category } from "./StaticData/Category";
import MatchedProduct from "./components/matchedProduct/MatchedProduct";
import Contact from "./components/contact/Contact";
import ProductsPage from "./components/ProductPage/ProductsPage";
import Cart from "./components/cart/Cart";
import EmailVerify from "./components/EmailVerify/emailVerify";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import TrackOrders from "./components/TrackOrders/TrackOrders";
import Wishlist from "./components/wishlist/Wishlist";
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import Profile from "./components/profile/Profile";


export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  if ("UserCart" in localStorage) {
    //Do nothing
  } else {
    localStorage.setItem("UserCart", JSON.stringify([]));
  }
  if ("UserWishlist" in localStorage) {
    //Do nothing
  } else {
    localStorage.setItem("UserWishlist", JSON.stringify([]));
  }
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/products/:id" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/matchedProduct/:name" element={<MatchedProduct />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={< Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orderpage" element={<PaymentPage />} />
          <Route path="/trackOrders" element={<TrackOrders />}/>
          <Route path="/forgotpassword" element={<ForgotPassword />}/>
          <Route path="/users/:id/resetPassword/:token" element={<ResetPassword />}/>
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        </Routes>
        <Footer />
      </UserContext.Provider>

    </>
  );
}

export default App;
