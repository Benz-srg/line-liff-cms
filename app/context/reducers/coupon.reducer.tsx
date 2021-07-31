import { HYDRATE } from "next-redux-wrapper";
import { couponActiontype } from "@/actions/coupon.action";

interface couponState {
  coupons: any[];
  filterCoupons: any[];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
  usecode: any;
}

const initialState: couponState = {
  coupons: [],
  filterCoupons: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
  usecode: null,
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.couponReducer };

    case couponActiontype.LOADING_COUPON:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case couponActiontype.LOADING_COUPON_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case couponActiontype.LOADING_COUPON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        coupons: action.payload,
        filterCoupons: action.payload,
      };

    case couponActiontype.UPLOADING_COUPON:
      return {
        ...state,
        isUploading: true,
      };

    case couponActiontype.UPLOADING_COUPON_ERROR:
      return {
        ...state,
        isUploading: false,
        coupons: state.coupons,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
      };

    case couponActiontype.UPLOADING_COUPON_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isError: false,
        coupons: action.payload.coupons,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        filterCoupons: action.payload.coupons,
      };

    case couponActiontype.COUPON_DESTROY:
      return {
        ...state,
        coupons: [],
      };

    case couponActiontype.COUPON_USECODE:
      return {
        ...state,
        usecode: action.payload,
      };

    case couponActiontype.COUPON_FILTER:
      return {
        ...state,
        coupons: action.payload,
        filterCoupons: state.filterCoupons,
      };

    default:
      return state;
  }
};

export default couponReducer;
