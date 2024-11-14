import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateInput = (props) => {
    /*
        props = {
            value
            change
            label
            required
        }
    */
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                className='input-field'
                value={props.value || null}
                onChange={props.change}
                required={props.required}
                label={props.label} />
        </LocalizationProvider>
    )
}

export default DateInput