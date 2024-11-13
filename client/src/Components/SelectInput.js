import React from 'react';

import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SelectInput = (props) => {
    /*
        props = {
            options
            label
            value
            change
        }
    */
    const options = props.options;
    
    return (
        <Box className='input-field'>
            <FormControl fullWidth>
                <InputLabel>{props.label}</InputLabel>
                <Select
                    value={props.value}
                    label={props.label}
                    onChange={props.change}
                >
                    <MenuItem key='None' value=''>--None--</MenuItem>
                    {options.map((option)=> (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectInput