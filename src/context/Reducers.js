export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((c) => c._id !== action.payload._id),
            };
        case "CHANGE_CART_QTY":
            return {
                ...state, cart: state.cart.filter(c => c._id === action.payload._id ? (c.qty = action.payload.qty) : c.qty),
            }

        default:
            return state;
    }

}
export const wishlistReducer = (state1, action1) => {
    switch (action1.type) {
        case "ADD_TO_WISHLIST":
            return { ...state1, wishlist: [...state1.wishlist, { ...action1.payload }] }
        case "REMOVE_FROM_WISHLIST":
            return { ...state1, wishlist: state1.wishlist.filter((c) => c._id !== action1.payload._id) };
        default:
            return state1;
    }
}

// export const FilterReducer = (state2, action2) => {
//     switch (action2.type) {
//         case "UPDATE_FILTER_VALUE":
//             const { name, value } = action2.payload;
//             return {
//                 ...state2,
//                 filters:{
//                     ...state2.filters, [name]: value,
//                 }
//             }
//     }
// }