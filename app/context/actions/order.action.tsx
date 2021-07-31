import { urlApi } from "../urlapi";
import axios from "axios";
export enum orderActiontype {
  LOADING_ORDER = "LOADING_ORDER",
  LOADING_ORDER_ERROR = "LOADING_ORDER_ERROR",
  LOADING_ORDER_SUCCESS = "LOADING_ORDER_SUCCESS",
  UPLOADING_ORDER = "UPLOADING_ORDER",
  UPLOADING_ORDER_ERROR = "UPLOADING_ORDER_ERROR",
  UPLOADING_ORDER_SUCCESS = "UPLOADING_ORDER_SUCCESS",
  GETTING_ORDER = "GETTING_ORDER",
  GETTING_ORDER_SUCCESS = "GETTING_ORDER_SUCCESS",
  GETTING_ORDER_ADDRESS = "GETTING_ORDER_ADDRESS",
  GETTING_ORDER_ADDRESS_SUCCESS = "GETTING_ORDER_ADDRESS_SUCCESS",
  UPDATING_ADDRESS = "UPDATING_ADDRESS",
  UPDATING_ADDRESS_SUCCESS = "UPDATING_ADDRESS_SUCCESS",
  UPDATING_ADDRESS_ERROR = "UPDATING_ADDRESS_ERROR",
}

interface orderActionInterface {
  type: orderActiontype;
  payload: any;
}

export const getIteminBaskets = (objectIds: any) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.LOADING_ORDER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const checkoutResult = await axios.post(`${urlApi}checkout`, {
        ids: objectIds,
      });
      const { checkouts } = await checkoutResult.data;
      const isLoadingSuccess: orderActionInterface = {
        type: orderActiontype.LOADING_ORDER_SUCCESS,
        payload: checkouts,
      };
      dispatch(isLoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createOrder = (checkoutBilling: any, router: any) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.UPLOADING_ORDER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const orderPost = await axios.post(`${urlApi}order`, {
        ...checkoutBilling,
      });

      const { status, message } = await orderPost.data;

      if (status == 200 || status == 201) {
        const isLoadingSuccess: orderActionInterface = {
          type: orderActiontype.UPLOADING_ORDER_SUCCESS,
          payload: { status, message },
        };
        dispatch(isLoadingSuccess);
        router.push({
          pathname: `/order`,
        });
      } else {
        const isLoadingError: orderActionInterface = {
          type: orderActiontype.UPLOADING_ORDER_ERROR,
          payload: { status, message },
        };
        dispatch(isLoadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllOrder = (customerId: string) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.LOADING_ORDER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      console.log(customerId, "inactions");
      const resultOrder = await axios.get(`${urlApi}order/${customerId}`);
      const { orders } = await resultOrder.data;
      console.log(orders);
      const isLoadingSuccess: orderActionInterface = {
        type: orderActiontype.GETTING_ORDER_SUCCESS,
        payload: orders,
      };
      dispatch(isLoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

/* action admin cms Order   */

export const getOrdersCms = () => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.LOADING_ORDER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const order = await axios.get(`${urlApi}cms/order`);
      const { orders } = await order.data;
      const isLoadingSuccess: orderActionInterface = {
        type: orderActiontype.LOADING_ORDER_SUCCESS,
        payload: orders,
      };
      dispatch(isLoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrdersCmswithId = (objectId: string) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.LOADING_ORDER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const order = await axios.get(`${urlApi}cms/order/${objectId}`);
      const { orders } = await order.data;
      const isLoadingSuccess: orderActionInterface = {
        type: orderActiontype.LOADING_ORDER_SUCCESS,
        payload: orders,
      };
      dispatch(isLoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePaidStatusOrder = (
  statusPaid: number,
  trackingNumber: string | number,
  objectId: string,
  shippingName: string
) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.UPLOADING_ORDER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const updated = await axios.put(`${urlApi}cms/order/paid/${objectId}`, {
        statusPaid,
        trackingNumber,
        shippingName
      });
      const { status, message, orders } = await updated.data;
      if (status === 200 || status === 201) {
        const isUpLoadingSuccess: orderActionInterface = {
          type: orderActiontype.UPLOADING_ORDER_SUCCESS,
          payload: { message, status, orders },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUpLoadingError: orderActionInterface = {
          type: orderActiontype.UPLOADING_ORDER_ERROR,
          payload: { message, status, orders },
        };
        dispatch(isUpLoadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

/*  */

//get all shipping address of user for order
export const getAllShippingAddressWithId = (customerId: string) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.GETTING_ORDER_ADDRESS,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const shipping = await axios.get(
        `${urlApi}order/getAddress/${customerId}`
      );
      const { data } = await shipping.data;
      const isLoadingSuccess: orderActionInterface = {
        type: orderActiontype.GETTING_ORDER_ADDRESS_SUCCESS,
        payload: data,
      };
      dispatch(isLoadingSuccess);
    } catch (err) {
      console.log(err);
    }
  };
};

// update shippingAddress in order order
export const updateShippingAddress = (orderId: string, shippingId: string) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.UPDATING_ADDRESS,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const updated = await axios.put(
        `${urlApi}order/changeAddress/${orderId}/${shippingId}`
      );
      const { status, message, data } = await updated.data;
      if (status === 200) {
        const isUploadingSucccess: orderActionInterface = {
          type: orderActiontype.UPDATING_ADDRESS_SUCCESS,
          payload: { message, status, data },
        };
        dispatch(isUploadingSucccess);
      } else {
        const isUploadingError: orderActionInterface = {
          type: orderActiontype.UPDATING_ADDRESS_ERROR,
          payload: { message, status, data },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCancelOrder = (orderId: string) => {
  return async (dispatch) => {
    const isLoading: orderActionInterface = {
      type: orderActiontype.UPLOADING_ORDER,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const updated = await axios.put(`${urlApi}order/cancel/${orderId}`);
      const { status, message, orders } = await updated.data;
      if (status === 200) {
        const isUpLoadingSuccess: orderActionInterface = {
          type: orderActiontype.UPLOADING_ORDER_SUCCESS,
          payload: { message, status, orders },
        };
        dispatch(isUpLoadingSuccess);
      } else {
        const isUploadingError: orderActionInterface = {
          type: orderActiontype.UPLOADING_ORDER_ERROR,
          payload: { message, status, orders },
        };
        dispatch(isUploadingError);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
