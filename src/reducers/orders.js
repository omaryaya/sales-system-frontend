import { GET_ORDERS, DELETE_ORDER, GET_PRODUCTS_BY_ORDER_ID } from "../actions/types";

const initialState = {
  content: [
    {
      products: {
        content: [],
        last: false,
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0,
      }
    }
  ],
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
        content: action.payload.content,
        last: action.payload.last,
        page: action.payload.page,
        size: action.payload.size,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,

      }
    case GET_PRODUCTS_BY_ORDER_ID:
      return {
        ...state,
        content: state.content.map(
          (order, i) => order.id === action.payload.orderId ? { ...order, products: action.payload.products }
            : order
        )

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