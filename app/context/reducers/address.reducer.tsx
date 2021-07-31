import { addressActiontype } from "@/actions/address.action";
import { HYDRATE } from "next-redux-wrapper";
export interface addressState {
  addresses: any[];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
}
const initalState: addressState = {
  addresses: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
};

const addressReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.addressReducer,
      };
    case addressActiontype.LOADING_ADDRESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        addresses: [],
      };
    case addressActiontype.LOADING_ADDRESS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        addresses: [],
      };

    case addressActiontype.LOADING_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        addresses: action.payload,
      };

    case addressActiontype.UPLOADING_ADDRESS:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
        addresses: state.addresses,
      };

    case addressActiontype.UPLOADING_ADDRESS_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        addresses: state.addresses,
      };

    case addressActiontype.UPLOADING_ADDRESS_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        addresses: action.payload.addresses,
      };
      case addressActiontype.DELETE_ADDRESS:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
        addresses: state.addresses,
      };
      case addressActiontype.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        addresses: action.payload.addresses,
      };
      
    case addressActiontype.DELETE_ADDRESS_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        addresses: state.addresses,
      };
      case addressActiontype.VISIBLE_SNACKBAR_CUSTOMER: {
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

export default addressReducer;
