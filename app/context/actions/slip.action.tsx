import axios from "axios";
import { urlApi } from "../urlapi";

export enum slipActiontype {
  LOADING_SLIP = "",
  LOADING_SLIP_ERROR = "",
  LOADING_SLIP_SUCCESS = "",
  UPLOADING_SLIP = "",
  UPLOADING_SLIP_ERROR = "",
  UPLOADING_SLIP_SUCCESS = "",
}

interface slipActionInterface {
  type: slipActiontype;
  payload: any;
}

const setStateToLoading = () => ({
  type: slipActiontype.LOADING_SLIP,
  payload: null,
});

const setStateError = (payload) => ({
  type: slipActiontype.LOADING_SLIP_ERROR,
  payload: payload,
});

const setStateToSuccess = (payload) => ({
  type: slipActiontype.LOADING_SLIP_SUCCESS,
  payload: payload,
});

const setStateToUploading = () => ({
  type: slipActiontype.UPLOADING_SLIP,
  payload: null,
});

const setStateToUploadingError = (payload) => ({
  type: slipActiontype.UPLOADING_SLIP_ERROR,
  payload: payload,
});

const setStateToUploadingSuccess = (payload) => ({
  type: slipActiontype.UPLOADING_SLIP_SUCCESS,
  payload: payload,
});

export const uploadImage = (photo: FormData, orderId: String) => {
  return async (dispatch) => {
    try {
      console.log(photo);
      dispatch(setStateToUploading());
      const postSlip = await axios.post(
        `${urlApi}order/uploadSlip/${orderId}`,
        photo
      );
      const { status, message, photos } = await postSlip.data;
      dispatch(setStateToUploadingSuccess({ status, message, photos }));
    } catch (err) {
      dispatch(setStateToUploadingError);
    }
  };
};
