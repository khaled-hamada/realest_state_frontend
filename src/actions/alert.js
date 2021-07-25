import {v4 as uuidv4} from 'uuid';
import { SET_ALERT , REMOVE_ALERT } from './types';

//note here 2 consec. arrow functions , thunk allows use to do this.
export const setAlert = (msg , alertType , timeout=5000) =>(dispatch, getState) =>{
    const id = uuidv4(); // generate unique id
    // if you want to halt dispatch and do any async. work do it here 
        /**
         * aync. logic here , like fetch or send data to a backend api / db .... 
         */
    // then resume dispatch again 

    dispatch({
        type : SET_ALERT,
        payload:{msg , alertType , id}
    });
    // romve alert after this amount of time which is in this case 5 sec. ===>> (async.)
    setTimeout(() => dispatch( {type:REMOVE_ALERT, payload:id} ) , timeout);
}