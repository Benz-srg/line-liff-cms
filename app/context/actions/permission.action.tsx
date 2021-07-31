import axios from "axios";
import { urlApi } from "../urlapi";

export enum permissionActionType {
  LOADING_PERMISSION = "LOADING_PERMISSION",
  LOADING_PERMISSION_ERROR = "LOADING_PERMISSION_ERROR",
  LOADING_PERMISSION_SUCCESS = "LOADING_PERMISSION_SUCCESS",
  ADD_PERMISSION = "ADD_PERMISSION",
  DELETE_PERMISSION = "DELETE_PERMISSION",
  UPLOADING_PERMISSION = "UPLOADING_PERMISSION",
  UPLOADING_PERMISSION_ERROR = "UPLOADING_PERMISSION_ERROR",
  UPLOADING_PERMISSION_SUCCESS = "UPLOADING_PERMISSION_SUCCESS",
  VISIBLE_SNACKBAR = "VISIBLE_SNACKBAR",
  LOADING_ADMIN_PERMISSION = "LOADING_ADMIN_PERMISSION",
  LOADING_ADMIN_PERMISSION_SUCCESS = "LOADING_ADMIN_PERMISSION_SUCCESS",
  LOADING_ADMIN_PERMISSION_ERROR = "LOADING_ADMIN_PERMISSION_ERROR",
}

interface PermissionActionInterface {
  type: permissionActionType;
  payload: any;
}

//get all permissions
export const getPermission = (roleId: string) => {
  return async (dispatch) => {
    const isLoading: PermissionActionInterface = {
      type: permissionActionType.LOADING_PERMISSION,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const permission = await axios.get(`${urlApi}rolePermission/${roleId}`);
      const { status, message, permissions } = permission.data;
      if (status === 200 || status === 201) {
        const LoadingSuccess: PermissionActionInterface = {
          type: permissionActionType.LOADING_PERMISSION_SUCCESS,
          payload: permissions,
        };
        dispatch(LoadingSuccess);
      } else {
        const payload = { message: message, status };
        const LoadingError: PermissionActionInterface = {
          type: permissionActionType.LOADING_PERMISSION_ERROR,
          payload: payload,
        };
        dispatch(LoadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePermission = (
  permissionId: string,
  permissionDetail: any
) => {
  return async (dispatch) => {
    const isUploading: PermissionActionInterface = {
      type: permissionActionType.UPLOADING_PERMISSION,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const updatePermission = await axios.put(
        `${urlApi}updatePermission/${permissionId}`,
        { ...permissionDetail }
      );
      const { status, message, permissions } = await updatePermission.data;
      if (status === 200) {
        let payload;
        payload = {
          message: message,
          permissions: permissions,
          status: status,
        };
        const UploadingSuccess: PermissionActionInterface = {
          type: permissionActionType.UPLOADING_PERMISSION_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        let payload;
        payload = {
          message: message,
          permissions: permissions,
          status: status,
        };
        const UploadingError: PermissionActionInterface = {
          type: permissionActionType.UPLOADING_PERMISSION_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//get user permissions
export const getPermissionByUserId = (userId: string) => {
  return async (dispatch) => {
    const isLoading: PermissionActionInterface = {
      type: permissionActionType.LOADING_ADMIN_PERMISSION,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const permission = await axios.post(`${urlApi}getRoleById/${userId}`);
      const { status, message, data } = permission.data;
      if (status == 200) {
        // window.localStorage.setItem("permission", data.permission[0]);
        const LoadingSuccess: PermissionActionInterface = {
          type: permissionActionType.LOADING_ADMIN_PERMISSION_SUCCESS,
          payload: data.permission[0],
        };
        dispatch(LoadingSuccess);
      } else {
        const payload = { message: message, status };
        const LoadingError: PermissionActionInterface = {
          type: permissionActionType.LOADING_ADMIN_PERMISSION_ERROR,
          payload: payload,
        };
        dispatch(LoadingError);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
