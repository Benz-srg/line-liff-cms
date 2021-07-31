import axios from "axios";
import { AnyMxRecord } from "dns";
import { urlApi } from "../urlapi";

export enum paymentActiontype {
  LOADING_PAYMENT = "LOADING_PAYMENT",
  LOADING_PAYMENT_ERROR = "LOADING_PAYMENT_ERROR",
  LOADING_PAYMENT_SUCCESS = "LOADING_PAYMENT_SUCCESS",
  UPLOADING_PAYMENT = "UPLOADING_PAYMENT",
  UPLOADING_PAYMENT_ERROR = "UPLOADING_PAYMENT_ERROR",
  UPLOADING_PAYMENT_SUCCESS = "UPLOADING_PAYMENT_SUCCESS",
  UPDATE_PAYMENT = "UPDATE_PAYMENT",
  UPDATE_PAYMENT_ERROR = "UPDATE_PAYMENT_ERROR",
  UPDATE_PAYMENT_SUCCESS = "UPDATE_PAYMENT_SUCCESS",
}
interface paymentActionInterface {
  type: paymentActiontype;
  payload: any;
}
interface editPayment {
  _id: string,
  customerId: string,
  bankId: any,
  bankAccName: string,
  bankAccNo: string,
  bankName: string,
  paymentStatus: Number;
}
interface delPayment {
  _id: string,
  paymentStatus: Number;
}
interface Payment {
  customerId: string,
  bankId: string,
  bankAccName: string,
  bankAccNo: string,
  paymentStatus: Number;
}
export const getPayments = (objectId: string) => {
  return async (dispatch) => {
    const isUploading: paymentActionInterface = {
      type: paymentActiontype.LOADING_PAYMENT,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const Datapayments = await axios.get(`${urlApi}paymentUser/all/${objectId}`);
      const { status, payments } = Datapayments.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: paymentActionInterface = {
          type: paymentActiontype.LOADING_PAYMENT_SUCCESS,
          payload: payments,
        };
        dispatch(isUploadingSuccess);
      } else {
        const payload = { status };
        const isUploadingError: paymentActionInterface = {
          type: paymentActiontype.LOADING_PAYMENT_ERROR,
          payload: payload,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddItems = (payment: Payment) => {
  return async (dispatch) => {
    const isUploading: paymentActionInterface = {
      type: paymentActiontype.UPLOADING_PAYMENT,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const addItemToPayment = await axios.post(`${urlApi}paymentUser`, {
        ...payment,
      });
      const { status, message, payments } = await addItemToPayment.data;
      // console.log(payments);
      if (status === 201 || status === 200) {
        const isUploadingSuccess: paymentActionInterface = {
          type: paymentActiontype.UPLOADING_PAYMENT_SUCCESS,
          payload: { status, message, payments },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: paymentActionInterface = {
          type: paymentActiontype.UPLOADING_PAYMENT_ERROR,
          payload: { status, message, payments },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
};
export const updatePayment = (payment: editPayment) => {
  return async (dispatch) => {
    const isUploading: paymentActionInterface = {
      type: paymentActiontype.UPLOADING_PAYMENT,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const increase = await axios.put(
        `${urlApi}paymentUser/update/${payment._id}`,
        { ...payment }
      );
      const { status, message, payments } = increase.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: paymentActionInterface = {
          type: paymentActiontype.UPLOADING_PAYMENT_SUCCESS,
          payload: { status, message, payments },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: paymentActionInterface = {
          type: paymentActiontype.UPLOADING_PAYMENT_ERROR,
          payload: { status, message, payments },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateStatus = (payment: delPayment) => {
  return async (dispatch) => {
    const isUploading: paymentActionInterface = {
      type: paymentActiontype.UPDATE_PAYMENT,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const increase = await axios.put(
        `${urlApi}paymentUser/status/${payment._id}`,
        { ...payment }
      );
      const { status, message, payments } = increase.data;
      console.log("return Data");
      console.log(increase.data.payments);
      if (status === 200 || status === 201) {
        const isUploadingSuccess: paymentActionInterface = {
          type: paymentActiontype.UPDATE_PAYMENT_SUCCESS,
          payload: { status, message, payments },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: paymentActionInterface = {
          type: paymentActiontype.UPDATE_PAYMENT_ERROR,
          payload: { status, message, payments },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
