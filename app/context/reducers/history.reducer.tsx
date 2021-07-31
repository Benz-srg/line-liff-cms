import { historiesActiontype } from "@/actions/history.action";

interface Histories {
  isLoading: boolean;
  isError: boolean;
  histories: any[];
  message: string;
  status: number;
}

const initalState: Histories = {
  isLoading: false,
  isError: false,
  histories: [],
  message: null,
  status: 0,
};

const historiesReducer = (state = initalState, action) => {
  switch (action.type) {
    case historiesActiontype.LOADING_HISTORIES:
      return {
        ...state,
        isLoading: true,
        isError: false,
        histories: state.histories,
      };

    case historiesActiontype.LOADING_HISTORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        histories: [],
      };

    case historiesActiontype.LOADING_HISTORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        histories: action.payload,
      };

    case historiesActiontype.UPLOADING_HISTORIES:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: null,
        status: 0,
        histories: state.histories,
      };

    case historiesActiontype.UPLOADING_HISTORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        histories: state.histories,
        message: action.payload.message,
        status: action.payload.status,
      };

    case historiesActiontype.UPLOADING_HISTORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload.message,
        status: action.payload.status,
        histories: action.payload.history,
      };

    default:
      return state;
  }
};

export default historiesReducer;
