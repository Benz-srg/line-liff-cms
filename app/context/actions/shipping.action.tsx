import axios from "axios";
import { urlApi } from "../urlapi";

export enum shippingActiontype {
  LOADING_SHIPPING_COST = "LOADING_SHIPPING_COST",
  LOADING_SHIPPING_COST_ERROR = "LOADING_SHIPPING_COST_ERROR",
  LOADING_SHIPPING_COST_SUCCESS = "LOADING_SHIPPING_COST_SUCCESS",
  LOADING_SHIPPING_COST_PRICE = "LOADING_SHIPPING_COST_PRICE",
  LOADING_SHIPPING_COST_PRICE_ERROR = "LOADING_SHIPPING_COST_PRICE_ERROR",
  LOADING_SHIPPING_COST_PRICE_SUCCESS = "LOADING_SHIPPING_COST_PRICE_SUCCESS",
  UPLOADING_SHIPPING_COST = "UPLOADING_SHIPPING_COST",
  UPLOADING_SHIPPING_COST_ERROR = "UPLOADING_SHIPPING_COST_ERROR",
  UPLOADING_SHIPPING_COST_SUCCESS = "UPLOADING_SHIPPING_COST_SUCCESS",
  DELETE_SHIPPING_COST = "DELETE_SHIPPING_COST",
  DELETE_SHIPPING_COST_ERROR = "DELETE_SHIPPING_COST_ERROR",
  DELETE_SHIPPING_COST_SUCCESS = "DELETE_SHIPPING_COST_SUCCESS",
  VISIBLE_SNACKBAR_CUSTOMER = "VISIBLE_SNACKBAR_CUSTOMER"
}
interface shippingActionInterface {
  type: shippingActiontype;
  payload: any;
  cost:number;
}
interface Shipping {
  status: number,
  fixedCost: number,
  anyCost: number,
  firstCost: number,
}
export const getShipping = () => {
  return async (dispatch) => {
    const isUploading: shippingActionInterface = {
      type: shippingActiontype.LOADING_SHIPPING_COST,
      payload: null,
      cost: 0,
    };
    dispatch(isUploading);
    try {
      const shipping = await axios.get(`${urlApi}shippingcost/all`);
      const { status, shippingcost, cost } = shipping.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: shippingActionInterface = {
          type: shippingActiontype.LOADING_SHIPPING_COST_SUCCESS,
          payload: shippingcost,
          cost:cost
        };
        dispatch(isUploadingSuccess);
      } else {
        const payload = { status };
        const isUploadingError: shippingActionInterface = {
          type: shippingActiontype.LOADING_SHIPPING_COST_ERROR,
          payload: payload,
          cost: cost,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getShippingCost = (quantity: Number) => {
  return async (dispatch) => {
    const isUploading: shippingActionInterface = {
      type: shippingActiontype.LOADING_SHIPPING_COST_PRICE,
      payload: null,
      cost: 0,
    };
    dispatch(isUploading);
    try {
      const shipping = await axios.get(`${urlApi}shippingcost/getCost/${quantity}`);
      const { status, shippingcost, cost } = shipping.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: shippingActionInterface = {
          type: shippingActiontype.LOADING_SHIPPING_COST_PRICE_SUCCESS,
          payload: shippingcost,
          cost:cost
        };
        dispatch(isUploadingSuccess);
      } else {
        const payload = { status };
        const isUploadingError: shippingActionInterface = {
          type: shippingActiontype.LOADING_SHIPPING_COST_PRICE_ERROR,
          payload: payload,
          cost: cost,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const AddShippingCost = (shipping: Shipping) => {
  return async (dispatch) => {
    const isUploading: shippingActionInterface = {
      type: shippingActiontype.UPLOADING_SHIPPING_COST,
      payload: null,
      cost: 0,
    };
    dispatch(isUploading);
    try {
      const DataShipping = await axios.post(`${urlApi}shippingcost`, {
        ...shipping,
      });
      const { status, message, shippingcost,cost } = await DataShipping.data;
      if (status === 201 || status === 200) {
        const isUploadingSuccess: shippingActionInterface = {
          type: shippingActiontype.UPLOADING_SHIPPING_COST_SUCCESS,
          payload: { status, message, shippingcost },
          cost: cost,
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: shippingActionInterface = {
          type: shippingActiontype.UPLOADING_SHIPPING_COST_ERROR,
          payload: { status, message, shippingcost },
          cost: cost,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
};

export const setClearSnackbar = (dispatch) => {
  const isClear = setTimeout(() => {
    const isClearSnackbar: shippingActionInterface = {
      type: shippingActiontype.VISIBLE_SNACKBAR_CUSTOMER,
      payload: null,
      cost:0,
    };
    dispatch(isClearSnackbar);
    clearTimeout(isClear);
  }, 3000);
};

