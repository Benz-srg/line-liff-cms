import axios from "axios";
import { urlApi } from "../urlapi";

export enum adminActiontype {
  LOADING_ADDMIN = "LOADING_ADDMIN",
  LOADING_ADDMIN_ERROR = "LOADING_ADDMIN_ERROR",
  LOADING_ADDMIN_SUCCESS = "LOADING_ADDMIN_SUCCESS",
  UPLOADING_ADDMIN = "UPLOADING_ADDMIN",
  UPLOADING_ADDMIN_ERROR = "UPLOADING_ADDMIN_ERROR",
  UPLOADING_ADDMIN_SUCCESS = "UPLOADING_ADDMIN_SUCCESS",
}

interface adminActionInterface {
  type: adminActiontype;
  payload: any;
}

interface adminState {
  _id: string;
  fullName: string;
  userName: string;
  passWord: string;
  role: string;
  email: string;
  tel: string;
}

export const feedAdmins = () => {
  return async (dispatch) => {
    const isLoading: adminActionInterface = {
      type: adminActiontype.LOADING_ADDMIN,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const getAdmins = await axios.get(`${urlApi}admin`);
      const { admins } = await getAdmins.data;
      const LoadingSuccess: adminActionInterface = {
        type: adminActiontype.LOADING_ADDMIN_SUCCESS,
        payload: admins,
      };
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createAdmin = (admin: adminState) => {
  return async (dispatch) => {
    delete admin._id;
    const isUploading: adminActionInterface = {
      type: adminActiontype.UPLOADING_ADDMIN,
      payload: null,
    };
    dispatch(isUploading);
    try {
      const postAdmin = await axios.post(`${urlApi}admin`, { ...admin });
      const { status, message, admins } = await postAdmin.data;
      if (status === 201 || status === 200) {
        const payload = { status, message, admins };
        const isUploadingSuccess: adminActionInterface = {
          type: adminActiontype.UPLOADING_ADDMIN_SUCCESS,
          payload: payload,
        };
        dispatch(isUploadingSuccess);
      } else {
        const payload = { status, message, admins };
        const isUploadingError: adminActionInterface = {
          type: adminActiontype.UPLOADING_ADDMIN_ERROR,
          payload: payload,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateAdmin = (admin: adminState) => {
  return async (dispatch) => {
    const Uploading: adminActionInterface = {
      type: adminActiontype.UPLOADING_ADDMIN,
      payload: null,
    };
    dispatch(Uploading);

    try {
      const updatedAdmin = await axios.put(`${urlApi}admin/${admin._id}`, {
        ...admin,
      });
      const { status, message, admins } = await updatedAdmin.data;
      if (status === 200 || status === 201) {
        const payload = { status, message, admins };
        const UploadingSuccess: adminActionInterface = {
          type: adminActiontype.UPLOADING_ADDMIN_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        const payload = { status, message, admins };
        const UploadingError: adminActionInterface = {
          type: adminActiontype.UPLOADING_ADDMIN_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletedAdmin = (adminIds: string[]) => {
  return async (dispatch) => {
    const Uploading: adminActionInterface = {
      type: adminActiontype.UPLOADING_ADDMIN,
      payload: null,
    };
    dispatch(Uploading);
    try {
      const deletedAdmin = await axios({
        url: `${urlApi}admin`,
        method: "delete",
        data: { id: adminIds },
      });
      const { status, message, admins } = await deletedAdmin.data;
      if (status === 200 || status === 201) {
        const payload = { status, message, admins };
        const UploadingSuccess: adminActionInterface = {
          type: adminActiontype.UPLOADING_ADDMIN_SUCCESS,
          payload: payload,
        };
        dispatch(UploadingSuccess);
      } else {
        const payload = { status, message, admins };
        const UploadingError: adminActionInterface = {
          type: adminActiontype.UPLOADING_ADDMIN_ERROR,
          payload: payload,
        };
        dispatch(UploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
