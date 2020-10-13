import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';
import {setAlert} from './alerts';
import {tokenConfig} from './auth';

// Get customers

export const getCustomers = (page=0, size=Constants.DEFAULT_PAGE_SIZE) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
        params: {page: page, size: size}
    };
    axios.get(Constants.APP_BACKEND_URL+"/customers/all", requestConfiguration)
    .then(res => {
        console.debug(res.data)
        dispatch({
            type: TYPES.GET_CUSTOMERS,
            payload: res.data
        });
        
    }).catch(err => {
        dispatch(setAlert("error", err.response.data.message));
    });
    
}


// Delete Customer
export const deleteCustomer = (id) => (dispatch, getState) => {
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };
    axios.delete(Constants.APP_BACKEND_URL+`/customers/customer/${id}/`, requestConfiguration)
    .then(res => {
        console.log("res", res);
        dispatch({
            type: TYPES.DELETE_CUSTOMER,
            payload: id
        });
        dispatch(getCustomers());
        dispatch(setAlert("success", res.data.message));


    }).catch(err => {
        dispatch(setAlert("error", err.response.data.message));
    });
}

// Create Customer
export const createCustomer = (customerRequest) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    
    const requestConfiguration = {
        headers: configuredToken,
    };
    
    axios.post(Constants.APP_BACKEND_URL+"/customers/create/", customerRequest, requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.CREATE_CUSTOMER,
            payload: res.data
        });
        dispatch(getCustomers());

        dispatch(setAlert("success", res.data.message));
    }).catch(err => {
      
        console.error(err.response);
        dispatch(setAlert("error", err.response.data.message));
    });
}
