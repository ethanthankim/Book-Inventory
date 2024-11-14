import React from 'react'
import { TextField } from '@mui/material'

const TextInput = (props) => {
    /*
        props = {
            name
            label
            change
            value
            required
        }
    */
    return (
        <TextField 
            className='input-field'
            required={props.required || false}
            name={props.name} 
            label={props.label}
            onChange={props.change} 
            variant='outlined'
            value={props.value} 
        />
    )
}

export default TextInput