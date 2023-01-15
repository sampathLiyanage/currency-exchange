import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div role='tabpanel' style={{ display: value !== index ? 'none' : '' }}>
      <Box sx={{ p: 3 }}>
        <Typography component='span'>{children}</Typography>
      </Box>
    </div>
  );
};
