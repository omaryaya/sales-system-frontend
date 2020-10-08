import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';

// check token & load
export const loadUser = () => (dispatch, getState) => {


    axios.get(Constants.APP_BACKEND_URL + "/auth/signin", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: TYPES.USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            console.error(err);
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
    const body = JSON.stringify({ usernameOrEmail, password });

    axios.post(Constants.APP_BACKEND_URL + "/auth/signin",
        body, config)
        .then(res => {
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

    axios.post(Constants.APP_BACKEND_URL + "/auth/signup",
        body, config)
        .then(res => {
            dispatch({
                type: TYPES.REGISTER,
                payload: res.data
            });
        }).catch(err => {

            dispatch({ type: TYPES.LOGIN_FAILURE })
            return false;
        })
}

export const logout = () => (dispatch, getState) => {


    axios.post(Constants.APP_BACKEND_URL + "/auth/logout/", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: TYPES.LOGOUT_SUCCESS,
            });
        }
        ).catch(err => {
            console.error(err);
            dispatch({
                type: TYPES.LOGIN_FAILURE
            });
        });

}

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const headers = {
        'Authorization': ''
    }


    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}




/* axios.interceptors.response.use((response) => {
    return response;
}, (error) => (dispatch, getState) => {
    // Do something with response error
    if (error.response.data.status === 401) {
        console.log('unauthorized, logging out ...');
        // dispatch(logout());
    }
    console.error("axios interceptor", error.response.data);
    dispatch(setAlert("error", error.response.data.message));
}); */