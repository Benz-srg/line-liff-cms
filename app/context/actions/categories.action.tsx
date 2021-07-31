import axios from "axios";
import { urlApi } from "../urlapi";
export enum categoriesActiontype {
  LOADING_CATEGORIES = "LOADING_CATEGORIES",
  LOADING_ERROR = "LOADING_CATEGORIES_ERROR",
  LOADING_SUCCESS = "LOADING_CATEGORIES_SUCCESS",
  ADD_CATEGORIES = "ADD_CATEGORIES",
  DELETE_CATEGORIES = "DELETE_CATEGORIES",
  UPLOADING_CATEGORIES = "UPLOADING_CATEGORIES",
  UPLOADING_ERROR = "UPLOADING_CATEGORIES_ERROR",
  UPLOADING_SUCCESS = "UPLOADING_CATEGORIES_SUCCESS",
}

interface categoriesActionInterface {
  type: categoriesActiontype;
  payload: any;
}

export const feedCategoreis = () => {
  return async (dispatch) => {
    const isLoading: categoriesActionInterface = {
      type: categoriesActiontype.LOADING_CATEGORIES,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const getCategories = await axios.get(`${urlApi}categories`);
      const { categories, products } = await getCategories.data;
      const payload = { categories, products };
      const LoadingSuccess: categoriesActionInterface = {
        type: categoriesActiontype.LOADING_SUCCESS,
        payload: payload,
      };
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCategories = (categoriesName: string) => {
  return async (dispatch) => {
    const isUploading: categoriesActionInterface = {
      type: categoriesActiontype.UPLOADING_CATEGORIES,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const postCategories = await axios.post(`${urlApi}categories`, {
        categoriesName: categoriesName,
      });
      const { status, message, categories } = await postCategories.data;
      let payload;
      payload = { message: message, categories, status: status };
      const UploadingSuccess: categoriesActionInterface = {
        type: categoriesActiontype.UPLOADING_SUCCESS,
        payload: payload,
      };
      dispatch(UploadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCategories = (
  categoriesId: string,
  categoriesName: string
) => {
  return async (dispatch) => {
    const isUploading: categoriesActionInterface = {
      type: categoriesActiontype.UPLOADING_CATEGORIES,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const deleteCategories = await axios.put(
        `${urlApi}categories/${categoriesId}`,
        {
          categoriesName: categoriesName,
        }
      );
      const { status, message, categories } = await deleteCategories.data;
      let payload;
      payload = { message: message, categories, status: status };
      const UploadingSuccess: categoriesActionInterface = {
        type: categoriesActiontype.UPLOADING_SUCCESS,
        payload: payload,
      };
      dispatch(UploadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCategories = (categoriesId: string) => {
  return async (dispatch) => {
    const isUploading: categoriesActionInterface = {
      type: categoriesActiontype.UPLOADING_CATEGORIES,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const deleteCategories = await axios.delete(
        `${urlApi}categories/${categoriesId}`
      );
      const { status, message, categories } = await deleteCategories.data;
      let payload;
      payload = { message: message, categories, status: status };
      const UploadingSuccess: categoriesActionInterface = {
        type: categoriesActiontype.UPLOADING_SUCCESS,
        payload: payload,
      };
      dispatch(UploadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};
