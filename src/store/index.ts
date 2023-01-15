import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

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

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
