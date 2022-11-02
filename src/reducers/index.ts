import { combineReducers } from "redux";
import listReducer from "../store/listReducer";

export const reducer = combineReducers({
  lists: listReducer,
});

export type IState = ReturnType<typeof reducer>;
