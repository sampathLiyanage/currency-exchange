/* eslint-disable no-case-declarations */
import * as actionTypes from './actionTypes';

const initialState: HistoryState = {
  historyRecords: [],
};

const reducer = (state: HistoryState = initialState, action: HistoryAction): HistoryState => {
  switch (action.type) {
    case actionTypes.ADD_HISTORY:
      const newHistoryRecord: HistoryRecord = {
        id: state.historyRecords.length + 1,
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
