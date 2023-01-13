import React, { useEffect, useState, useCallback } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { fetchAllSymbols, convert, ConvertResult } from '../services/currency.service';
import Select from './Select';

export const CurrencyConverter = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [from, setFrom] = useState<string>('0');
  const [to, setTo] = useState<string>('0');
  const [results, setResults] = useState<ConvertResult | null>(null);

  const loadSymbols = useCallback(async () : Promise<void> => {
    const symbols = await fetchAllSymbols();
    setSymbols(symbols);
  }, []);

  const isDisabled = () : boolean => {
    return !amount || from === '0' || to === '0';
  }

  useEffect(() => {
    loadSymbols();
  }, [loadSymbols]);

  const handleAmount = (value: string) : void => {
    const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (validated) {
       setAmount(value);
    }
  };

  const swap = () : void => {
    const nextTo = from;
    setFrom(to);
    setTo(nextTo);
  };

  const handleConvert = async () : Promise<void> => {
    setResults(await convert(from, to, +amount));
  };

  return (
    <>
      <Grid container alignItems='center' justifyContent='baseline'>
        I Want to Convert
      </Grid>
      <Grid container alignItems='center' justifyContent='baseline' spacing={2}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label='Amount'
            type='number'
            variant='standard'
            value={amount}
            InputProps={{
              inputProps: { min: 0, step: '.01', pattern: '^\\d*(\\.\\d{0,2})?$' },
            }}
            onChange={(event) => handleAmount(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Select value={from} label={'From'} options={symbols} onChange={(val) => setFrom(val)} />
        </Grid>
        <Grid item xs={1}>

            <Button fullWidth variant="outlined" onClick={() => swap()}><CompareArrowsIcon /></Button>
            
        </Grid>
        <Grid item xs={3}>
          <Select value={to} label={'To'} options={symbols} onChange={(val) => setTo(val)} />
        </Grid>
        <Grid item xs={1}>

            <Button disabled={isDisabled()} variant="contained" onClick={() => handleConvert()}>Convert</Button>
            
        </Grid>
      </Grid>
      {results && <Grid container alignItems='center' justifyContent='center'>
        <Grid item xs={12}>{`${results.amount} ${results.from} = ${results.value} ${results.to}`}</Grid>
        <Grid item xs={12}>{`1 ${results.from} = ${results.rate} ${results.to}`}</Grid>
        <Grid item xs={12}>{`1 ${results.to} = ${results.oppositeRate} ${results.from}`}</Grid>
      </Grid>}
    </>
  );
};
