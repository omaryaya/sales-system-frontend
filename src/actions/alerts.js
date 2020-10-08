import * as Constants from '../constants';
import * as TYPES from './types';


export const setAlert = (severity="info", message) => (dispatch, getState) => {
    const payload = {
        severity,
        message
    };
    
    dispatch({
        type: TYPES.SET_ALERT,
        payload
    });

    setTimeout(() => dispatch({type: TYPES.REMOVE_ALERT}), Constants.TIMEOUT);
}