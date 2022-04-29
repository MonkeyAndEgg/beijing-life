import { BusinessEvent } from "../../src/hooks/useBusinessEvent";
import * as t from '../types';

export interface EventState {
  businessEvent: BusinessEvent
}

const initalState: EventState = {
  businessEvent: undefined
}

const events = (state = initalState, action) => {
  switch(action.type) {
    case t.SET_BUSINESS_EVENT:
      return {
        ...state,
        businessEvent: action.payload
      };
    default:
      return { ...state };
  }
};

export default events;