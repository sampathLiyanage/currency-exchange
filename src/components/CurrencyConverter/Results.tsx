import { Grid } from '@mui/material';
import React from 'react';
import { ConvertResult } from '../../services/currency.service';

interface ResultsProps {
  results: ConvertResult;
}

const Results = ({ results }: ResultsProps) => {
  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid
        item
        xs={12}
      >{`${results.amount} ${results.from} = ${results.value} ${results.to}`}</Grid>
      <Grid item xs={12}>{`1 ${results.from} = ${results.rate} ${results.to}`}</Grid>
      <Grid item xs={12}>{`1 ${results.to} = ${results.oppositeRate} ${results.from}`}</Grid>
    </Grid>
  );
};

export default Results;
