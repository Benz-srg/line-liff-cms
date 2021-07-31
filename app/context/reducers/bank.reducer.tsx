import { bankActiontype } from "@/actions/bank.action";
import { HYDRATE } from "next-redux-wrapper";

interface bankState {
  banks: any[];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
}
const initalState: bankState = {
  banks: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
};

const bankReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.adminReducer,
      };
    case bankActiontype.LOADING_BANK:
      return { ...state, isLoading: true, isError: false, admins: [] };
    case bankActiontype.LOADING_BANK_ERROR:
      return { ...state, isLoading: false, isError: true, admins: [] };
    case bankActiontype.LOADING_BANK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        banks: action.payload,
      };

    case bankActiontype.UPLOADING_BANK:
      return {
        ...state,
        isUploading: true,
        isMessage: "",
        isStatus: state.isStatus,
        banks: state.banks,
      };

    case bankActiontype.UPLOADING_BANK_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        banks: state.banks,
      };

    case bankActiontype.UPLOADING_BANK_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        banks: action.payload.banks,
      };

    default:
      return state;
  }
};

export default bankReducer;
