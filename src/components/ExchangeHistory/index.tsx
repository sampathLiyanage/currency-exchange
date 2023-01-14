import { Grid, Typography } from '@mui/material';
import { addMinutes, format, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { fetchHistory, HistoryResult } from '../../services/currency.service';
import Select, { SelectOption } from '../Select';
import HistoryStatsTable from './HistoryStatsTable';
import HistoryTable from './HistoryTable';

interface ExchangeHistoryProps {
  baseCurrency: string;
  targetCurrency: string;
}

const DurationOptions = [
  { label: '7 days', value: '7' },
  { label: '14 days', value: '14' },
  { label: '30 days', value: '30' },
] as SelectOption[];

const ExchangeHistory = (props: ExchangeHistoryProps) => {
  const [duration, setDuration] = useState<string>('7');
  const [history, setHistory] = useState<HistoryResult | null>(null);

  const setHistoryData = async () => {
    const now = new Date();
    const results = await fetchHistory(
      format(subDays(addMinutes(now, now.getTimezoneOffset()), +duration), 'yyyy-MM-dd'),
      format(addMinutes(now, now.getTimezoneOffset()), 'yyyy-MM-dd'),
      props.baseCurrency,
      props.targetCurrency,
    );
    setHistory(results);
  };

  useEffect(() => {
    setHistoryData();
  }, [props.baseCurrency, props.targetCurrency, duration]);

  return (
    <>
      <Grid container alignItems='center' justifyContent='baseline' spacing={2}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Exchange History</Typography>
        </Grid>
        <Grid item xs={3} mb={2}>
          <Select
            value={duration}
            label={'Duration'}
            emptyOption={false}
            options={DurationOptions}
            onChange={(val) => setDuration(val)}
          />
        </Grid>
      </Grid>
      {history && (
        <Grid container justifyContent='baseline' spacing={2}>
          <Grid item xs={6}>
            <HistoryTable data={history ? history.data : {}} />
          </Grid>
          <Grid item xs={6}>
            <HistoryStatsTable
              lowest={history ? history.lowest : 0}
              highest={history ? history.highest : 0}
              average={history ? history.average : 0}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ExchangeHistory;
