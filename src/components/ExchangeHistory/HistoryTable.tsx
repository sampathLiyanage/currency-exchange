import React from 'react';
import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from '@mui/material';

interface HistoryTableProps {
  data: { [key: string]: string };
}

const HistoryTable = ({ data }: HistoryTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Exchange rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data)
            .reverse()
            .map((key) => (
              <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{key}</TableCell>
                <TableCell>{data[key]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;