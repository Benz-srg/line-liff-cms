import { urlApi } from "../urlapi";
import axios from "axios";
export enum checkoutActiontype {
  LOADING_CHECKOUT = "LOADING_CHECKOUT",
  LOADING_CHECKOUT_ERROR = "LOADING_CHECKOUT_ERROR",
  LOADING_CHECKOUT_SUCCESS = "LOADING_CHECKOUT_SUCCESS",
  UPLOADING_CHECKOUT = "UPLOADING_CHECKOUT",
  UPLOADING_CHECKOUT_ERROR = "UPLOADING_CHECKOUT_ERROR",
  UPLOADING_CHECKOUT_SUCCESS = "UPLOADING_CHECKOUT_SUCCESS",
}

interface checkoutActionInterface {
  type: checkoutActiontype;
  payload: any;
}

export const getIteminBaskets = (objectIds: any) => {
  return async (dispatch) => {
    const isLoading: checkoutActionInterface = {
      type: checkoutActiontype.LOADING_CHECKOUT,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const checkoutResult = await axios.post(`${urlApi}checkout`, {
        ids: objectIds,
      });
      const { checkouts } = await checkoutResult.data;
      const isLoadingSuccess: checkoutActionInterface = {
        type: checkoutActiontype.LOADING_CHECKOUT_SUCCESS,
        payload: checkouts,
      };
      dispatch(isLoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createOrder = (checkoutBilling: any) => {
  return async (dispatch) => {};
};
