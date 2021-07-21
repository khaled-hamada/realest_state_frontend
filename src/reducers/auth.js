import {
    SIGNUP_SUCCESS , 
    SIGNUP_FAILED,
    LOGOUT , 
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions/types'


const initialState={
    token : localStorage.getItem('token'),
    isAuthenticated : false ,
    loading : false
};


const auth = (state = initialState , action)=>{
    const{type, payload} = action;

    switch (type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                isAuthenticated:true,
                loading: false,
                token:payload.token
            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated:false,
                loading:false,
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
            return state;
    }


}


export default auth;