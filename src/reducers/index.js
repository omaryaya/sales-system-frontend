import { combineReducers } from "redux";
import products from "./products";
import orders from "./orders";
import customers from "./customers";
import auth from "./auth";
import alerts from "./alerts";
import dashboard from "./dashboard";

export default combineReducers({
  products,
  orders,
  customers,
  auth,
  alerts,
  dashboard
});