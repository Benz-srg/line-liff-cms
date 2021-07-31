import axios from "axios";
import { urlApi } from "../urlapi";

export enum couponActiontype {
  LOADING_COUPON = "LOADING_COUPON",
  LOADING_COUPON_ERROR = "LOADING_COUPON_ERROR",
  LOADING_COUPON_SUCCESS = "LOADING_COUPON_SUCCESS",
  UPLOADING_COUPON = "UPLOADING_COUPON",
  UPLOADING_COUPON_ERROR = "UPLOADING_COUPON_ERROR",
  UPLOADING_COUPON_SUCCESS = "UPLOADING_COUPON_SUCCESS",
  COUPON_DESTROY = "COUPON_DESTROY",
  COUPON_USECODE = "COUPON_USECODE",
  COUPON_FILTER = "COUPON_FILTER",
}

interface couponActionInterface {
  type: couponActiontype;
  payload: any;
}

export const feedCoupons = () => {
  return async (dispatch) => {
    const isLoading: couponActionInterface = {
      type: couponActiontype.LOADING_COUPON,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const resultCoupons = await axios.get(`${urlApi}coupon`);
      const { coupons } = await resultCoupons.data;
      const LoadingSuccess: couponActionInterface = {
        type: couponActiontype.LOADING_COUPON_SUCCESS,
        payload: coupons,
      };
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

interface couponState {
  _id: string; //objectId
  code: string; //code coupon
  percentSale: number; //discount percent
  priceSale: number; //discount price
  couponLimit: number; //limit of coupon
  productAvaliable: string[]; //tag product use coupon
  action: number; //action is mean status open or close use coupon
}

export const createCoupon = (coupon: couponState) => {
  return async (dispatch) => {
    delete coupon._id;
    const isUploading: couponActionInterface = {
      type: couponActiontype.UPLOADING_COUPON,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const postCoupon = await axios.post(`${urlApi}coupon`, {
        ...coupon,
      });
      const { status, message, coupons } = await postCoupon.data;
      if (status === 200 || status === 201) {
        let payload;
        payload = { message: message, coupons, status: status };
        const UploadingSuccess: couponActionInterface = {
          type: couponActiontype.UPLOADING_COUPON_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        let payload;
        payload = { message: message, coupons, status: status };
        const UploadingError: couponActionInterface = {
          type: couponActiontype.UPLOADING_COUPON_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCoupon = (objectCoupon: couponState) => {
  return async (dispatch) => {
    console.log(objectCoupon);
    try {
      const updateCoupon = await axios.put(
        `${urlApi}coupon/${objectCoupon._id}`,
        {
          ...objectCoupon,
        }
      );
      const { status, message, coupons } = await updateCoupon.data;
      if (status === 200 || status === 201) {
        let payload;
        payload = { message: message, coupons, status: status };
        const UploadingSuccess: couponActionInterface = {
          type: couponActiontype.UPLOADING_COUPON_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        let payload;
        payload = { message: message, coupons, status: status };
        const UploadingError: couponActionInterface = {
          type: couponActiontype.UPLOADING_COUPON_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCoupon = (couponIds: string[]) => {
  return async (dispatch) => {
    const isUploading: couponActionInterface = {
      type: couponActiontype.UPLOADING_COUPON,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const deleteCoupon = await axios({
        url: `${urlApi}coupon`,
        method: "delete",
        data: { id: couponIds },
      });
      const { status, message, coupons } = await deleteCoupon.data;
      if (status === 200 || status === 201) {
        let payload;
        payload = { message: message, coupons, status: status };
        const UploadingSuccess: couponActionInterface = {
          type: couponActiontype.UPLOADING_COUPON_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        let payload;
        payload = { message: message, coupons, status: status };
        const UploadingError: couponActionInterface = {
          type: couponActiontype.UPLOADING_COUPON_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterCoupon = (coupon: any[]) => {
  return (dispatch) => {
    const isFilter: couponActionInterface = {
      type: couponActiontype.COUPON_FILTER,
      payload: coupon,
    };
    dispatch(isFilter);
  };
};

/* setState */
const setStateLoading = (dispatch) => {
  const isLoading: couponActionInterface = {
    type: couponActiontype.LOADING_COUPON,
    payload: null,
  };
  dispatch(isLoading);
};

const setStateLoadingError = (dispatch) => {
  const isLoading: couponActionInterface = {
    type: couponActiontype.LOADING_COUPON_ERROR,
    payload: null,
  };
  dispatch(isLoading);
};

const setStateLoadingSuccess = (dispatch, payload) => {
  const isLoading: couponActionInterface = {
    type: couponActiontype.LOADING_COUPON_SUCCESS,
    payload: payload,
  };
  dispatch(isLoading);
};

const setStateDestroy = (dispatch) => {
  const isDestroy: couponActionInterface = {
    type: couponActiontype.COUPON_DESTROY,
    payload: null,
  };
  dispatch(isDestroy);
};

/* คูปองของ customer */
export const getCouponWithProducts = (objectId: string[]) => {
  return async (dispatch) => {
    setStateLoading(dispatch);
    try {
      const queryCoupon = await axios.post(`${urlApi}coupon/check`, {
        id: objectId,
      });
      const { result } = await queryCoupon.data;
      setStateLoadingSuccess(dispatch, result);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCouponWithInputCode = (code: string) => {
  return async (dispatch) => {
    setStateLoading(dispatch);
    try {
      const queryCoupon = await axios.get(`${urlApi}coupon/check/${code}`);
      const { result } = await queryCoupon.data;
      setStateLoadingSuccess(dispatch, result);
    } catch (error) {
      console.log(error);
    }
  };
};

export const couponUseCode = (codeObject: any) => {
  return (dispatch) => {
    const isUseCode: couponActionInterface = {
      type: couponActiontype.COUPON_USECODE,
      payload: codeObject,
    };
    dispatch(isUseCode);
  };
};

export const destroyCoupon = () => {
  return (dispatch) => {
    dispatch(setStateDestroy);
  };
};
