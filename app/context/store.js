import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";
import Reducers from "./reducers";

let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

/* export interface State {
    tick: string;
}
 */
const makeStore = () => createStore(Reducers, applyMiddleware(...middleware));
export const wrapper = createWrapper(makeStore, { debug: true });
