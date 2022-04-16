import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const initalState = {};

export const store = createStore(rootReducer, initalState);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);