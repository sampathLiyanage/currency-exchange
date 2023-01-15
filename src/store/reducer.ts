/* eslint-disable no-case-declarations */
import * as actionTypes from './actionTypes';
import { HistoryState, HistoryAction, HistoryRecord } from '.';

const initialState: HistoryState = {
  historyRecords: [],
};

const reducer = (state: HistoryState = initialState, action: HistoryAction): HistoryState => {
  switch (action.type) {
    case actionTypes.CONVERT:
      const newHistoryRecord: HistoryRecord = {
        id: state.historyRecords.length
          ? Math.max(...state.historyRecords.map((e) => e.id ?? 0)) + 1
          : 1,
        datetime: new Date().toUTCString(),
        ...action.payload,
      };
      return {
        ...state,
        historyRecords: [...state.historyRecords, newHistoryRecord],
      };
    case actionTypes.REMOVE_HISTORY:
      const updatedRecords: HistoryRecord[] = state.historyRecords.filter(
        (record) => record.id !== action.payload.id,
      );
      return {
        ...state,
        historyRecords: updatedRecords,
      };
  }
  return state;
};

export default reducer;
