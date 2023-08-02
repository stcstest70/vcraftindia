export const initialState = null;

const reducer = (state, action) => {
    if(action.type === "USER"){
        //payload is the extra info coming with action type
        return action.payload;
    }
    return state;
}
export {reducer}
