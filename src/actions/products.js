import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';
import {setAlert} from './alerts';
import {tokenConfig} from './auth';

// Get Products

export const getProducts = (page=0, size=Constants.DEFAULT_PAGE_SIZE) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
        params: {page: page, size: size}
    };
    axios.get(Constants.APP_BACKEND_URL+"/products/all", requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.GET_PRODUCTS,
            payload: res.data
        });
        
    }).catch(err => {
        dispatch(setAlert("error", err.response.data.message));
    });
    
}

// get products list
export const getProductsList = () => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };
    axios.get(Constants.APP_BACKEND_URL+"/products/all/list", requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.GET_PRODUCTS_LIST,
            payload: res.data
        });
        
    }).catch(err => console.error(err));
    
}

// Update Product
export const updateProduct = (product) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    
    const requestConfiguration = {
        headers: configuredToken,
    };
    
    axios.put(Constants.APP_BACKEND_URL+"/products/product/", product, requestConfiguration)
    .then(res => {
        dispatch(getProducts());

        dispatch(setAlert("success", res.data.message));
    }).catch(err => {
      
        console.error(err.response);
        dispatch(setAlert("error", err.response.data.message));
    });
}


// Delete Product
export const deleteProduct = (id) => (dispatch, getState) => {
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };
    axios.delete(Constants.APP_BACKEND_URL+`/products/product/${id}/`, requestConfiguration)
    .then(res => {
        console.log("res", res);
        dispatch({
            type: TYPES.DELETE_PRODUCT,
            payload: id
        });
        dispatch(getProducts());
        dispatch(setAlert("success", res.data.message));


    }).catch(err => {
        dispatch(setAlert("error", err.response.data.message));
    });
}

// Create Product
export const createProduct = (productRequest) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    
    const requestConfiguration = {
        headers: configuredToken,
    };
    
    axios.post(Constants.APP_BACKEND_URL+"/products/create/", productRequest, requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.CREATE_PRODUCT_SUCCESS,
            payload: res.data
        });
        dispatch(getProducts());

        dispatch(setAlert("success", res.data.message));
    }).catch(err => {
      
        console.error(err.response);
        dispatch(setAlert("error", err.response.data.message));
    });
}
