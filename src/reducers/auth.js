import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from '../actions/types';

// let token = localStorage.getItem('token');
// let isAuth = token? true:false;
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:  false,
    loading: false
};

const auth = (state = initialState, action) =>{
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.access
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        case SIGNUP_FAILED:
        case LOGIN_FAILED:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}
export default auth;