import { combineReducers } from "redux";
import market from "./market";
import user from "./user";
import events from './events';

const rootReducer = combineReducers({
  user: user,
  market: market,
  events: events,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;