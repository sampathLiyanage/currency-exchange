import axios from 'axios';

export interface ConvertResult {
  from: string;
  to: string;
  amount: number;
  rate: number;
  oppositeRate: number;
  value: number;
}

export interface HistoryResult {
    data: {[key: string]: string};
    lowest: number,
    highest: number,
    average: number
};

export const fetchAllSymbols = async (): Promise<string[]> => {
  const res = await axios.get('https://api.exchangerate.host/symbols');
  return Object.keys(res.data.symbols);
};

export const convert = async (from: string, to: string, amount: number): Promise<ConvertResult> => {
  const res = await Promise.all([
    axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}`),
    axios.get(`https://api.exchangerate.host/convert?from=${to}&to=${from}`),
  ]);
  return {
    from,
    to,
    amount,
    rate: res[0].data.result,
    oppositeRate: res[1].data.result,
    value: +(res[0].data.result * amount).toFixed(6),
  };
};

export const fetchHistory = async (
  fromDate: string,
  toDate: string,
  baseCurrency: string,
  targetCurrency: string,
): Promise<HistoryResult> => {
  const res = await axios.get(
    `https://api.exchangerate.host/timeseries?start_date=${fromDate}&end_date=${toDate}&base=${baseCurrency}&symbols=${targetCurrency}`,
  );
  const rates = res.data.rates;
  const data: {[key: string]: string} = {};
  const values: number[] = [] 
  for (const key in rates) {
    data[key] = rates[key][targetCurrency];
    values.push(rates[key][targetCurrency]);
  }
  return {
    data,
    lowest: Math.min(...values),
    highest: Math.max(...values),
    average: +(values.reduce((a, b) => a + b, 0) / values.length).toFixed(6)
  };
};
