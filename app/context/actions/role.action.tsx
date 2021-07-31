import axios from "axios";
import { urlApi } from "../urlapi";

export enum roleActionType {
  LOADING_ROLE = "LOADING_ROLE",
  LOADING_ERROR = "LOADING_ERROR",
  LOADING_SUCCESS = "LOADING_SUCCESS",
  ADD_ROLE = "ADD_ROLE",
  DELETE_ROLE = "DELETE_ROLE",
  UPLOADING_ROLE = "UPLOADING_ROLE",
  UPLOADING_ERROR = "UPLOADING_ERROR",
  UPLOADING_SUCCESS = "UPLOADING_SUCCESS",
  VISIBLE_SNACKBAR = "VISIBLE_SNACKBAR",
}

interface RoleActionInterface {
  type: roleActionType;
  payload: any;
}

//get all roles showing in role page
export const getAllRoles = () => {
  return async (dispatch) => {
    const isLoading: RoleActionInterface = {
      type: roleActionType.LOADING_ROLE,
      payload: null,
    };
    const LoadingSuccess: RoleActionInterface = {
      type: roleActionType.LOADING_SUCCESS,
      payload: null,
    };
    dispatch(isLoading);
    try {
      const result = await axios.get(`${urlApi}role`);
      const { roles } = result.data;
      LoadingSuccess.payload = roles;
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

// create Role
export const createRole = (roleName: any) => {
  return async (dispatch) => {
    const isUploading: RoleActionInterface = {
      type: roleActionType.UPLOADING_ROLE,
      payload: null,
    };
    try {
      console.log(roleName);
      dispatch(isUploading);
      let data = `roleName=${roleName.roleName}`;
      const addRole = await axios.post(`${urlApi}role`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const { status, message, roles } = await addRole.data;
      if (status === 201) {
        const payload = { status: status, message: message, roles: roles };
        const isUploadingSuccess: RoleActionInterface = {
          type: roleActionType.UPLOADING_SUCCESS,
          payload: payload,
        };
        dispatch(isUploadingSuccess);
      } else {
        const payload = {
          message: message,
          status: status,
        };
        const isUploadingError: RoleActionInterface = {
          type: roleActionType.UPLOADING_ERROR,
          payload: payload,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//delete role
export const deletedRole = (roleIds: string[]) => {
  return async (dispatch) => {
    const Uploading: RoleActionInterface = {
      type: roleActionType.UPLOADING_ROLE,
      payload: null,
    };
    dispatch(Uploading);
    try {
      const deletedRole = await axios({
        url: `${urlApi}role`,
        method: "delete",
        data: { id: roleIds },
      });
      const { status, message, roles } = await deletedRole.data;
      if (status === 200 || status === 201) {
        const payload = { status, message, roles };
        const UploadingSuccess: RoleActionInterface = {
          type: roleActionType.UPLOADING_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        const payload = { status, message, roles };
        const UploadingError: RoleActionInterface = {
          type: roleActionType.UPLOADING_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
