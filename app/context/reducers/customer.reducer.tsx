import { HYDRATE } from "next-redux-wrapper";
import { customerActiontype } from "../actions/customer.action";

interface customerState {
  isLoading: boolean;
  isUploading: boolean;
  isError: boolean;
  isStatus: number;
  isMessage: string;
  customers: any | object;
  filterCustomer: any[] | object;
}

const initialState: customerState = {
  isLoading: false,
  isUploading: false,
  isError: false,
  isStatus: 0,
  isMessage: null,
  customers: [],
  filterCustomer: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.customerReducer,
      };

    case customerActiontype.LOADING_CUSTOMER:
      return {
        ...state,
        isLoading: true,
        isError: false,
        customers: [],
        filterCustomer: [],
      };

    case customerActiontype.LOADING_CUSTOMER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        customers: [],
        filterCustomer: [],
      };

    case customerActiontype.LOADING_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        customers: action.payload,
        filterCustomer: action.payload,
      };

    case customerActiontype.UPLOADING_CUSTOMER:
      return {
        ...state,
        isUploading: true,
        customers: state.customers,
      };

    case customerActiontype.UPLOADING_CUSTOMER_ERROR:
      return {
        ...state,
        isUploading: false,
        customers: state.customers,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
      };

    case customerActiontype.UPLOADING_CUSTOMER_SUCCESS:
      return {
        ...state,
        isUploading: false,
        customers: action.payload.customers,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
      };

    case customerActiontype.UPDATE_CUSTOMER_ADDRESS:
      state.customers.shippingAddress = action.payload;
      return {
        ...state,
        customers: state.customers,
      };

    case customerActiontype.VISIBLE_SNACKBAR_CUSTOMER: {
      return {
        ...state,
        isUploading: false,
        isLoading: false,
        isStatus: 0,
        isMessage: null,
      };
    }

    case customerActiontype.FILTER_CUSTOMER: {
      console.log(action.payload);
      return {
        ...state,
        customers: action.payload,
        filterCustomer: state.filterCustomer,
      };
    }

    default:
      return state;
  }
};

export default customerReducer;
