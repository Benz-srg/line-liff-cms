import { permissionActionType } from "../actions/permission.action";
import { HYDRATE } from "next-redux-wrapper";
interface permissionState {
  adminPermission: [];
  permissions: [];
  isLoading: boolean;
  isError: boolean;
  isMessage: string;
  isStatus: number;
}

const initialState: permissionState = {
  adminPermission: [],
  permissions: [],
  isLoading: false,
  isError: false,
  isMessage: null,
  isStatus: 0,
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.permissionReducer };
    case permissionActionType.LOADING_PERMISSION:
      return {
        ...state,
        isLoading: true,
        isError: false,
        permissions: [],
      };
    case permissionActionType.LOADING_PERMISSION_SUCCESS:
      console.log(action);
      return {
        ...state,
        isLoading: false,
        isError: false,
        permissions: action.payload,
      };
    case permissionActionType.UPLOADING_PERMISSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        permissions: action.payload.permissions,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
      };
    case permissionActionType.UPLOADING_PERMISSION:
      return {
        ...state,
        isLoading: true,
        isError: false,
        permissions: state.permissions,
      };
    case permissionActionType.UPLOADING_PERMISSION_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        permissions: state.permissions,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
      };
    case permissionActionType.LOADING_ADMIN_PERMISSION:
      return {
        ...state,
        isLoading: true,
        isError: false,
        adminPermission: state.adminPermission,
      };
    case permissionActionType.LOADING_ADMIN_PERMISSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        adminPermission: action.payload,
      };
    case permissionActionType.LOADING_ADMIN_PERMISSION_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        adminPermission: state.adminPermission,
      };
    default:
      return state;
  }
};

export default permissionReducer;
