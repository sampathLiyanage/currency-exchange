import React from 'react';
import { FormControl, InputLabel, MenuItem, Select as MUISelect } from '@mui/material';

interface SelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
};

const Select = (props: SelectProps) => {
    return (
      <FormControl fullWidth variant="standard">
        <InputLabel>{props.label}</InputLabel>
        <MUISelect
          value={props.value}
          onChange={event => props.onChange(event.target.value)}
        >
          <MenuItem key={-1} value={'0'}>-- Select --</MenuItem>
          {
            props.options.map((option: string, index: number) => (<MenuItem key={index} value={option}>{option}</MenuItem>))
          }
        </MUISelect> 
      </FormControl>
    );
};

export default Select;
