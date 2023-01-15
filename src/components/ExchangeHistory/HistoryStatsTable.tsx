import React from 'react';
import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Typography,
} from '@mui/material';

interface HistoryStatsTableProps {
  lowest: number;
  highest: number;
  average: number;
}

const HistoryStatsTable = (props: HistoryStatsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography component='span' variant='h4'>
                Statistics
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>Lowest</TableCell>
            <TableCell>{props.lowest}</TableCell>
          </TableRow>
          <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>Highest</TableCell>
            <TableCell>{props.highest}</TableCell>
          </TableRow>
          <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>Average</TableCell>
            <TableCell>{props.average}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryStatsTable;
