import axios from "axios";
import { urlApi } from "../urlapi";

export enum allbankActiontype {
  LOADING_ALLBANK = "LOADING_ALLBANK",
  LOADING_ALLBANK_ERROR = "LOADING_ALLBANK_ERROR",
  LOADING_ALLBANK_SUCCESS = "LOADING_ALLBANK_SUCCESS",
  UPLOADING_ALLBANK = "UPLOADING_ALLBANK",
  UPLOADING_ALLBANK_ERROR = "UPLOADING_ALLBANK_ERROR",
  UPLOADING_ALLBANK_SUCCESS = "UPLOADING_ALLBANK_SUCCESS",
}
interface allbankActionInterface {
  type: allbankActiontype;
  payload: any;
}
interface Allbank {
  bankName: string,
  code: string,
  bankId: string,
  bankAccNo: string,
}
export const getAllbanks = () => {
  return async (dispatch) => {
    const isUploading: allbankActionInterface = {
      type: allbankActiontype.LOADING_ALLBANK,
      payload: null,
    };

    dispatch(isUploading);
    try {
      const allbank = await axios.get(`${urlApi}allbank`);
      const { status, allbanks } = allbank.data;
      if (status === 200 || status === 201) {
        const isUploadingSuccess: allbankActionInterface = {
          type: allbankActiontype.LOADING_ALLBANK_SUCCESS,
          payload: allbanks,
        };
        dispatch(isUploadingSuccess);
      } else {
        const payload = { status };
        const isUploadingError: allbankActionInterface = {
          type: allbankActiontype.LOADING_ALLBANK_ERROR,
          payload: payload,
        };
        dispatch(isUploadingError);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
