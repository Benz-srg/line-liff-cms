import axios from "axios";
import { urlApi } from "../urlapi";

export enum aboutActionType {
  LOADING_ABOUT = "LOADING_ABOUT",
  LOADING_ERROR = "LOADING_ERROR",
  LOADING_SUCCESS = "LOADING_ABOUT_SUCCESS",
  ADD_ABOUT = "ADD_ABOUT",
  DELETE_ABOUTUS = "DELETE_ABOUTUS",
  DELETE_ABOUTUS_SUCCESS = "DELETE_ABOUTUS_SUCCESS",
  DELETE_ABOUTUS_ERROR = "DELETE_ABOUTUS_ERROR",
  UPLOADING_ABOUT = "UPLOADING_ABOUT",
  UPLOADING_ERROR = "UPLOADING_ERROR",
  UPLOADING_SUCCESS = "UPLOADING_SUCCESS",
  DELETE_IMAGE_ABOUT = "DELETE_IMAGE_ABOUT",
  VISIBLE_SNACKBAR = "VISIBLE_SNACKBAR",
  LOADING_ABOUTID_SUCCESS = "LOADING_ABOUTID",
  UPLOADING_ABOUTID_SUCCESS = "UPLOADING_ABOUTID_SUCCESS",
  ABOUT_FILTER ="ABOUT_FILTER"
}

interface AboutActionInterface {
  type: aboutActionType;
  payload: any;
}


export const feedNewAbout = () => {
  return async (dispatch) => {
    const isLoading: AboutActionInterface = {
      type: aboutActionType.LOADING_ABOUT,
      payload: null,
    };
    const LoadingSuccess: AboutActionInterface = {
      type: aboutActionType.LOADING_SUCCESS,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const result = await axios.get(`${urlApi}customer/product/`);
      const { abouts } = result.data;
      LoadingSuccess.payload = abouts;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};
//fetching product
export const feedAbout = () => {
  return async (dispatch) => {
    const isLoading: AboutActionInterface = {
      type: aboutActionType.LOADING_ABOUT,
      payload: null,
    };
    const LoadingSuccess: AboutActionInterface = {
      type: aboutActionType.LOADING_SUCCESS,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const result = await axios.get(`${urlApi}about`);
      const { data } = result.data;
      LoadingSuccess.payload = data;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

//handle createproduct
export const createAbout = (about: any) => {
  return async (dispatch) => {
    const isUploading: AboutActionInterface = {
      type: aboutActionType.UPLOADING_ABOUT,
      payload: null,
    };
    try {
      dispatch(isUploading);
      const addAbout = await axios({
        method: "post",
        url: `${urlApi}about`,
        data: about,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { status, message, abouts } = await addAbout.data;
      if (status === 201) {
        // if delete success backend will return status 201
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          abouts: abouts,
          status: status,
        };
        const isUpLoadingSuccess: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_SUCCESS,
          payload: payload,
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          status: status,
        };
        const isUpLoadingError: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_ERROR,
          payload: payload,
        };
        dispatch(isUpLoadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const queryAboutWithId = (id: string) => {
  return async (dispatch) => {
    const isLoading: AboutActionInterface = {
      type: aboutActionType.LOADING_ABOUT,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const product = await axios.get(`${urlApi}about/${id}`);
      const { message, status, data } = product.data;
      if (status === 200 || status === 201) {
        const LoadingSuccess: AboutActionInterface = {
          type: aboutActionType.LOADING_ABOUTID_SUCCESS,
          payload: data,
        };
        dispatch(LoadingSuccess);
      } else {
        const payload = { message: message, status };
        const LoadingError: AboutActionInterface = {
          type: aboutActionType.UPLOADING_ERROR,
          payload: payload,
        };
        dispatch(LoadingError);
      }
      const hideSnackbar: AboutActionInterface = {
        //create variable get store productInterface use type enum aboutActionType
        type: aboutActionType.VISIBLE_SNACKBAR,
        payload: null,
      };
      const clearHide = setTimeout(() => {
        dispatch(hideSnackbar);
        clearTimeout(clearHide);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
};

// handle delete aboutus one item or many items
export const deleteAbout = (ids: string) => {
  return async (dispatch) => {
    const isUploading: AboutActionInterface = {
      type: aboutActionType.DELETE_ABOUTUS,
      payload: null,
    };

    dispatch(isUploading);
    try {
      const deleteAbout = await axios({
        url: `${urlApi}about`,
        method: "delete",
        data: { id: ids },
      });
      const { status, message, abouts } = await deleteAbout.data;

      if (status === 201) {
        // if delete success backend will return status 201
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          abouts: abouts,
          status: status,
        };
        const isUpLoadingSuccess: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.DELETE_ABOUTUS_SUCCESS,
          payload: payload,
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          status: status,
        };
        const isUpLoadingError: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.DELETE_ABOUTUS_ERROR,
          payload: payload,
        };
        dispatch(isUpLoadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
