import { categoriesActiontype } from "@/actions/categories.action";
import { HYDRATE } from "next-redux-wrapper";

interface categoriesState {
  categories: [];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
  products: [];
}

const initialState: categoriesState = {
  categories: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
  products: [],
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.productReducer };
    case categoriesActiontype.LOADING_CATEGORIES:
      return {
        ...state,
        isLoading: true,
        isError: false,
        categories: [],
      };

    case categoriesActiontype.LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        categories: [],
      };

    case categoriesActiontype.LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        categories: action.payload.categories,
        products: action.payload.products,
      };
    //handle create categories
    case categoriesActiontype.UPLOADING_CATEGORIES:
      return {
        ...state,
        isUploading: true,
        isStatus: 0,
        isMessage: "",
      };
    //create categories success
    case categoriesActiontype.UPLOADING_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
        categories: action.payload.categories,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
