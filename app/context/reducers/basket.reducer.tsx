import { basketActiontype } from "@/actions/basket.action";
import { HYDRATE } from "next-redux-wrapper";
interface basketState {
  baskets: any[];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
}
const initalState: basketState = {
  baskets: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
};

const basketReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.basketReducer,
      };
    case basketActiontype.LOADING_BASKET:
      return {
        ...state,
        isLoading: true,
        isError: false,
        basket: [],
      };

    case basketActiontype.LOADING_BASKET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        basket: [],
      };

    case basketActiontype.LOADING_BASKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        baskets: action.payload,
      };

    case basketActiontype.UPLOADING_BASKET:
      return {
        ...state,
        isUploading: true,
        isMessage: null,
        isStatus: 0,
        baskets: state.baskets,
      };

    case basketActiontype.UPLOADING_BASKET_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        baskets: state.baskets,
      };

    case basketActiontype.UPLOADING_BASKET_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        baskets: action.payload.baskets,
      };

    default:
      return state;
  }
};

export default basketReducer;
