import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateInput = (props) => {
    /*
        props = {
            change
            label
        }
    */
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer 
                sx={{padding: 0}} 
                components={['DatePicker']}
            >
                <DatePicker 
                    className='input-field'
                    onChange={props.change}
                    required
                    label={props.label} />
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default DateInput