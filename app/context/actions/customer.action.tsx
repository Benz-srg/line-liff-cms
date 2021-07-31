import axios from "axios";
import router, { NextRouter } from "next/router";
import { urlApi } from "../urlapi";
export enum customerActiontype {
  LOADING_CUSTOMER = "LOADING_CUSTOMER",
  LOADING_CUSTOMER_ERROR = "LOADING_CUSTOMER_ERROR",
  LOADING_CUSTOMER_SUCCESS = "LOADING_CUSTOMER_SUCCESS",
  UPLOADING_CUSTOMER = "UPLOADING_CUSTOMER",
  UPLOADING_CUSTOMER_ERROR = "UPLOADING_CUSTOMER_ERROR",
  UPLOADING_CUSTOMER_SUCCESS = "UPLOADING_CUSTOMER_SUCCESS",
  UPDATE_CUSTOMER_ADDRESS = "UPDATE_CUSTOMER_ADDRESS",
  VISIBLE_SNACKBAR_CUSTOMER = "VISIBLE_SNACKBAR_CUSTOMER",
  FILTER_CUSTOMER = "FILTER_CUSTOMER",
}

interface customerActionInterface {
  type: customerActiontype;
  payload: any;
}

export const feedCustomers = () => {
  return async (dispatch) => {
    const isLoading: customerActionInterface = {
      type: customerActiontype.LOADING_CUSTOMER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const resultCustomers = await axios.get(`${urlApi}customer`);
      const { status, customers } = await resultCustomers.data;
      const LoadingSuccess: customerActionInterface = {
        type: customerActiontype.LOADING_CUSTOMER_SUCCESS,
        payload: customers,
      };
      dispatch(LoadingSuccess);
    } catch (error) {}
  };
};

interface addCustomer {
  fullName: string;
  userName: string;
  passWord: string;
  email: string;
  role: string;
  sex: string | number;
  age: string;
  address: string;
  billingAddress: string;
  shippingAddress: string;
}

export const createCustomer = (customerObject: addCustomer) => {
  return async (dispatch) => {
    const isUploading: customerActionInterface = {
      type: customerActiontype.UPLOADING_CUSTOMER,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const postCustomers = await axios.post(`${urlApi}customer`, {
        ...customerObject,
      });
      const { status, message, customers } = await postCustomers.data;
      if (status == 201 || status == 200) {
        let payload;
        payload = { message: message, customers, status: status };
        const UploadingSuccess: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        //handle Error
        let payload;
        payload = { message: message, customers, status: status };
        const UploadingError: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

interface editCustomer {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  sex: string | number;
  age: string;
  address: any[];
  billingAddress: string;
  shippingAddress: string;
  tel: string;
}

export const updateCustomer = (customerObject: editCustomer) => {
  return async (dispatch) => {
    const isUploading: customerActionInterface = {
      type: customerActiontype.UPLOADING_CUSTOMER,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const updateCustomer = await axios.put(
        `${urlApi}customer/${customerObject._id}`,
        {
          ...customerObject,
        }
      );
      const { status, message, customers } = await updateCustomer.data;
      if (status === 200 || status === 201) {
        let payload;
        payload = { message: message, customers: customers, status: status };
        const UploadingSuccess: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        let payload;
        payload = { message: message, customers: customers, status: status };
        const UploadingError: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
      setClearSnackbar(dispatch);
    } catch (error) {
      console.log(error);
    }
  };
};

export const queryCustomerWithId = (customerId: string) => {
  return async (dispatch) => {
    const isLoading: customerActionInterface = {
      type: customerActiontype.LOADING_CUSTOMER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const resultCustomers = await axios.get(
        `${urlApi}customer/${customerId}`
      );
      const { status, customers } = await resultCustomers.data;
      const LoadingSuccess: customerActionInterface = {
        type: customerActiontype.LOADING_CUSTOMER_SUCCESS,
        payload: customers,
      };
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCustomer = (customerIds: string[]) => {
  return async (dispatch) => {
    const isUploading: customerActionInterface = {
      type: customerActiontype.UPLOADING_CUSTOMER,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const deleteCoupon = await axios({
        url: `${urlApi}customer`,
        method: "delete",
        data: { id: customerIds },
      });
      const { status, message, customers } = await deleteCoupon.data;
      if (status === 200 || status === 201) {
        let payload;
        payload = { message: message, customers, status: status };
        const UploadingSuccess: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        let payload;
        payload = { message: message, customers, status: status };
        const UploadingError: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

/* customer */

interface Lineuser {
  liffId: string;
  email: string;
  fullName: string;
}

export const authLine = (customerObject: Lineuser, router: NextRouter) => {
  return async (dispatch) => {
    const isUploading: customerActionInterface = {
      type: customerActiontype.UPLOADING_CUSTOMER,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const postCustomers = await axios.post(`${urlApi}customer`, {
        ...customerObject,
      });
      const { status, message, customers } = await postCustomers.data;
      if (status == 201 || status == 200) {
        let payload;
        payload = { message: message, customers, status: status };
        const UploadingSuccess: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        //handle Error
        let payload;
        payload = { message: message, customers, status: status };
        const UploadingError: customerActionInterface = {
          type: customerActiontype.UPLOADING_CUSTOMER_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
      // router.push({ pathname: "/" });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setAddress = (objectId: string) => {
  return (dispatch) => {
    const isUploading: customerActionInterface = {
      type: customerActiontype.UPDATE_CUSTOMER_ADDRESS,
      payload: objectId,
    };
    dispatch(isUploading);
  };
};

export const setFilter = (filter: any) => {
  return (dispatch) => {
    const isFilter: customerActionInterface = {
      type: customerActiontype.FILTER_CUSTOMER,
      payload: filter,
    };
    dispatch(isFilter);
  };
};

/*  */

export const setClearSnackbar = (dispatch) => {
  const isClear = setTimeout(() => {
    const isClearSnackbar: customerActionInterface = {
      type: customerActiontype.VISIBLE_SNACKBAR_CUSTOMER,
      payload: null,
    };
    dispatch(isClearSnackbar);
    clearTimeout(isClear);
  }, 3000);
};

export const setStateLoadingSuccess = (dispatch, payload) => {
  const LoadingSuccess: customerActionInterface = {
    type: customerActiontype.LOADING_CUSTOMER_SUCCESS,
    payload: payload,
  };
  dispatch(LoadingSuccess);
};
