import { DELETE_PRODUCT, GET_PRODUCTS } from "../actions/types";

const initialState = {
  content: [],
  last: false,
  page: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        content: action.payload.content,
        last: action.payload.last,
        page: action.payload.page,
        size:  action.payload.size,
        totalElements:  action.payload.totalElements,
        totalPages: action.payload.totalPages,
        
      }
      case DELETE_PRODUCT:
        return {
          ...state,
          content: state.content.filter(product => product.id !== action.payload)
        }

    default:
      return state;
  }
}