import { checkoutActiontype } from "@/actions/checkout.action";
import { HYDRATE } from "next-redux-wrapper";

interface checkoutState {
  isLoading: boolean;
  isUploading: boolean;
  isError: boolean;
  isStatus: number;
  isMessage: string;
  checkouts: any[];
}

const initialState: checkoutState = {
  isLoading: false,
  isUploading: false,
  isMessage: "",
  isStatus: 0,
  isError: false,
  checkouts: [],
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case checkoutActiontype.LOADING_CHECKOUT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        checkouts: state.checkouts,
      };
    case checkoutActiontype.LOADING_CHECKOUT:
      return {
        ...state,
        isLoading: false,
        isError: true,
        checkouts: state.checkouts,
      };
    case checkoutActiontype.LOADING_CHECKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        checkouts: action.payload,
      };

    default:
      return state;
  }
};

export default checkoutReducer;
