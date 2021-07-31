import axios from "axios";
import { urlApi } from "../urlapi";
import cookie from "js-cookie";
import { saveCookieCustomer, removeCustomer } from "@/utils/token";
import { NextRouter } from "next/router";
export enum authCustomerActiontype {
  LOADING_AUTH_CUSTOMER = "LOADING_AUTH_CUSTOMER",
  LOADING_AUTH_CUSTOMER_ERROR = "LOADING_AUTH_CUSTOMER_ERROR",
  LOADING_AUTH_CUSTOMER_SUCCESS = "LOADING_AUTH_CUSTOMER_SUCCESS",
  UPLOADING_AUTH_CUSTOMER = "UPLOADING_AUTH_CUSTOMER",
  UPLOADING_AUTH_CUSTOMER_ERROR = "UPLOADING_AUTH_CUSTOMER_ERROR",
  UPLOADING_AUTH_CUSTOMER_SUCCESS = "UPLOADING_AUTH_CUSTOMER_SUCCESS",
}

interface authCustomerActionInterface {
  type: authCustomerActiontype;
  payload: any;
}

interface Lineuser {
  liffId: string;
  email: string;
  liffName:string;
}

export const signinCustomer = (account: Lineuser, router: NextRouter) => {
  return async (dispatch) => {
    try {
      loadingAuth(dispatch);
      const signin = await axios.post(`${urlApi}customer`, { ...account });
      const { status, data } = await signin;
      if (status == 200 || status == 201) {
        console.log(data.customers);
        await saveCookieCustomer(data.customers);
        loadingAuthSuccess(dispatch, data.customers);
      } else {
        loadingAuthError(dispatch, data.customers);
      }
    } catch (error) {
      console.log(error);
      loadingAuthError(dispatch, "User Not found or Password Invalid !");
    }
  };
};

export const signoutCustomer = (router: NextRouter) => {
  return async (dispatch) => {
    try {
      await removeCustomer();
      await loadingAuthSuccess(dispatch, null);
      await router.reload();
    } catch (error) {
      console.log(error);
    }
  };
};

const loadingAuth = (dispatch) => {
  const isLoadingAuth: authCustomerActionInterface = {
    type: authCustomerActiontype.LOADING_AUTH_CUSTOMER,
    payload: null,
  };
  dispatch(isLoadingAuth);
};

const loadingAuthSuccess = (dispatch, payload) => {
  const isLoadingAuthSuccess: authCustomerActionInterface = {
    type: authCustomerActiontype.LOADING_AUTH_CUSTOMER_SUCCESS,
    payload: payload,
  };
  dispatch(isLoadingAuthSuccess);
};

const loadingAuthError = (dispatch, payload) => {
  const isLoadingAuthError: authCustomerActionInterface = {
    type: authCustomerActiontype.LOADING_AUTH_CUSTOMER_ERROR,
    payload: payload,
  };
  dispatch(isLoadingAuthError);
};
