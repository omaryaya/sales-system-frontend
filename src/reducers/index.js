import { combineReducers } from "redux";
import products from "./products";
import orders from "./orders";
import auth from "./auth";
import alerts from "./alerts";
import dashboard from "./dashboard";

export default combineReducers({
  products,
  orders,
  auth,
  alerts,
  dashboard
});