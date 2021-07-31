import { authAdminActiontype } from "@/actions/authAdmin.action";
import { HYDRATE } from "next-redux-wrapper";
import cookie from "js-cookie";

const getUser = cookie.get("user") ? JSON.parse(cookie.get("user")) : {};

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  user: getUser,
};

const authAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.authAdminReducer };
    case authAdminActiontype.LOADING_AUTH_ADDMIN:
      return { ...state, isLoading: true, isError: false, user: state.user };
    case authAdminActiontype.LOADING_AUTH_ADDMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.message,
        user: state.user,
      };
    case authAdminActiontype.LOADING_AUTH_ADDMIN_SUCCESS:
      window.localStorage.setItem("user", action.payload);
      return { ...state, isLoading: false, isError: false, user: state.user };
    default:
      return state;
  }
};

export default authAdminReducer;
