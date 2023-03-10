import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ConvertResult } from '../../services/currency.service';

interface ResultsProps {
  results: ConvertResult;
}

const Results = ({ results }: ResultsProps) => {
  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item xs={12} textAlign='center' mb={2}>
        <Typography data-testid='result_from' component='span' variant='h2' display='inline'>
          {`${results.amount} ${results.from} = `}
        </Typography>
        <Typography
          data-testid='result_to'
          component='span'
          variant='h3'
          color='secondary'
          display='inline'
        >
          {`${results.value} ${results.to}`}
        </Typography>
      </Grid>
      <Grid
        data-testid='rate_from'
        item
        xs={12}
        textAlign='center'
      >{`1 ${results.from} = ${results.rate} ${results.to}`}</Grid>
      <Grid
        data-testid='rate_to'
        item
        xs={12}
        textAlign='center'
      >{`1 ${results.to} = ${results.oppositeRate} ${results.from}`}</Grid>
    </Grid>
  );
};

export default Results;
