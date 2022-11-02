import { createStore } from "redux";
import { reducer as rootReducer } from "../reducers";

const store = createStore(rootReducer);

export default store;
