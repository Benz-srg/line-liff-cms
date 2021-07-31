import { combineReducers } from "redux";
import productReducer from "./product.reducer";
import categoriesReducer from "./categories.reducer";
import couponReducer from "./coupon.reducer";
import customerReducer from "./customer.reducer";
import adminReducer from "./admin.reducer";
import basketReducer from "./basket.reducer";
import checkoutReducer from "./checkout.reducer";
import bankReducer from "./bank.reducer";
import orderReducer from "./order.reducer";
import roleReducer from "./role.reducer";
import aboutReducer from "./about.reducer";
import authAdminReducer from "./authAdmin.reducer";
import authCustomerReducer from "./authCustomer.reducer";
import permissionReducer from "./permission.reducer";
import paymentReducer from "./payment.reducer";
import allbankReducer from "./allbank.reducer";
import addressReducer from "./address.reducer";
import historiesReducer from "./history.reducer";
import dashboardReducer from "./dashboard.reducer";
import shippingReducer from "./shipping.reducer";
import promotionReducer from "./promotion.reducer";
import bannerReducer from "./banner.reducer";
/*  */
export default combineReducers({
  product: productReducer,
  categorie: categoriesReducer,
  coupon: couponReducer,
  customer: customerReducer,
  admin: adminReducer,
  basket: basketReducer,
  checkout: checkoutReducer,
  bank: bankReducer,
  orders: orderReducer,
  role: roleReducer,
  authAdmin: authAdminReducer,
  authCustomer: authCustomerReducer,
  permission: permissionReducer,
  payment: paymentReducer,
  allbank: allbankReducer,
  address: addressReducer,
  history: historiesReducer,
  dashboard: dashboardReducer,
  about: aboutReducer,
  shipping: shippingReducer,
  promotion: promotionReducer,
  banner: bannerReducer,
});
