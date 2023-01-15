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
import { format, parseISO } from 'date-fns';

interface HistoryTableProps {
  data: { [key: string]: string };
}

const HistoryTable = ({ data }: HistoryTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography component='span' variant='h4'>
                Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component='span' variant='h4'>
                Exchange rate
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data)
            .reverse()
            .map((key) => (
              <TableRow hover key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{format(parseISO(key), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{data[key]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
