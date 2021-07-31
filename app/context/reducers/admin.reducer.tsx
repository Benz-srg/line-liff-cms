import { adminActiontype } from "@/actions/admin.action";
import { HYDRATE } from "next-redux-wrapper";
export interface adminState {
  admins: any[];
  isLoading: boolean;
  isError: boolean;
  isUploading: boolean;
  isMessage: string;
  isStatus: number;
}
const initalState: adminState = {
  admins: [],
  isLoading: false,
  isError: false,
  isUploading: false,
  isMessage: null,
  isStatus: 0,
};

const adminReducer = (state = initalState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.adminReducer,
      };
    case adminActiontype.LOADING_ADDMIN:
      return { ...state, isLoading: true, isError: false, admins: [] };
    case adminActiontype.LOADING_ADDMIN_ERROR:
      return { ...state, isLoading: false, isError: true, admins: [] };
    case adminActiontype.LOADING_ADDMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        admins: action.payload,
      };

    case adminActiontype.UPLOADING_ADDMIN:
      return {
        ...state,
        isUploading: true,
        isMessage: "",
        isStatus: state.isStatus,
        admins: state.admins,
      };

    case adminActiontype.UPLOADING_ADDMIN_ERROR:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        admins: state.admins,
      };

    case adminActiontype.UPLOADING_ADDMIN_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isMessage: action.payload.message,
        isStatus: action.payload.status,
        admins: action.payload.admins,
      };

    default:
      return state;
  }
};

export default adminReducer;
