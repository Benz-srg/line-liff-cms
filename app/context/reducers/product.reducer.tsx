import { productActionType } from "../actions/product.action";
import { HYDRATE } from "next-redux-wrapper";

interface productState {
  products: any[];
  isLoading: boolean;
  isError: boolean;
  isMessage: string;
  isStatus: number;
  isUploading: boolean;
  productId: any[];
  filterProducts: any[];
  newproducts: any[];
  popularproducts: any[];
}

const initialState: productState = {
  products: [],
  filterProducts: [],
  isLoading: false,
  isError: false,
  isMessage: null,
  isStatus: 0,
  isUploading: false,
  productId: [],
  newproducts: [],
  popularproducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.productReducer };
    case productActionType.LOADING_PRODUCT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        products: [],
      };

    case productActionType.LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        products: [],
      };

    case productActionType.LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
        filterProducts: action.payload,
      };

    case productActionType.LOADING_PRODUCTID_SUCCESS:
      return {
        ...state,
        productId: action.payload,
      };

    case productActionType.ADD_PRODUCT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case productActionType.DELETE_PRODUCT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case productActionType.UPLOADING_PRODUCT:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: state.products,
        isUploading: true,
      };

    case productActionType.UPLOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isUploading: false,
        products: state.products,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
      };

    case productActionType.UPLOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        products: action.payload.products,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
        filterProducts: action.payload.products,
      };

    case productActionType.UPLOADING_PRODUCTID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isUploading: false,
        products: state.products,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
        productId: action.payload.products,
      };

    case productActionType.DELETE_IMAGE_PRODUCT:
      state.productId.map(({ images }: any) => {
        const indexImage = images.findIndex((image) => action.payload == image);
        delete images[indexImage];
        images.push("add Image");
      });
      return {
        ...state,
        products: state.productId,
      };

    case productActionType.VISIBLE_SNACKBAR:
      return {
        ...state,
        isUploading: false,
        isStatus: 0,
        isMessage: null,
        isLoading: false,
      };

    case productActionType.PRODUCT_FILTER:
      return {
        ...state,
        products: action.payload,
        filterProducts: state.filterProducts,
      };

    case productActionType.LOADING_PRODUCT_CUSOMTER:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload.all,
        newproducts: action.payload.newproduct,
        popularproducts: action.payload.data,
      };
    default:
      return state;
  }
};

export default productReducer;
