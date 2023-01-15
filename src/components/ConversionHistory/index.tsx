import React, { Dispatch, useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RemoveRedEye, DeleteForever } from '@mui/icons-material';
import { useNavigate } from 'react-router';

import { HistoryRecord, HistoryState } from '../../store';
import { removeHistory } from '../../store/actionCreators';

const ConversionHistory = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();

  const historyResults: readonly HistoryRecord[] = useSelector(
    (state: HistoryState) => state.historyRecords,
    shallowEqual,
  );

  const [hoveringRow, setHoveringRow] = useState<number | undefined>();

  const view = (historyRecord: HistoryRecord) => {
    navigate(`/?from=${historyRecord.from}&to=${historyRecord.to}&amount=${historyRecord.amount}`);
  };

  const deleteHistory = (historyRecord: HistoryRecord) => {
    dispatch(removeHistory(historyRecord));
  };

  return (
    <Grid container alignItems='center' justifyContent='baseline' spacing={2}>
      <Grid item xs={12} mb={4}>
        <Typography variant='h1'>Conversion history</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='h4'>Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h4'>Event</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h4'>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyResults.map((record: HistoryRecord, index: number) => (
                <TableRow
                  hover
                  onMouseEnter={() => {
                    setHoveringRow(record.id);
                  }}
                  onMouseLeave={() => {
                    setHoveringRow(undefined);
                  }}
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{record.datetime}</TableCell>
                  <TableCell>{`Converted an amount of ${record.amount} from ${record.from} to ${record.to}`}</TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid
                        sx={{ visibility: hoveringRow === record.id ? 'visible' : 'hidden' }}
                        item
                        xs={6}
                      >
                        <Button onClick={() => view(record)} sx={{ textTransform: 'none' }}>
                          <RemoveRedEye sx={{ mr: 1 }} /> View
                        </Button>
                      </Grid>
                      <Grid
                        sx={{ visibility: hoveringRow === record.id ? 'visible' : 'hidden' }}
                        item
                        xs={6}
                      >
                        <Button
                          onClick={() => deleteHistory(record)}
                          color='error'
                          sx={{ textTransform: 'none' }}
                        >
                          <DeleteForever sx={{ mr: 1 }} /> Delete from history
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ConversionHistory;
