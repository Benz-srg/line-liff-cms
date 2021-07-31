import { roleActionType } from "../actions/role.action";
import { HYDRATE } from "next-redux-wrapper";

interface roleState {
  roles: [];
  isLoading: boolean;
  isError: boolean;
  isMessage: string;
  isStatus: number;
}

const initialState: roleState = {
  roles: [],
  isLoading: false,
  isError: false,
  isMessage: null,
  isStatus: 0,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.roleReducer };
    case roleActionType.LOADING_ROLE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        roles: [],
      };
    case roleActionType.LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        roles: action.payload,
      };
    case roleActionType.UPLOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        roles: action.payload.roles,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
      };
    case roleActionType.UPLOADING_ROLE:
      return {
        ...state,
        isLoading: true,
        isError: false,
        roles: state.roles,
      };
    case roleActionType.UPLOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        roles: state.roles,
        isStatus: action.payload.status,
        isMessage: action.payload.message,
      };
    default:
      return state;
  }
};

export default roleReducer;
