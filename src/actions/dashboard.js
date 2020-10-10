import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';
import {setAlert} from './alerts';
import {tokenConfig} from './auth';

// Get Year Profit
export const getYearProfit = () => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };

    axios.get(Constants.APP_BACKEND_URL+"/dashboard/yearprofit", requestConfiguration)
    .then(res => {

        dispatch({
            type: TYPES.SET_YEAR_PROFIT,
            payload: res.data.object
        })
    }).catch(err => {
        console.error(err);
        
        dispatch(setAlert("error", err.response.data.message));
    
    });
}