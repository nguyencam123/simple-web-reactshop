// src/redux/authActions.js
export const loginSuccess = (isAdmin, username) => ({
    type: "LOGIN_SUCCESS",
    payload: {
        isAdmin,
        username,
    },
});

export const logout = () => ({
    type: "LOGOUT",
});
