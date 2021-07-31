import { allbankActiontype } from "@/actions/allbank.action";
import { HYDRATE } from "next-redux-wrapper";
interface allbankState {
  allbanks: any[];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
}
const initalState: allbankState = {
  allbanks: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
};

const allbankReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.allbankReducer,
      };
    case allbankActiontype.LOADING_ALLBANK:
      return {
        ...state,
        isLoading: true,
        isError: false,
        allbanks: [],
      };
    case allbankActiontype.LOADING_ALLBANK_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        allbanks: [],
      };

    case allbankActiontype.LOADING_ALLBANK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        allbanks: action.payload,
      };

    default:
      return state;
  }
};

export default allbankReducer;
