import { dispatch } from "@line/liff/dist/lib/client/bridge";
import axios from "axios";
import { urlApi } from "../urlapi";

export enum historiesActiontype {
  LOADING_HISTORIES = "LOADING_HISTORIES",
  LOADING_HISTORIES_ERROR = "LOADING_HISTORIES_ERROR",
  LOADING_HISTORIES_SUCCESS = "LOADING_HISTORIES_SUCCESS",
  UPLOADING_HISTORIES = "UPLOADING_HISTORIES",
  UPLOADING_HISTORIES_ERROR = "UPLOADING_HISTORIES_ERROR",
  UPLOADING_HISTORIES_SUCCESS = "UPLOADING_HISTORIES_SUCCESS",
  VISIBLE_SNACKBAR_HISTORIES = "VISIBLE_SNACKBAR_HISTORIES",
}

interface historiesActionInterface {
  type: historiesActiontype;
  payload: any;
}

export const feedHistoriesSuccess = () => {
  return async (dispatch) => {
    try {
      dispatch(setStateToisLoading);
      const histories = await axios.get(`${urlApi}history/type/1`);
      const { status, history } = await histories.data;
      if (status == 200) {
        setStateToisLoadingSuccess(dispatch, history);
      } else {
        setStateToisLoadingSuccess(dispatch, history);
      }
    } catch (error) {
      setStateToisLoadingError(dispatch, error);
    }
  };
};

export const feedHistoriesCancel = () => {
  return async (dispatch) => {
    try {
      dispatch(setStateToisLoading);
      const histories = await axios.get(`${urlApi}history/type/4`);
      const { status, history } = await histories.data;
      if (status == 200) {
        setStateToisLoadingSuccess(dispatch, history);
      } else {
        setStateToisLoadingSuccess(dispatch, history);
      }
    } catch (error) {
      setStateToisLoadingError(dispatch, error);
    }
  };
};

export const feedHistoriesWithTypeAndDate = (
  type: number,
  dateStartIso: string,
  dateEndIso: string
) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToisLoading);
      const histories = await axios.get(
        `${urlApi}history/search/${type}/${dateStartIso}/${dateEndIso}`
      );
      const { status, history } = await histories.data;
      if (status == 200) {
        setStateToisLoadingSuccess(dispatch, history);
      } else {
        setStateToisLoadingSuccess(dispatch, history);
      }
    } catch (error) {
      setStateToisLoadingError(dispatch, error);
    }
  };
};

export const feedHistoriesWithId = (id: string) => {
  return async (dispatch) => {
    try {
      const historie = await axios.get(`${urlApi}history/${id}`);
      const { status, history } = await historie.data;
      setStateToisLoadingSuccess(dispatch, history);
    } catch (error) {
      setStateToisLoadingError(dispatch, error);
    }
  };
};

//find history with customer id
export const findHistoryWithCustomerId = (id: string, type: number) => {
  return async (dispatch) => {
    try {
      const histories = await axios.get(
        `${urlApi}history/customer/${id}/${type}`
      );
      const { status, history } = await histories.data;
      setStateToisLoadingSuccess(dispatch, history);
    } catch (err) {
      setStateToisLoadingError(dispatch, err);
    }
  };
};

/* edit */
interface Shipping {
  id: string;
  shippingName: string;
  tackingNo: string;
}
export const editTrackingNo = (shipping: Shipping) => {
  return async (dispatch) => {
    setStateToupLoading(dispatch);
    const upload = await axios.put(
      `${urlApi}history/shipping/${shipping.id}`,
      { ...shipping }
    );
    const { message, status, history } = await upload.data;
    setStateToupLoadingSuccess(dispatch, { message, status, history });
  };
};

/* setState */

const setStateToisLoading = (dispatch) => {
  const isLoading: historiesActionInterface = {
    type: historiesActiontype.LOADING_HISTORIES,
    payload: null,
  };
  dispatch(isLoading);
};

const setStateToisLoadingError = (dispatch, error) => {
  const isLoadingError: historiesActionInterface = {
    type: historiesActiontype.LOADING_HISTORIES_ERROR,
    payload: null,
  };
  dispatch(isLoadingError);
};

const setStateToisLoadingSuccess = (dispatch, payload) => {
  const isLoadingSuccess: historiesActionInterface = {
    type: historiesActiontype.LOADING_HISTORIES_SUCCESS,
    payload: payload,
  };
  dispatch(isLoadingSuccess);
};

const setStateToupLoading = (dispatch) => {
  const isLoading: historiesActionInterface = {
    type: historiesActiontype.UPLOADING_HISTORIES,
    payload: null,
  };
  dispatch(isLoading);
};

const setStateToupLoadingError = (dispatch, error) => {
  const isLoadingError: historiesActionInterface = {
    type: historiesActiontype.UPLOADING_HISTORIES_ERROR,
    payload: null,
  };
  dispatch(isLoadingError);
};

const setStateToupLoadingSuccess = (dispatch, payload) => {
  const isLoadingSuccess: historiesActionInterface = {
    type: historiesActiontype.UPLOADING_HISTORIES_SUCCESS,
    payload: payload,
  };
  dispatch(isLoadingSuccess);
};
