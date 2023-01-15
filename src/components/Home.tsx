import React, { SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { ThemeProvider } from '@emotion/react';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

import theme from '../theme';
import { TabPanel } from './Tabs';
import { CurrencyConverter } from './CurrencyConverter';
import { useNavigate } from 'react-router-dom';
import ConversionHistory from './ConversionHistory';

interface HomeProps {
  tab?: number;
}

const Home = ({ tab = 0 }: HomeProps) => {
  const navigate = useNavigate();

  const getTabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    if (newValue === 1) {
      navigate('/history');
    } else {
      navigate('/');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        sx={{ backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 1000 }}
      >
        <Grid container>
          <Grid item xs={12} sm={3} display='flex' alignItems='center' justifyContent='center'>
            <Grid
              item
              sx={{ mt: { xs: 2, sm: 0 } }}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <CurrencyExchangeIcon sx={{ mr: 1 }} /> Currency Exchange
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tabs centered value={tab} onChange={handleChange}>
              <Tab wrapped label='Currency Converter' {...getTabProps(0)} />
              <Tab wrapped label='View Conversion History' {...getTabProps(1)} />
            </Tabs>
          </Grid>
          <Grid
            item
            alignItems='center'
            justifyContent='center'
            sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'flex' } }}
            xs={3}
          >
            LOGOUT
          </Grid>
        </Grid>
      </Paper>

      <TabPanel value={tab} index={0}>
        <CurrencyConverter />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ConversionHistory />
      </TabPanel>
    </ThemeProvider>
  );
};

export default Home;
