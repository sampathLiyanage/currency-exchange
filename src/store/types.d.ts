interface HistoryRecord {
  id?: number;
  datetime?: string;
  amount: number;
  from: string;
  to: string;
}

type HistoryAction = {
  type: string;
  payload: HistoryRecord;
};

type HistoryState = {
  historyRecords: HistoryRecord[];
};

type DispatchType = (args: HistoryAction) => HistoryAction;
