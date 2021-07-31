import { shippingActiontype } from "@/actions/shipping.action";
import { HYDRATE } from "next-redux-wrapper";
export interface shippingState {
  shippingcost: any[];
  cost:number
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
}
const initalState: shippingState = {
  shippingcost: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  cost:0,
  isStatus: 0,
};

const shippingReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.shippingReducer,
      };
    case shippingActiontype.LOADING_SHIPPING_COST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        shippingcost: [],
      };
    case shippingActiontype.LOADING_SHIPPING_COST_ERROR:
      return {
      };

    case shippingActiontype.LOADING_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        shippingcost: action.payload,
        cost: action.cost,
      };
      case shippingActiontype.LOADING_SHIPPING_COST_PRICE:
        return {
          ...state,
          isLoading: true,
          isError: false,
          shippingcost: [],
        };
      case shippingActiontype.LOADING_SHIPPING_COST_PRICE_ERROR:
        return {
        };
  
      case shippingActiontype.LOADING_SHIPPING_COST_PRICE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          shippingcost: action.payload,
          cost: action.cost,
        };
    case shippingActiontype.UPLOADING_SHIPPING_COST:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
        shippingcost: state.shippingcost,
      };

    case shippingActiontype.UPLOADING_SHIPPING_COST_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        shippingcost: state.shippingcost,
      };

    case shippingActiontype.UPLOADING_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        shippingcost: action.payload.shippingcost,
      };
    case shippingActiontype.DELETE_SHIPPING_COST:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
        shippingcost: state.shippingcost,
      };
    case shippingActiontype.DELETE_SHIPPING_COST_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        shippingcost: action.payload.shippingcost,
      };

    case shippingActiontype.DELETE_SHIPPING_COST_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        shippingcost: state.shippingcost,
      };
    case shippingActiontype.VISIBLE_SNACKBAR_CUSTOMER: {
      return {
        ...state,
        isUploading: false,
        isLoading: false,
        isStatus: 0,
        isMessage: null,
      };
    }



    default:
      return state;
  }
};

export default shippingReducer;
