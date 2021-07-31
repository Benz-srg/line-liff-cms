import axios from "axios";
import { NextRouter } from "next/router";
import { urlApi } from "../urlapi";

export enum basketActiontype {
  LOADING_BASKET = "LOADING_BASKET",
  LOADING_BASKET_ERROR = "LOADING_BASKET_ERROR",
  LOADING_BASKET_SUCCESS = "LOADING_BASKET_SUCCESS",
  UPLOADING_BASKET = "UPLOADING_BASKET",
  UPLOADING_BASKET_ERROR = "UPLOADING_BASKET_ERROR",
  UPLOADING_BASKET_SUCCESS = "UPLOADING_BASKET_SUCCESS",
}

interface basketActionInterface {
  type: basketActiontype;
  payload: any;
}

interface Basket {
  customerId: string;
  productId: string;
  quantity: number;
  price: number;
}

export const getBaskets = (id: string) => {
  return async (dispatch) => {
    try {
      const basketsResult = await axios.get(`${urlApi}basket/${id}`);
      const { baskets } = await basketsResult.data;
      const isUploadingSuccess: basketActionInterface = {
        type: basketActiontype.LOADING_BASKET_SUCCESS,
        payload: baskets,
      };
      dispatch(isUploadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddItems = (basket: Basket) => {
  return async (dispatch) => {
    const isUploading: basketActionInterface = {
      type: basketActiontype.UPLOADING_BASKET,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const addItemToBasket = await axios.post(`${urlApi}basket`, {
        ...basket,
      });
      const { status, message, baskets } = await addItemToBasket.data;
      console.log(baskets);
      if (status === 201 || status === 200) {
        const isUploadingSuccess: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_SUCCESS,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_ERROR,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const BuyItems = (basket: Basket, router: NextRouter) => {
  return async (dispatch) => {
    const isUploading: basketActionInterface = {
      type: basketActiontype.UPLOADING_BASKET,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const addItemToBasket = await axios.post(`${urlApi}basket`, {
        ...basket,
      });
      const { status, message, baskets } = await addItemToBasket.data;
      console.log(baskets);
      if (status === 201 || status === 200) {
        const isUploadingSuccess: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_SUCCESS,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingSuccess);
        router.push({ pathname: "/cart" });
      } else {
        const isUploadingError: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_ERROR,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

interface deleteBasket {
  customerId: string;
  id: string;
}

export const deleteBaskets = (basket: deleteBasket) => {
  return async (dispatch) => {
    const isUploading: basketActionInterface = {
      type: basketActiontype.UPLOADING_BASKET,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const deleteBasket = await axios.delete(`${urlApi}basket/${basket.id}`, {
        data: basket,
      });
      const { status, message, baskets } = await deleteBasket.data;
      if (status === 201 || status === 200) {
        const isUploadingSuccess: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_SUCCESS,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_ERROR,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

interface objectBasket {
  _id: string;
  customerId: string;
  productId: any;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export const updateIncrease = (objectBasketIncrease: objectBasket) => {
  return async (dispatch) => {
    const isUploading: basketActionInterface = {
      type: basketActiontype.UPLOADING_BASKET,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const increase = await axios.put(
        `${urlApi}basket/increase/${objectBasketIncrease._id}`,
        { ...objectBasketIncrease }
      );
      const { status, message, baskets } = increase.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_SUCCESS,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_ERROR,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateDecrease = (objectBasketIncrease: objectBasket) => {
  return async (dispatch) => {
    const isUploading: basketActionInterface = {
      type: basketActiontype.UPLOADING_BASKET,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const increase = await axios.put(
        `${urlApi}basket/decrease/${objectBasketIncrease._id}`,
        { ...objectBasketIncrease }
      );
      const { status, message, baskets } = increase.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_SUCCESS,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingSuccess);
      } else {
        const isUploadingError: basketActionInterface = {
          type: basketActiontype.UPLOADING_BASKET_ERROR,
          payload: { status, message, baskets },
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
