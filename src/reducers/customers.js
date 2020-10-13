import { GET_CUSTOMERS, CREATE_CUSTOMER, DELETE_CUSTOMER } from "../actions/types";

const initialState = {
  customers: []

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload

      }
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload)
      }

    case CREATE_CUSTOMER:
    default:
      return state;
  }
}