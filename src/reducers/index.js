import { combineReducers } from "redux";
import products from "./products";
import orders from "./orders";
import auth from "./auth";

export default combineReducers({
  products,
  orders,
  auth
});