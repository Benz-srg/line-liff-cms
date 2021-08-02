import { aboutActionType } from "../actions/about.action";
import { HYDRATE } from "next-redux-wrapper";

interface aboutState {
  abouts: any[];
  isLoading: boolean;
  isError: boolean;
  isMessage: string;
  isStatus: number;
  isUploading: boolean;
  aboutId: any[];
  filterAbout: any[];
}

const initialState: aboutState = {
  abouts: [],
  filterAbout: [],
  isLoading: false,
  isError: false,
  isMessage: null,
  isStatus: 0,
  isUploading: false,
  aboutId: [],
};

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.aboutReducer };
    case aboutActionType.LOADING_ABOUT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        abouts: [],
      };

    case aboutActionType.LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        abouts: [],
      };

    case aboutActionType.LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        abouts: action.payload,
        filterAbout: action.payload
      };

    case aboutActionType.LOADING_ABOUTID_SUCCESS:
      return {
        ...state,
        aboutId: action.payload,
      };

    case aboutActionType.ADD_ABOUT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case aboutActionType.DELETE_ABOUTUS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case aboutActionType.DELETE_ABOUTUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        abouts: action.payload.abouts,
      };
    case aboutActionType.DELETE_ABOUTUS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isUploading: false,
        abouts: state.abouts,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
      };

    case aboutActionType.UPLOADING_ABOUT:
      return {
        ...state,
        isLoading: false,
        isError: false,
        abouts: state.abouts,
        isUploading: true,
      };

    case aboutActionType.UPLOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isUploading: false,
        abouts: state.abouts,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
      };

    case aboutActionType.UPLOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        abouts: action.payload.abouts,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
        filterAbout: action.payload.abouts
      };

    case aboutActionType.UPLOADING_ABOUTID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        abouts: state.abouts,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
        aboutId: action.payload.abouts,
      };

    case aboutActionType.DELETE_IMAGE_ABOUT:
      state.aboutId.map(({ images }: any) => {
        const indexImage = images.findIndex((image) => action.payload == image);
        delete images[indexImage];
        images.push("add Image");
      });
      return {
        ...state,
        abouts: state.aboutId,
      };

    case aboutActionType.VISIBLE_SNACKBAR:
      return {
        ...state,
        isUploading: false,
        isStatus: 0,
        isMessage: null,
        isLoading: false,
      };

    case aboutActionType.ABOUT_FILTER:
      return {
        ...state,
        abouts: action.payload,
        filterAbout: state.filterAbout,
      };
    default:
      return state;
  }
};

export default aboutReducer;
