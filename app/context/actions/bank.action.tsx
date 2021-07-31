import axios from "axios";
import { urlApi } from "../urlapi";

export enum bankActiontype {
  LOADING_BANK = "LOADING_BANK",
  LOADING_BANK_ERROR = "LOADING_BANK_ERROR",
  LOADING_BANK_SUCCESS = "LOADING_BANK_SUCCESS",
  UPLOADING_BANK = "UPLOADING_BANK",
  UPLOADING_BANK_ERROR = "UPLOADING_BANK_ERROR",
  UPLOADING_BANK_SUCCESS = "UPLOADING_BANK_SUCCESS",
}

interface bankActionInterface {
  type: bankActiontype;
  payload: any;
}

interface bankState {
  _id: string;
  account: number;
  bankName: string;
  bankAccountName: string;
}

export const feedBanks = () => {
  return async (dispatch) => {
    const isLoading: bankActionInterface = {
      type: bankActiontype.LOADING_BANK,
      payload: null,
    };

    dispatch(isLoading);
    try {
      const getBanks = await axios.get(`${urlApi}bank`);
      const { banks } = await getBanks.data;
      const LoadingSuccess: bankActionInterface = {
        type: bankActiontype.LOADING_BANK_SUCCESS,
        payload: banks,
      };
      dispatch(LoadingSuccess);
    } catch (error) {
      console.log(error);
    }
  };
};
/* 
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
 */
