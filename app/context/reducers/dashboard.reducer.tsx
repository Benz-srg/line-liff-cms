import { dashboardActiontype } from "@/actions/dashboard.action";
import { HYDRATE } from "next-redux-wrapper";

interface chart {
  _id: string;
  total: number;
}

interface dashBoardState {
  isLoading: boolean;
  isError: boolean;
  dashboards: chart[];
  sumdays: number;
  countSale: number;
  totalCustomer: number;
  lastsale7day: chart[];
}

const initalState: dashBoardState = {
  isLoading: false,
  isError: false,
  dashboards: [],
  sumdays: 0,
  countSale: 0,
  totalCustomer: 0,
  lastsale7day: [],
};

const dashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.dashboardReducer,
      };
    case dashboardActiontype.LOADING_DASHBOARD:
      return {
        ...state,
        isLoading: true,
        isError: false,
        dashboards: [],
      };

    case dashboardActiontype.LOADING_DASHBOARD_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        dashboards: state.dashboards,
      };

    case dashboardActiontype.LOADING_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: true,
        dashboards: action.payload.charts,
        sumdays: action.payload.sumbydate,
        countSale: action.payload.count,
        totalCustomer: action.payload.totalCustomer,
        lastsale7day: action.payload.lastsale7day,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
