import * as actionTypes from './actionTypes';

export function addHistory(historyRecord: HistoryRecord) {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: actionTypes.ADD_HISTORY,
      payload: historyRecord,
    });
  };
}

export function removeHistory(historyRecord: HistoryRecord) {
  return (dispatch: DispatchType) => {
    dispatch({
      type: actionTypes.REMOVE_HISTORY,
      payload: historyRecord,
    });
  };
}
