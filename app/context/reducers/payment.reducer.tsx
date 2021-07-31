import { paymentActiontype } from "@/actions/payment.action";
import { HYDRATE } from "next-redux-wrapper";
interface paymentState {
  payments: any[];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
}
const initalState: paymentState = {
  payments: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
};

const paymentReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.paymentReducer,
      };
    case paymentActiontype.LOADING_PAYMENT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        payments: [],
      };
    case paymentActiontype.LOADING_PAYMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        payments: [],
      };

    case paymentActiontype.LOADING_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        payments: action.payload,
      };

    case paymentActiontype.UPLOADING_PAYMENT:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
        payments: state.payments,
      };

    case paymentActiontype.UPLOADING_PAYMENT_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        payments: state.payments,
      };

    case paymentActiontype.UPLOADING_PAYMENT_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        payments: action.payload.payments,
      };
    case paymentActiontype.UPDATE_PAYMENT:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
        payments: state.payments,
      };
    case paymentActiontype.UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        payments: action.payload.payments,
      };
    case paymentActiontype.UPDATE_PAYMENT_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        payments: state.payments,
      };

    default:
      return state;
  }
};

export default paymentReducer;
