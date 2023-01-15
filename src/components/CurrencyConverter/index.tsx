import React, { useEffect, useState, useCallback } from 'react';
import { Button, Grid, TextField, Divider, Typography } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import { fetchAllSymbols, convert, ConvertResult } from '../../services/currency.service';
import Select, { SelectOption } from '../Select';
import Results from './Results';
import ExchangeHistory from '../ExchangeHistory';
import { addHistory } from '../../store/actionCreators';
import { useSearchParams } from 'react-router-dom';

export const CurrencyConverter = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();

  const [searchParams] = useSearchParams();

  const [symbols, setSymbols] = useState<SelectOption[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [from, setFrom] = useState<string>('0');
  const [to, setTo] = useState<string>('0');
  const [results, setResults] = useState<ConvertResult | null>(null);

  const loadSymbols = useCallback(async (): Promise<void> => {
    const symbols = await fetchAllSymbols();
    setSymbols(symbols.map((symbol) => ({ label: symbol, value: symbol })));
  }, []);

  const isDisabled = (): boolean => {
    return !amount || from === '0' || to === '0';
  };

  useEffect(() => {
    loadSymbols();
  }, [loadSymbols]);

  useEffect(() => {
    if (searchParams.has('from') && searchParams.has('to') && searchParams.has('amount')) {
      setFrom(searchParams.get('from') ?? '0');
      setTo(searchParams.get('to') ?? '0');
      setAmount(searchParams.get('amount') ?? '');
      handleConvert(
        searchParams.get('from') ?? '',
        searchParams.get('to') ?? '',
        searchParams.get('amount') ?? '',
      );
      window.scrollTo(0, 0);
    }
  }, [searchParams]);

  const swap = (): void => {
    const nextTo = from;
    setFrom(to);
    setTo(nextTo);
  };

  const handleConvert = async (fromParam = '', toParam = '', amountParam = ''): Promise<void> => {
    const fromVal = fromParam || from;
    const toVal = toParam || to;
    const amountVal = amountParam || amount;
    setResults(await convert(fromVal, toVal, +amountVal));
    dispatch(addHistory({ from: fromVal, to: toVal, amount: +amountVal }));
  };

  return (
    <>
      <Grid container alignItems='center' justifyContent='baseline'>
        <Typography component='span' variant='h1' sx={{ mt: { xs: 0, sm: 4 } }} mb={4}>
          I want to convert
        </Typography>
      </Grid>
      <Grid container alignItems='center' justifyContent='baseline' spacing={2} mb={6}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label='Amount'
            type='number'
            variant='standard'
            value={amount}
            InputProps={{
              inputProps: { min: 0, step: '.01', pattern: '^\\d*(\\.\\d{0,2})?$' },
            }}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select value={from} label={'From'} options={symbols} onChange={(val) => setFrom(val)} />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button
            fullWidth
            variant='contained'
            style={{ color: '#404040', backgroundColor: '#ffffff' }}
            onClick={() => swap()}
          >
            <CompareArrowsIcon />
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select value={to} label={'To'} options={symbols} onChange={(val) => setTo(val)} />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Button
            fullWidth
            disabled={isDisabled()}
            variant='contained'
            color='primary'
            onClick={() => handleConvert()}
          >
            Convert
          </Button>
        </Grid>
      </Grid>
      {results && (
        <>
          <Results results={results} />
          <Grid item mt={2} mb={2}>
            <Divider />
          </Grid>
          <ExchangeHistory baseCurrency={results.from} targetCurrency={results.to} />
        </>
      )}
    </>
  );
};
