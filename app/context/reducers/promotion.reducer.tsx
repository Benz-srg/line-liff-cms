import { promotionActiontype } from "../actions/promotion.action";
import { HYDRATE } from "next-redux-wrapper";

interface photoObject {
  statusPromotion: boolean;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface promotionState {
  photos: photoObject;
  isLoading: boolean;
  isUploading: boolean;
  isError: boolean;
  isMessage: string;
  isStatus: number;
}

let objectPhoto = {
  statusPromotion: false,
  photo: "",
  createdAt: "",
  updatedAt: "",
};

const initialState: promotionState = {
  photos: objectPhoto,
  isLoading: false,
  isUploading: false,
  isError: false,
  isMessage: null,
  isStatus: 0,
};

const promotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.promotionReducer };
    case promotionActiontype.LOADING_PROMOTION:
      return {
        ...state,
        isLoading: true,
        isError: false,
        photos: [],
      };
    case promotionActiontype.LOADING_PROMOTION_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false,
        photos: action.payload,
      };
    case promotionActiontype.LOADING_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        photos: action.payload,
      };

    case promotionActiontype.UPLOADING_PROMOTION:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: true,
        photos: state.photos,
      };

    case promotionActiontype.UPLOADING_PROMOTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        photos: action.payload.photo,
      };

    case promotionActiontype.VISIBLE_SNACKBAR_CUSTOMER:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        isMessage: null,
        isStatus: 0,
      };
    default:
      return state;
  }
};

export default promotionReducer;
