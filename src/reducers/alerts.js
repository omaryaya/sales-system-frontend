import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types';


const initialState = {
    visible: false,
}

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                visible: true,
                severity: action.payload.severity,
                message: action.payload.message
            };
        case REMOVE_ALERT:
            return {
                visible: false,
            };
        default:
            return state;
    }
}