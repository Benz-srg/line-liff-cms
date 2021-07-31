import axios from "axios";
import { urlApi } from "../urlapi";

export enum dashboardActiontype {
  LOADING_DASHBOARD = "LOADING_DASHBOARD",
  LOADING_DASHBOARD_ERROR = "LOADING_DASHBOARD_ERROR",
  LOADING_DASHBOARD_SUCCESS = "LOADING_DASHBOARD_SUCCESS",
  UPLOADING_DASHBOARD = "UPLOADING_DASHBOARD",
  UPLOADING_DASHBOARD_ERROR = "UPLOADING_DASHBOARD_ERROR",
  UPLOADING_DASHBOARD_SUCCESS = "UPLOADING_DASHBOARD_SUCCESS",
}

interface dashboardActionInterface {
  type: dashboardActiontype;
  payload: any;
}

export const feedDayofMonth = (type: string) => {
  return async (dispatch) => {
    try {
      setStateToLoading(dispatch);
      const dashboard = await axios.get(`${urlApi}dashboard/${type}`);
      const sumdays = await axios.get(`${urlApi}dashboard/sumisdate`);
      const newCustomer = await axios.get(`${urlApi}dashboard/customermonth`);
      const salelast7day = await axios.get(`${urlApi}dashboard/7day`);

      const { charts } = await dashboard.data;
      const { sumbydate, count } = await sumdays.data;
      const { totalCustomer } = await newCustomer.data;
      const { lastsale7day } = await salelast7day.data;
      setStateToLoadingSuccess(dispatch, {
        charts,
        sumbydate,
        count,
        totalCustomer,
        lastsale7day,
      });
    } catch (error) {
      setStateToLoadingError(dispatch, error);
    }
  };
};

const setStateToLoading = (dispatch) => {
  const isLoading: dashboardActionInterface = {
    type: dashboardActiontype.LOADING_DASHBOARD,
    payload: null,
  };
  dispatch(isLoading);
};

const setStateToLoadingError = (dispatch, error) => {
  const isLoadingError: dashboardActionInterface = {
    type: dashboardActiontype.LOADING_DASHBOARD_ERROR,
    payload: error,
  };
  dispatch(isLoadingError);
};

const setStateToLoadingSuccess = (dispatch, payload) => {
  const isLoadingSuccess: dashboardActionInterface = {
    type: dashboardActiontype.LOADING_DASHBOARD_SUCCESS,
    payload: payload,
  };
  dispatch(isLoadingSuccess);
};
