import React from 'react'
import { TextField } from '@mui/material'

const TextInput = (props) => {
    /*
        props = {
            name
            label
            change
            value
        }
    */
    return (
        <TextField 
            className='input-field'
            name={props.name} 
            label={props.label}
            onChange={props.change} 
            variant='outlined'
            value={props.value} 
        />
    )
}

export default TextInput