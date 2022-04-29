import { BusinessEvent } from '../../src/hooks/useBusinessEvent';
import * as t from '../types';

export const setMarketItems = (businessEvent: BusinessEvent) => ({
  type: t.SET_BUSINESS_EVENT,
  payload: businessEvent
});
