import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

export interface HistoryRecord {
  id?: number;
  datetime?: string;
  amount: number;
  from: string;
  to: string;
}

export type HistoryAction = {
  type: string;
  payload: HistoryRecord;
};

export type HistoryState = {
  historyRecords: HistoryRecord[];
};

export type DispatchType = (args: HistoryAction) => HistoryAction;

const store: Store<HistoryState, HistoryAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

export default store;
