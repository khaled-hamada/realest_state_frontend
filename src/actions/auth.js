import axios from 'axios';
import { setAlert } from './alert';
import {
    SIGNUP_SUCCESS , 
    SIGNUP_FAILED,
    LOGOUT , 
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from './types';



export const login = (email, password) => async (dispatch) =>{
    //set up http prot. parameters 
    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});
   console.log(body); 
    try{
        const response = await axios.post(`http://127.0.0.1:8000/api/token/`,
            body, config)

        // call dispatch to fire login success action
        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data // data here is the jwt access token
        })

        //alert user 
        dispatch(setAlert("Authenticated Successfully", "success"));


    }catch(error){
         dispatch({
            type:LOGIN_FAILED,
        })

        //alert user 
        dispatch(setAlert("Cannot Authenticate User", "error"));
    }
    
}

export const signup = (email,username, password, password2) => async (dispatch) =>{
    //set up http prot. parameters 
    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(email,username, password,password2);

    try{
        const response = await axios.post(`http://127.0.0.1:8000/api/accounts/signup/`,
            body, config)

        // call dispatch to fire signup success action 
        dispatch({
            type:SIGNUP_SUCCESS,
            payload:response.data 
        }) 
        // call it again to log user in 
        dispatch(login(email, password))

    }catch(error){
         console.log(error)
         dispatch({
            type:SIGNUP_FAILED,
        })

        //alert user 
        dispatch(setAlert("Error Creating New User", "error"));
    }
    
}


export const logout = ()=>(dispatch) =>{
      dispatch(setAlert('logout successful.', 'success'));
      dispatch({ type: LOGOUT });
}

