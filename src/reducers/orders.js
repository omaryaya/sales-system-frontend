import { GET_ORDERS, DELETE_ORDER, GET_CURRENCIES } from "../actions/types";

const initialState = {
  orders: [],
  currencies: [],
  content: [],
  last: false,
  page: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
        /* content: action.payload.content,
        last: action.payload.last,
        page: action.payload.page,
        size: action.payload.size,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages, */

      }
    case GET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload

      }
    case DELETE_ORDER:
      return {
        ...state,
        content: state.content.filter(order => order.id !== action.payload)
      }

    default:
      return state;
  }
}