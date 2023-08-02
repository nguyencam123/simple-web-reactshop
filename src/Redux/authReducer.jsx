// src/redux/authReducer.js
const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    username: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username,
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
