import React, { useEffect, useRef, useState, useContext } from 'react';
// import logo from "../../image/px-logo.png";
// import logo2 from "../../image/px1-logo.png";
import "./Nav.css";
import logo from "../../image/vc-logo2.png";
import logo2 from "../../image/vc-logo.png";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
// import { Category } from '../../StaticData/Category';
import { CartState } from '../../context/Context';
import { WishlistState } from '../../context/Context1';
import { DataContext } from '../../reducer/SearchReducer';

const Nav = () => {
  const { state, dispatch } = useContext(UserContext);
  const { state: { cart } } = CartState();
  const { state1: { wishlist } } = WishlistState();
  useEffect(() => {
    axios.get('https://vci-api.onrender.com/checkCookiePresent').then((res) => {
      if (res.status === 206) {
        dispatch({ type: "USER", payload: true })
      } else if (res.status === 406) {
        dispatch({ type: "USER", payload: false })
      } else {
        
        console.log("some error in nav");
      }
    })
  }, []);
  const Menu = () => {
    if (state) {
      return (
        <>
          <Link to="/profile">
            <li>PROFILE</li>
          </Link>
          <Link to="/logout">
            <li>LOGOUT</li>
          </Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link to="/login">
            <li>LOGIN</li>
          </Link>
          <Link to="/register">
            <li className='registernav'>REGISTER</li>
          </Link>
        </>
      )
    }
  }
  const Menuside = () => {
    if (state) {
      return (
        <>
          <Link to="/logout" onClick={handleLinkClick}><li>LOGOUT</li></Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link to="/login" onClick={handleLinkClick}><li>LOGIN</li></Link>
          <Link to="/register" onClick={handleLinkClick}><li>REGISTER</li></Link>
        </>
      )
    }
  }
  const CartSide = () => {
    if (cart.length === 0) {
      return (
        <span>CART</span>
      )
    }
    else {
      return (
        <span>{cart.length}</span>
      )
    }
  }
  const WishlistSide = () => {
    if (wishlist.length === 0) {
      return (
        <span>WISHLIST</span>
      )
    }
    else {
      return (
        <span>{wishlist.length}</span>
      )
    }
  }
  const [sideMenu, setSideMenu] = useState(true);
  const [MCtoggle, setMCtoggle] = useState(false);
  let menuRef = useRef();
  let menuRef2 = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target) && !menuRef2.current.contains(e.target)) {
        setSideMenu(true);
      }
    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });


  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://vci-api.onrender.com/getCategoryPX')
      .then((res) => setData(res.data))
      .catch((err) => { console.log(err, 'there is an error') });
  }, [setData]);

  //search logic
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const [show, setShow] = useState(false);
  // console.log(query);
  const allProductData = useContext(DataContext);
  const performSearch = (query) => {
    const results = allProductData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  //show logic
  useEffect(() => {
    if (query.length >= 1) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [query]);

  const NoMatchFound = () => {
    if (searchResults.length === 0) {
      return <span>No Match Found</span>
    }
  }
  const handleClick = () => {
    setShow(false);
    setQuery('');
  };
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShow(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // console.log(inputRef);

  const handleLinkClick = () => {
    setSideMenu(!sideMenu);
  };
  return (
    <div>
      <div className='nav-top'>
        <Link to="/">
          <div className="logo">
            <img src={logo2} alt='Px' />
            <img src={logo} alt='PrinterX' />
          </div>
        </Link>

        <div className="searchBar">
          <input ref={inputRef} type="text" className='search' value={query} onChange={(e) => { setQuery(e.target.value); performSearch(e.target.value); }} placeholder='Search Products' />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className='nav-right'>
          {/* <div className="wishlist">
                  <i className="fa-solid fa-heart"></i>
                  <span>Wishlist</span>
                </div> */}
          <div className="cart">
            <Link to="/wishlist">
              <i className="fa-brands fa-gratipay"></i>
              <WishlistSide />
            </Link>
          </div>
          <div className="cart">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <CartSide />
            </Link>
          </div>

          <div className="loginRegister">
            <i className="fa-solid fa-circle-user"></i>
            <ul className='ul'>
              <Menu />
            </ul>
          </div>

          <div className='bars' ref={menuRef2} onClick={() => setSideMenu(!sideMenu)}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
      <div className="nav-bottom">
        <div className="containerN">
          <ul>
            {data.map((Category, index) => {
              return <div>
                <li className={'l' + index} key={Category._id}><Link to={`/matchedProduct/${Category.name}`}>{Category.name}</Link></li>
              </div>

            })}

          </ul>
        </div>
        <div className="searchBar2">
          <input type="text" ref={inputRef} className='search' value={query} onChange={(e) => { setQuery(e.target.value); performSearch(e.target.value); }} placeholder='Search Products' />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div ref={menuRef} className={sideMenu ? "sidemenu NA" : "sidemenu"}>
        <div className="menuoptions">
          <div className={MCtoggle ? 'o1' : "o1 optionActive"} onClick={() => setMCtoggle(false)}><h4>MENU</h4></div>
          <div className={MCtoggle ? 'o2 optionActive' : "o2"} onClick={() => setMCtoggle(true)}><h4>CATEGORIES</h4></div>
        </div>
        <div className={MCtoggle ? "menu" : "menu activeMC"}>
          <ul className='menuul'>
            <Link to="/profile" onClick={handleLinkClick}><li>PROFILE</li></Link>
            <Link to="/" onClick={handleLinkClick}><li>HOME</li></Link>
            <Link to="/contact" onClick={handleLinkClick}><li>CONTACT</li></Link>
            <Link to="/trackOrders" onClick={handleLinkClick}><li>TRACK ORDER</li></Link>
            <Link to="/wishlist" onClick={handleLinkClick}><li>WISHLIST</li></Link>
            <Menuside />
          </ul>
        </div>
        <div className={MCtoggle ? "catmenu activeMC" : "catmenu"}>
          <ul className='categoriesoption'>
            {data.map((Category) => {
              return <div>
                <li key={Category._id}><Link to={`/matchedProduct/${Category.name}`}>{Category.name}</Link></li>
              </div>

            })}

          </ul>
        </div>
      </div>

      {/* <div className="searchResultContainer"> */}
      <div className={show ? 'searchResultContainer' : 'notactive'} ref={searchContainerRef}>
        {searchResults.map((product) => (

          <div key={product._id} className='searchResultLink'><Link to={`/products/${product._id}`} onClick={handleClick}>{product.name}</Link></div>

        ))}

        <NoMatchFound />
      </div>
    </div>
  )
}

export default Nav