import axios from "axios";
import { urlApi } from "../urlapi";

export enum aboutActionType {
  LOADING_ABOUT = "LOADING_ABOUT",
  LOADING_ERROR = "LOADING_ERROR",
  LOADING_SUCCESS = "LOADING_ABOUT_SUCCESS",
  ADD_ABOUT = "ADD_ABOUT",
  DELETE_ABOUT = "DELETE_ABOUT",
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
// get productCustomer customerproduct
export const feedProductCustomer = () => {
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
      const result = await axios.get(`${urlApi}customerproduct`);
      const { data } = result.data;
      LoadingSuccess.payload = data;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const queryProductWithIdCustomer = (objectId: string) => {
  return async (dispatch) => {
    const isLoading: AboutActionInterface = {
      type: aboutActionType.LOADING_ABOUT,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const product = await axios.get(`${urlApi}customerproduct/${objectId}`);
      const { message, status, data } = product.data;
      if (status === 200 || status === 201) {
        const LoadingSuccess: AboutActionInterface = {
          type: aboutActionType.LOADING_SUCCESS,
          payload: [data],
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
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const feedProductPopular = () => {
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
      const result = await axios.get(`${urlApi}customer/product/popular`);
      const { data } = result.data;
      LoadingSuccess.payload = data;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const feedProductSort = (type: string, price: number) => {
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
      const result = await axios.get(
        `${urlApi}customer/product/sort/${type}/${price}`
      );
      const { data } = result.data;
      LoadingSuccess.payload = data;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

/*  */

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

export const updateProduct = (product: any) => {
  return async (dispatch) => {
    const isUploading: AboutActionInterface = {
      type: aboutActionType.UPLOADING_ABOUT,
      payload: null,
    };
    dispatch(isUploading);
    console.log(product);
    if (!Array.isArray(product.size) && product.size != "") {
      let { size } = product;
      const newArray = size.split(",");
      product.size = newArray;
    }
    try {
      const resultUpdated = await axios.put(`${urlApi}product/${product._id}`, {
        ...product,
      });
      const { status, message, products } = resultUpdated.data;
      if (status === 201) {
        // if delete success backend will return status 201

        const isUpLoadingSuccess: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_ABOUTID_SUCCESS,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUpLoadingError: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_ERROR,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingError);
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

// handle delete product one item or many items
export const deleteProduct = (ids: string[]) => {
  return async (dispatch) => {
    const isUploading: AboutActionInterface = {
      type: aboutActionType.UPLOADING_ABOUT,
      payload: null,
    };

    dispatch(isUploading);
    try {
      const deleteProduct = await axios({
        url: `${urlApi}product`,
        method: "delete",
        data: { id: ids },
      });
      const { status, message, products } = await deleteProduct.data;
      if (status === 201) {
        // if delete success backend will return status 201
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          products: products,
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

export const deleteImage = (objectId: string, pathName: string) => {
  return async (dispatch) => {
    const isUploading: AboutActionInterface = {
      type: aboutActionType.UPLOADING_ABOUT,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const deleteResul = await axios.delete(
        `${urlApi}product/image/${objectId}`,
        { data: { pathname: pathName } }
      );
      const { status, message, products } = deleteResul.data;
      if (status === 201 || status === 200) {
        const isUpLoadingSuccess: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_ABOUTID_SUCCESS,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUpLoadingError: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_ERROR,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingError);
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

export const increaseImage = (objectImage: FormData) => {
  return async (dispatch) => {
    const isUploading: AboutActionInterface = {
      type: aboutActionType.UPLOADING_ABOUT,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const increateAdded = await axios({
        method: "post",
        url: `${urlApi}product/image`,
        data: objectImage,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { status, message, products } = increateAdded.data;
      if (status === 201) {
        // if delete success backend will return status 201

        const isUpLoadingSuccess: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_ABOUTID_SUCCESS,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUpLoadingError: AboutActionInterface = {
          //create variable get store productInterface use type enum aboutActionType
          type: aboutActionType.UPLOADING_ERROR,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingError);
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

export const filterProduct = (products: any[]) => {
  return async (dispatch) => {
    const isFilter: AboutActionInterface = {
      type: aboutActionType.ABOUT_FILTER,
      payload: products,
    };
    dispatch(isFilter);
  };
};
