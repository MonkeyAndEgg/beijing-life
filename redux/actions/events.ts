import { BusinessEvent } from '../../src/models/businessEvent';
import * as t from '../types';

export const setBusinessEvent = (businessEvent: BusinessEvent) => ({
  type: t.SET_BUSINESS_EVENT,
  payload: businessEvent
});
