import {
    SET_YEAR_PROFIT,
} from '../actions/types';
const initialState = {
    yearProfit: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_YEAR_PROFIT:
            return {
                ...state,
                yearProfit: action.payload,
            }
        default:
            return state;
    }
}