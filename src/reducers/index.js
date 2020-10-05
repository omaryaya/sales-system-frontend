import { combineReducers } from "redux";
import products from "./products";
import categories from "./categories";
import orders from "./orders";
import auth from "./auth";

export default combineReducers({
  products,
  categories,
  orders,
  auth
});