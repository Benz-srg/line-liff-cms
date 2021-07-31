import axios from "axios";
import { urlApi } from "../urlapi";

export enum promotionActiontype {
  LOADING_PROMOTION = "LOADING_PROMOTION",
  LOADING_PROMOTION_ERROR = "LOADING_PROMOTION_ERROR",
  LOADING_PROMOTION_SUCCESS = "LOADING_PROMOTION_SUCCESS",
  UPLOADING_PROMOTION = "UPLOADING_PROMOTION",
  UPLOADING_PROMOTION_SUCCESS = "UPLOADING_PROMOTION_SUCCESS",
  VISIBLE_SNACKBAR_CUSTOMER = "VISIBLE_SNACKBAR_CUSTOMER",
}

interface promotionActionInterface {
  type: promotionActiontype;
  payload: any;
}

const setStateLoading = (dispatch) => {
  const isLoading: promotionActionInterface = {
    type: promotionActiontype.LOADING_PROMOTION,
    payload: null,
  };
  dispatch(isLoading);
};

const setStateLoadingError = (dispatch) => {
  const isLoading: promotionActionInterface = {
    type: promotionActiontype.LOADING_PROMOTION_ERROR,
    payload: null,
  };
  dispatch(isLoading);
};

const setStateLoadingSuccess = (dispatch, payload) => {
  const isLoading: promotionActionInterface = {
    type: promotionActiontype.LOADING_PROMOTION_SUCCESS,
    payload: payload,
  };
  dispatch(isLoading);
};

const setStateUploading = (dispatch) => {
  const isUpLoading: promotionActionInterface = {
    type: promotionActiontype.UPLOADING_PROMOTION,
    payload: null,
  };
  dispatch(isUpLoading);
};

const setStateUploadingSuccess = (dispatch, payload) => {
  const UploadingSuccess: promotionActionInterface = {
    type: promotionActiontype.UPLOADING_PROMOTION_SUCCESS,
    payload: payload,
  };
  dispatch(UploadingSuccess);
};

const setStateHideSnackbar = (dispatch) => {
  const hideSnackbar: promotionActionInterface = {
    type: promotionActiontype.VISIBLE_SNACKBAR_CUSTOMER,
    payload: null,
  };
  dispatch(hideSnackbar);
};

export const feed = () => {
  return async (dispatch) => {
    try {
      setStateLoading(dispatch);
      const promotion = await axios.get(`${urlApi}promotion`);
      const { photo } = await promotion.data;
      setStateLoadingSuccess(dispatch, photo);
    } catch (error) {
      setStateLoadingError(dispatch);
      throw error;
    }
  };
};

export const uploadPromotion = (photos: FormData) => {
  return async (dispatch) => {
    setStateUploading(dispatch);
    try {
      const uploadPhoto = await axios.post(`${urlApi}promotion`, photos);
      const { status, photo, message } = await uploadPhoto.data;
      setStateUploadingSuccess(dispatch, { status, photo, message });
      const timerSnack = setTimeout(() => {
        setStateHideSnackbar(dispatch);
        clearTimeout(timerSnack);
      }, 4000);
    } catch (error) {
      setStateLoadingError(dispatch);
      throw error;
    }
  };
};
