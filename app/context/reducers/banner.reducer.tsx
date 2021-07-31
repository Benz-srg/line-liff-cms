import { bannerActiontype } from "@/actions/banner.action";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: false,
  isError: false,
  isUploading: false,
  photos: [],
  message: "",
  status: 0,
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.bannerReducer,
      };
    case bannerActiontype.LOADING_BANNBER:
      return {
        ...state,
        isLoading: true,
        isError: false,
        photos: state.photos,
      };

    case bannerActiontype.LOADING_BANNBER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        photos: state.photos,
      };

    case bannerActiontype.LOADING_BANNBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        photos: action.payload,
      };

    case bannerActiontype.UPLOADING_BANNBER:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: true,
        photos: state.photos,
        message: "",
        status: 0,
      };

    case bannerActiontype.UPLOADING_BANNBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        photos: action.payload.photos,
        message: action.payload.message,
        status: action.payload.status,
      };
    case bannerActiontype.VISIBLE_SNACKBAR_CUSTOMER:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        message: "",
        status: 0,
      };
    default:
      return state;
  }
};

export default bannerReducer;
