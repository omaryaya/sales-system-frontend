import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';

// check token & load
export const loadUser = () => (dispatch, getState) => {
    // Load in progress
    dispatch({ type: TYPES.USER_LOADING });

    // get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // if token exists, add to headers config
    if (token) {
        config.headers['Authorization'] = `bearer ${token}`;
    }

    axios.get(Constants.APP_BACKEND_URL + "/auth/signin", config)
        .then(res => {
            dispatch({
                type: TYPES.USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            console.error(err);
            console.debug(err);
            dispatch({ type: TYPES.AUTH_ERROR })
        })
}


export const login = (usernameOrEmail, password) => (dispatch) => {
    
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    // Request body
    const body = JSON.stringify({usernameOrEmail, password});

    axios.post(Constants.APP_BACKEND_URL + "/auth/signin",
     body, config)
        .then(res => {
            console.debug("login", res);
            dispatch({
                type: TYPES.LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {

            dispatch({ type: TYPES.LOGIN_FAILURE })
        })
}

export const register = (userdata) => (dispatch) => {
    
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    // Request body
    const body = JSON.stringify(userdata);
    console.debug("register/userdata", userdata);
    console.debug("register/body", body);

    axios.post(Constants.APP_BACKEND_URL + "/auth/signup",
     body, config)
        .then(res => {
            console.debug("signup", res);
            dispatch({
                type: TYPES.REGISTER,
                payload: res.data
            });
        }).catch(err => {

            dispatch({ type: TYPES.LOGIN_FAILURE })
            return false;
        })
}

export const logout = () => (dispatch) => {
    console.debug("logout");
    dispatch({
        type: TYPES.LOGOUT,
    })


/*     axios.post(Constants.APP_BACKEND_URL + "/auth/signin",
     body, config)
        .then(res => {
            console.debug("login", res);
            dispatch({
                type: TYPES.LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({ type: TYPES.LOGIN_FAILURE })
        }) */
}