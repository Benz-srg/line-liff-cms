import { orderActiontype } from "@/actions/order.action";
import { HYDRATE } from "next-redux-wrapper";

interface orderState {
  isLoading: boolean;
  isUploading: boolean;
  isError: boolean;
  isStatus: number;
  isMessage: string;
  orders: any[];
  orderAddress: any[];
}

const initalState: orderState = {
  orders: [],
  orderAddress: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
};

const orderReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.orderReducer,
      };
    case orderActiontype.LOADING_ORDER:
      return {
        ...state,
        isLoading: true,
        isError: false,
        orders: state.orders,
      };

    case orderActiontype.LOADING_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        orders: state.orders,
      };

    case orderActiontype.LOADING_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        orders: action.payload,
      };

    case orderActiontype.UPLOADING_ORDER:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
      };

    case orderActiontype.UPLOADING_ORDER_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
      };

    case orderActiontype.UPLOADING_ORDER_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
      };
    case orderActiontype.GETTING_ORDER:
      return {
        ...state,
        isUploading: true,
      };
    case orderActiontype.GETTING_ORDER_SUCCESS:
      return {
        ...state,
        isUploading: false,
        orders: action.payload,
      };
    case orderActiontype.GETTING_ORDER_ADDRESS:
      return {
        ...state,
        isUploading: true,
      };
    case orderActiontype.GETTING_ORDER_ADDRESS_SUCCESS:
      return {
        ...state,
        isUploading: false,
        orderAddress: action.payload,
      };
    case orderActiontype.UPDATING_ADDRESS:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
      };

    case orderActiontype.UPDATING_ADDRESS_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
      };

    case orderActiontype.UPDATING_ADDRESS_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
      };
    default:
      return state;
  }
};

export default orderReducer;
