// import { useContext, createContext, useReducer, useEffect} from 'react';

// const FilterContext = createContext();

// const initialState = {
//     filters:{
//         text:"",
//     }
// }

// const SearchContext = ({ children }) => {
//     const updateFilterValue = (event) =>{
//         let name = event.target.name;
//         let value = event.targer.value;

//         return dispatch({type:"UPDATE_FILTER_VALUE", payload:{name, value}});
//     }
//   return <FilterContext.Provider value={{updateFilterValue}}>{children}</FilterContext.Provider>
  
// }

// export default SearchContext

// export const useFilterContext = () =>{
//     return useContext(FilterContext);
// }

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://vci-api.onrender.com/getAllProducts', {
          params: {
            fields: ['_id', 'name'], // Array of field names
          },
        });
        setAllProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [setAllProducts]);

  return (
    <DataContext.Provider value={allProducts}>
      {children}
    </DataContext.Provider>
  );
};