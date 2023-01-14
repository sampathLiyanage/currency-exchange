import React, { useState, SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import { TabPanel } from './components/Tabs';
import Grid from '@mui/material/Grid';
import { CurrencyConverter } from './components/CurrencyConverter';

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
    <>
      <Grid container sx={{ backgroundColor: 'white' }}>
        <Grid container xs={3} alignItems='center' justifyContent='center'>
          <CurrencyExchangeIcon sx={{ mr: 1 }} /> Currency Exchange
        </Grid>
        <Grid item xs={6}>
          <Tabs centered value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Currency Converter' {...getTabProps(0)} />
            <Tab label='View Conversion History' {...getTabProps(1)} />
          </Tabs>
        </Grid>
        <Grid container alignItems='center' justifyContent='center' xs={3}>
          Logout
        </Grid>
      </Grid>
      <TabPanel value={value} index={0}>
        <CurrencyConverter />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </>
  );
};

export default App;
