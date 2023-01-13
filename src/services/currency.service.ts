import axios from 'axios';

export interface ConvertResult {
    from: string,
    to: string,
    amount: number,
    rate: number,
    oppositeRate: number,
    value: number
};

export const fetchAllSymbols = async () : Promise<string[]> => {
    const res =  await axios.get('https://api.exchangerate.host/symbols');
    return Object.keys(res.data.symbols);
};

export const convert = async (from: string, to: string, amount: number) : Promise<ConvertResult> => {
    const res = await Promise.all([
        axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}`),
        axios.get(`https://api.exchangerate.host/convert?from=${to}&to=${from}`)
    ]);
    return {
        from,
        to,
        amount,
        rate: res[0].data.result,
        oppositeRate: res[1].data.result,
        value: +(res[0].data.result * amount).toFixed(6)
    }
}