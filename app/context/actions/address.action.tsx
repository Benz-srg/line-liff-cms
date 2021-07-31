import axios from "axios";
import { urlApi } from "../urlapi";

export enum addressActiontype {
  LOADING_ADDRESS = "LOADING_ADDRESS",
  LOADING_ADDRESS_ERROR = "LOADING_ADDRESS_ERROR",
  LOADING_ADDRESS_SUCCESS = "LOADING_ADDRESS_SUCCESS",
  UPLOADING_ADDRESS = "UPLOADING_ADDRESS",
  UPLOADING_ADDRESS_ERROR = "UPLOADING_ADDRESS_ERROR",
  UPLOADING_ADDRESS_SUCCESS = "UPLOADING_ADDRESS_SUCCESS",
  DELETE_ADDRESS = "DELETE_ADDRESS",
  DELETE_ADDRESS_ERROR = "DELETE_ADDRESS_ERROR",
  DELETE_ADDRESS_SUCCESS = "DELETE_ADDRESS_SUCCESS",
  VISIBLE_SNACKBAR_CUSTOMER = "VISIBLE_SNACKBAR_CUSTOMER"
}
interface addressActionInterface {
  type: addressActiontype;
  payload: any;
}
interface editAddress {
  _id: string,
  customerId: string,
  addressName: string,
  shippingAddress: string,
}
interface delAddress {
  _id: string,
  addressStatus: Number;
}
interface Address {
  customerId: string,
  addressName: string,
  shippingAddress: string,
  addressStatus: Number;
}
export const getAddresses = (objectId: string) => {
  return async (dispatch) => {
    const isUploading: addressActionInterface = {
      type: addressActiontype.LOADING_ADDRESS,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const address = await axios.get(`${urlApi}address/all/${objectId}`);
      const { status, addresses } = address.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: addressActionInterface = {
          type: addressActiontype.LOADING_ADDRESS_SUCCESS,
          payload: addresses,
        };
        dispatch(isUploadingSuccess);
      } else {
        const payload = { status };
        const isUploadingError: addressActionInterface = {
          type: addressActiontype.LOADING_ADDRESS_ERROR,
          payload: payload,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddItems = (address: Address) => {
  return async (dispatch) => {
    const isUploading: addressActionInterface = {
      type: addressActiontype.UPLOADING_ADDRESS,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const DataAddress = await axios.post(`${urlApi}address`, {
        ...address,
      });
      const { status, message, addresses } = await DataAddress.data;
      if (status === 201 || status === 200) {
        const isUploadingSuccess: addressActionInterface = {
          type: addressActiontype.UPLOADING_ADDRESS_SUCCESS,
          payload: { status, message, addresses },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: addressActionInterface = {
          type: addressActiontype.UPLOADING_ADDRESS_ERROR,
          payload: { status, message, addresses },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
};
export const updateAddress = (address: editAddress) => {
  return async (dispatch) => {
    const isUploading: addressActionInterface = {
      type: addressActiontype.UPLOADING_ADDRESS,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const DataAddress = await axios.put(
        `${urlApi}address/update/${address._id}`,
        { ...address }
      );
      const { status, message, addresses } = DataAddress.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: addressActionInterface = {
          type: addressActiontype.UPLOADING_ADDRESS_SUCCESS,
          payload: { status, message, addresses },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: addressActionInterface = {
          type: addressActiontype.UPLOADING_ADDRESS_ERROR,
          payload: { status, message, addresses },
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
    const isClearSnackbar: addressActionInterface = {
      type: addressActiontype.VISIBLE_SNACKBAR_CUSTOMER,
      payload: null,
    };
    dispatch(isClearSnackbar);
    clearTimeout(isClear);
  }, 3000);
};
export const updateStatus = (address: delAddress) => {
  return async (dispatch) => {
    const isUploading: addressActionInterface = {
      type: addressActiontype.DELETE_ADDRESS,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const DataAddress = await axios.put(
        `${urlApi}address/status/${address._id}`,
        { ...address }
      );
      const { status, message, addresses } = DataAddress.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: addressActionInterface = {
          type: addressActiontype.DELETE_ADDRESS_SUCCESS,
          payload: { status, message, addresses },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: addressActionInterface = {
          type: addressActiontype.DELETE_ADDRESS_ERROR,
          payload: { status, message, addresses },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
