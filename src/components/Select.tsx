import React from 'react';
import { FormControl, InputLabel, MenuItem, Select as MUISelect } from '@mui/material';

export interface SelectOption {
  label: string;
  value: string;
};

interface SelectProps {
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    emptyOption?: boolean;
};

const Select = (props: SelectProps) => {
    return (
      <FormControl fullWidth variant="standard">
        <InputLabel>{props.label}</InputLabel>
        <MUISelect
          value={props.value}
          onChange={event => props.onChange(event.target.value)}
        >
          {props.emptyOption !== false && <MenuItem key={-1} value={'0'}>-- Select --</MenuItem>}
          {
            props.options.map((option: SelectOption, index: number) => (<MenuItem key={index} value={option.value}>{option.label}</MenuItem>))
          }
        </MUISelect> 
      </FormControl>
    );
};

export default Select;
