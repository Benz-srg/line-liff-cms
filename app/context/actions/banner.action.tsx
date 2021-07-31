import axios from "axios";
import { urlApi } from "../urlapi";

export enum bannerActiontype {
  LOADING_BANNBER = "LOADING_BANNBER",
  LOADING_BANNBER_ERROR = "LOADING_BANNBER_ERROR",
  LOADING_BANNBER_SUCCESS = "LOADING_BANNBER_SUCCESS",
  UPLOADING_BANNBER = "UPLOADING_BANNBER",
  UPLOADING_BANNBER_ERROR = "UPLOADING_BANNBER_ERROR",
  UPLOADING_BANNBER_SUCCESS = "UPLOADING_BANNBER_SUCCESS",
  VISIBLE_SNACKBAR_CUSTOMER = "VISIBLE_SNACKBAR_CUSTOMER",
}
interface bannerActionInterface {
  type: bannerActiontype;
  payload: any;
}

const setStateToLoading = () => ({
  type: bannerActiontype.LOADING_BANNBER,
  payload: null,
});

const setStateToError = (payload) => ({
  type: bannerActiontype.LOADING_BANNBER_ERROR,
  payload: payload,
});

const setStateToSuccess = (payload) => ({
  type: bannerActiontype.LOADING_BANNBER_SUCCESS,
  payload: payload,
});

const setStateToUpLoading = () => ({
  type: bannerActiontype.UPLOADING_BANNBER,
  payload: null,
});

const setStateToUploadSuccess = (payload) => ({
  type: bannerActiontype.UPLOADING_BANNBER_SUCCESS,
  payload: payload,
});

const setStateToClearSnackbar = () => ({
  type: bannerActiontype.VISIBLE_SNACKBAR_CUSTOMER,
  payload: null,
});

export const feedBanner = () => {
  return async (dispatch) => {
    try {
      dispatch(setStateToLoading());
      const getBanner = await axios.get(`${urlApi}banner`);
      const { photos } = await getBanner.data;
      dispatch(setStateToSuccess(photos));
    } catch (error) {
      dispatch(setStateToError(error));
    }
  };
};

export const uploadImage = (photo: FormData) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToUpLoading());
      const postBanner = await axios.post(`${urlApi}banner`, photo);
      const { status, message, photos } = await postBanner.data;
      dispatch(setStateToUploadSuccess({ status, message, photos }));
      const timerx = setTimeout(() => {
        dispatch(setStateToClearSnackbar);
        clearTimeout(timerx);
      }, 4000);
    } catch (error) {
      dispatch(setStateToError(error));
    }
  };
};

export const deleteImage = (objectId: string) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToUpLoading());
      const decreateBanner = await axios.delete(`${urlApi}banner/${objectId}`);
      const { status, message, photos } = await decreateBanner.data;
      if (status == 200) {
        dispatch(setStateToUploadSuccess({ status, message, photos }));
      } else {
        dispatch(setStateToError(message));
      }
      const timerx = setTimeout(() => {
        dispatch(setStateToClearSnackbar);
        clearTimeout(timerx);
      }, 4000);
    } catch (error) {
      dispatch(setStateToError(error));
    }
  };
};
