import React, { useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import theme from './theme';
import { TabPanel } from './components/Tabs';
import Grid from '@mui/material/Grid';
import { CurrencyConverter } from './components/CurrencyConverter';
import { ThemeProvider } from '@emotion/react';
import { Paper } from '@mui/material';

const App = () => {
  const [value, setValue] = useState(0);

  const getTabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        sx={{ backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 1000 }}
      >
        <Grid container>
          <Grid container xs={3} alignItems='center' justifyContent='center'>
            <CurrencyExchangeIcon sx={{ mr: 1 }} /> Currency Exchange
          </Grid>
          <Grid item xs={6}>
            <Tabs centered value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Currency Converter' {...getTabProps(0)} />
              <Tab label='View Conversion History' {...getTabProps(1)} />
            </Tabs>
          </Grid>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={{ cursor: 'pointer' }}
            xs={3}
          >
            LOGOUT
          </Grid>
        </Grid>
      </Paper>

      <TabPanel value={value} index={0}>
        <CurrencyConverter />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </ThemeProvider>
  );
};

export default App;
