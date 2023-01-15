import * as actionTypes from './actionTypes';
import { HistoryRecord, DispatchType } from '.';

export const addHistory = (historyRecord: HistoryRecord) => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: actionTypes.CONVERT,
      payload: historyRecord,
    });
  };
};

export const removeHistory = (historyRecord: HistoryRecord) => {
  return (dispatch: DispatchType) => {
    dispatch({
      type: actionTypes.REMOVE_HISTORY,
      payload: historyRecord,
    });
  };
};
