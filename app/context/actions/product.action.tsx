import axios from "axios";
import { urlApi } from "../urlapi";

export enum productActionType {
  LOADING_PRODUCT = "LOADING_PRODUCT",
  LOADING_ERROR = "LOADING_ERROR",
  LOADING_SUCCESS = "LOADING_SUCCESS",
  ADD_PRODUCT = "ADD_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  UPLOADING_PRODUCT = "UPLOADING_PRODUCT",
  UPLOADING_ERROR = "UPLOADING_ERROR",
  UPLOADING_SUCCESS = "UPLOADING_SUCCESS",
  DELETE_IMAGE_PRODUCT = "DELETE_IMAGE_PRODUCT",
  VISIBLE_SNACKBAR = "VISIBLE_SNACKBAR",
  LOADING_PRODUCTID_SUCCESS = "LOADING_PRODUCTID",
  UPLOADING_PRODUCTID_SUCCESS = "UPLOADING_PRODUCTID_SUCCESS",
  PRODUCT_FILTER = "PRODUCT_FILTER",
  LOADING_PRODUCT_CUSOMTER = "LOADING_PRODUCT_CUSOMTER",
}

interface ProductActionInterface {
  type: productActionType;
  payload: any;
}
// get productCustomer customerproduct
export const feedProductCustomer = () => {
  return async (dispatch) => {
    const isLoading: ProductActionInterface = {
      type: productActionType.LOADING_PRODUCT,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const allprodcuct = await axios.get(`${urlApi}product`);
      const result = await axios.get(`${urlApi}customer/product/popular`);
      const popular = await axios.get(`${urlApi}customer/product`);
      const { data } = await result.data;
      const resultPopular = await popular.data;
      const all = await allprodcuct.data.data;
      let newproduct = await resultPopular.data;
      const LoadingSuccess: ProductActionInterface = {
        type: productActionType.LOADING_PRODUCT_CUSOMTER,
        payload: { all, data, newproduct },
      };
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const queryProductWithIdCustomer = (objectId: string) => {
  return async (dispatch) => {
    const isLoading: ProductActionInterface = {
      type: productActionType.LOADING_PRODUCT,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const product = await axios.get(`${urlApi}customerproduct/${objectId}`);
      const { message, status, data } = product.data;
      if (status === 200 || status === 201) {
        const LoadingSuccess: ProductActionInterface = {
          type: productActionType.LOADING_SUCCESS,
          payload: [data],
        };
        dispatch(LoadingSuccess);
      } else {
        const payload = { message: message, status };
        const LoadingError: ProductActionInterface = {
          type: productActionType.UPLOADING_ERROR,
          payload: payload,
        };
        dispatch(LoadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const feedNewProduct = () => {
  return async (dispatch) => {
    const isLoading: ProductActionInterface = {
      type: productActionType.LOADING_PRODUCT,
      payload: null,
    };
    const LoadingSuccess: ProductActionInterface = {
      type: productActionType.LOADING_SUCCESS,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const result = await axios.get(`${urlApi}customer/product/`);
      const { data } = result.data;
      LoadingSuccess.payload = data;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const feedProductPopular = () => {
  return async (dispatch) => {
    const isLoading: ProductActionInterface = {
      type: productActionType.LOADING_PRODUCT,
      payload: null,
    };
    const LoadingSuccess: ProductActionInterface = {
      type: productActionType.LOADING_SUCCESS,
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
    const isLoading: ProductActionInterface = {
      type: productActionType.LOADING_PRODUCT,
      payload: null,
    };
    const LoadingSuccess: ProductActionInterface = {
      type: productActionType.LOADING_SUCCESS,
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
export const feedProduct = () => {
  return async (dispatch) => {
    const isLoading: ProductActionInterface = {
      type: productActionType.LOADING_PRODUCT,
      payload: null,
    };
    const LoadingSuccess: ProductActionInterface = {
      type: productActionType.LOADING_SUCCESS,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const result = await axios.get(`${urlApi}product`);
      const { data } = result.data;
      LoadingSuccess.payload = data;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

//handle createproduct
export const createProduct = (product: any) => {
  return async (dispatch) => {
    const isUploading: ProductActionInterface = {
      type: productActionType.UPLOADING_PRODUCT,
      payload: null,
    };
    try {
      dispatch(isUploading);
      const addProduct = await axios({
        method: "post",
        url: `${urlApi}product`,
        data: product,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { status, message, products } = await addProduct.data;
      if (status === 201) {
        // if delete success backend will return status 201
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          products: products,
          status: status,
        };
        const isUpLoadingSuccess: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_SUCCESS,
          payload: payload,
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          status: status,
        };
        const isUpLoadingError: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_ERROR,
          payload: payload,
        };
        dispatch(isUpLoadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const queryProductWithId = (objectId: string) => {
  return async (dispatch) => {
    const isLoading: ProductActionInterface = {
      type: productActionType.LOADING_PRODUCT,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const product = await axios.get(`${urlApi}product/${objectId}`);
      const { message, status, data } = product.data;
      if (status === 200 || status === 201) {
        const LoadingSuccess: ProductActionInterface = {
          type: productActionType.LOADING_PRODUCTID_SUCCESS,
          payload: [data],
        };
        dispatch(LoadingSuccess);
      } else {
        const payload = { message: message, status };
        const LoadingError: ProductActionInterface = {
          type: productActionType.UPLOADING_ERROR,
          payload: payload,
        };
        dispatch(LoadingError);
      }
      const hideSnackbar: ProductActionInterface = {
        //create variable get store productInterface use type enum productActionType
        type: productActionType.VISIBLE_SNACKBAR,
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
    const isUploading: ProductActionInterface = {
      type: productActionType.UPLOADING_PRODUCT,
      payload: null,
    };
    dispatch(isUploading);
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

        const isUpLoadingSuccess: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_PRODUCTID_SUCCESS,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUpLoadingError: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_ERROR,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingError);
      }
      const hideSnackbar: ProductActionInterface = {
        //create variable get store productInterface use type enum productActionType
        type: productActionType.VISIBLE_SNACKBAR,
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
    const isUploading: ProductActionInterface = {
      type: productActionType.UPLOADING_PRODUCT,
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
        const isUpLoadingSuccess: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_SUCCESS,
          payload: payload,
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const payload = {
          //create payload object pass argument to productReducer
          message: message,
          status: status,
        };
        const isUpLoadingError: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_ERROR,
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
    const isUploading: ProductActionInterface = {
      type: productActionType.UPLOADING_PRODUCT,
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
        const isUpLoadingSuccess: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_PRODUCTID_SUCCESS,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUpLoadingError: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_ERROR,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingError);
      }
      const hideSnackbar: ProductActionInterface = {
        //create variable get store productInterface use type enum productActionType
        type: productActionType.VISIBLE_SNACKBAR,
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
    const isUploading: ProductActionInterface = {
      type: productActionType.UPLOADING_PRODUCT,
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

        const isUpLoadingSuccess: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_PRODUCTID_SUCCESS,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUpLoadingError: ProductActionInterface = {
          //create variable get store productInterface use type enum productActionType
          type: productActionType.UPLOADING_ERROR,
          payload: { message, products, status },
        };
        dispatch(isUpLoadingError);
      }
      const hideSnackbar: ProductActionInterface = {
        //create variable get store productInterface use type enum productActionType
        type: productActionType.VISIBLE_SNACKBAR,
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
    const isFilter: ProductActionInterface = {
      type: productActionType.PRODUCT_FILTER,
      payload: products,
    };
    dispatch(isFilter);
  };
};
