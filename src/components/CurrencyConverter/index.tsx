import React, { useEffect, useState, useCallback } from 'react';
import { Button, Grid, TextField, Divider, Typography } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { fetchAllSymbols, convert, ConvertResult } from '../../services/currency.service';
import Select, { SelectOption } from '../Select';
import Results from './Results';
import ExchangeHistory from '../ExchangeHistory';

export const CurrencyConverter = () => {
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

  const handleAmount = (value: string): void => {
    const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (validated) {
      setAmount(value);
    }
  };

  const swap = (): void => {
    const nextTo = from;
    setFrom(to);
    setTo(nextTo);
  };

  const handleConvert = async (): Promise<void> => {
    setResults(await convert(from, to, +amount));
  };

  return (
    <>
      <Grid container alignItems='center' justifyContent='baseline'>
        <Typography variant='h1' mt={2} mb={4}>
          I want to convert
        </Typography>
      </Grid>
      <Grid container alignItems='center' justifyContent='baseline' spacing={2} mb={6}>
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
          <Button
            fullWidth
            variant='contained'
            style={{ color: '#404040', backgroundColor: '#ffffff' }}
            onClick={() => swap()}
          >
            <CompareArrowsIcon />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Select value={to} label={'To'} options={symbols} onChange={(val) => setTo(val)} />
        </Grid>
        <Grid item xs={1}>
          <Button
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
