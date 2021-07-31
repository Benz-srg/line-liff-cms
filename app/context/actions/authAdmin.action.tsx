import axios from "axios";
import { urlApi } from "../urlapi";
import cookie from "js-cookie";
import { saveUser, removeToken } from "@/utils/token";
import { NextRouter } from "next/router";
import * as permissionActions from "./permission.action";
export enum authAdminActiontype {
  LOADING_AUTH_ADDMIN = "LOADING_AUTH_ADDMIN",
  LOADING_AUTH_ADDMIN_ERROR = "LOADING_AUTH_ADDMIN_ERROR",
  LOADING_AUTH_ADDMIN_SUCCESS = "LOADING_AUTH_ADDMIN_SUCCESS",
  UPLOADING_AUTH_ADDMIN = "UPLOADING_AUTH_ADDMIN",
  UPLOADING_AUTH_ADDMIN_ERROR = "UPLOADING_AUTH_ADDMIN_ERROR",
  UPLOADING_AUTH_ADDMIN_SUCCESS = "UPLOADING_AUTH_ADDMIN_SUCCESS",
}

interface authAdminActionInterface {
  type: authAdminActiontype;
  payload: any;
}

interface Signin {
  username: string | number;
  password: string | number;
}

export const signinAdmin = (account: Signin, router: NextRouter) => {
  return async (dispatch) => {
    try {
      await loadingAuth(dispatch);
      const signin = await axios.post(`${urlApi}admin/signin`, { ...account });
      const { status, data } = await signin;
      console.log(data, "this is data");
      await dispatch(permissionActions.getPermissionByUserId(data.id));
      if (status == 200) {
        await saveUser(data);
        await loadingAuthSuccess(dispatch, data);
        router.push({ pathname: "/cms/dashboard" });
      } else {
        loadingAuthError(dispatch, data);
      }
    } catch (error) {
      loadingAuthError(dispatch, "User Not found or Password Invalid !");
    }
  };
};

export const signoutAdmin = (router: NextRouter) => {
  return async (dispatch) => {
    try {
      removeToken();
      loadingAuthSuccess(dispatch, null);
      router.push({ pathname: "/cms/signin" });
    } catch (error) {
      console.log(error);
    }
  };
};

const loadingAuth = (dispatch) => {
  const isLoadingAuth: authAdminActionInterface = {
    type: authAdminActiontype.LOADING_AUTH_ADDMIN,
    payload: null,
  };
  dispatch(isLoadingAuth);
};

const loadingAuthSuccess = (dispatch, payload) => {
  const isLoadingAuthSuccess: authAdminActionInterface = {
    type: authAdminActiontype.LOADING_AUTH_ADDMIN_SUCCESS,
    payload: payload,
  };
  dispatch(isLoadingAuthSuccess);
};

const loadingAuthError = (dispatch, payload) => {
  const isLoadingAuthError: authAdminActionInterface = {
    type: authAdminActiontype.LOADING_AUTH_ADDMIN_ERROR,
    payload: payload,
  };
  dispatch(isLoadingAuthError);
};
