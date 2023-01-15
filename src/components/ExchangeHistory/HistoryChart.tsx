import React from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Line,
  ResponsiveContainer,
} from 'recharts';

interface HistoryChartProps {
  data: { [key: string]: string };
  lowest: number;
  highest: number;
  average: number;
}

const HistoryChart = (props: HistoryChartProps) => {
  const data = Object.keys(props.data).map((e) => ({ key: e, 'Exchange rate': props.data[e] }));
  return (
    <ResponsiveContainer width='95%' aspect={4}>
      <LineChart data={data} margin={{ left: 50, right: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='key' axisLine={false} />
        <YAxis domain={[Math.max(props.lowest, 0), props.highest]} hide />
        <Tooltip labelFormatter={() => ''} />
        <Line type='monotone' dataKey='Exchange rate' label='Exchange rate' stroke='#8884d8' />
        <ReferenceLine y={props.average} stroke='#94C720' label={`Average: ${props.average}`} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
