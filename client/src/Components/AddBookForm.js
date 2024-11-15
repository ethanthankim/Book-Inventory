import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import dayjs from 'dayjs';

import TextInput from './TextInput';
// import SelectInput from './SelectInput';
import DateInput from './DateInput';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Autocomplete, TextField, Typography } from '@mui/material';
import {Dialog, DialogContent, DialogActions } from '@mui/material';


const AddBookForm = () => {
    const path = 'http://localhost:5001'
    const [book, setBook] = useState({
        title:'',
        author:'',
        genre:'',
        date:'',
        isbn:''
    });
    const [genres, setGenres] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);

    // just need a state variable to change any time a new book is added so it calls fetchGenres again
    const [updateGenres, setUpdateGenres] = useState(true);

    /* API Calls */
    /*
        Get list of distinct genres to be used as menu select options.
        When a new book is added, fetchGenres is called again to update the list
        TODO: The same fetchGenres is defined in both forms so maybe they can just be passed in by ViewForm?
    */
    useEffect(() => {
        console.log("Generating genres");
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${path}/genres`);
                const genreArray = response.data.map((item) => item.Genre);
                setGenres(genreArray);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, [updateGenres]);

    const addBook = async () => {
        try {
            const response = await axios.post(`${path}/addBook`, {
                title: book.title,
                author: book.author,
                genre: book.genre,
                publication_date: book.date,
                isbn: book.isbn
            });
            setMessage(response.data);
            setError(false);
            console.log('Book added successfully:', response.data);
            clearInputs();
            setUpdateGenres(!updateGenres);
        } catch (error) {
            console.error('Error adding book:', error);
            setMessage(error.response.data);
            setError(true);
        } finally {
            setOpen(true);
        }
    };

    /* Handler Functions */

    const handleSubmit = (e) => {
        console.log(book)
        e.preventDefault();
        if (!book.title || !book.author || !book.genre || !book.date || !book.isbn) {
            setMessage('Missing one or more required fields.');
            setError(true);
            setOpen(true);
            return;
        }

        console.log('Submitted', book);
        addBook();
    }
    const handleChange = (e) => {
        if (!e || !e.target) return;
        const {name, value} = e.target
        setBook({
            ...book,
            [name]: value
        })
    };
    const handleSelect = (value) => {
        setBook({
            ...book,
            genre: value
        })
    };
    const handleDate = (date) => {
        const formattedDate = dayjs(date.$d).format('YYYY-MM-DD');
        setBook({
            ...book,
            date: formattedDate
        })
    };
    const handleClose = () => {
        setOpen(false);
    }
    const clearInputs = () => {
        setBook({
            title:'',
            author:'',
            genre:'',
            date:'',
            isbn:''
        })
        console.log(book);
    }
    
    return (
        <div>
            <Box
                component='form'
                autoComplete='off'
                noValidate
                onSubmit={handleSubmit}
                className='inputs-bar'
            >
                <Grid 
                    container 
                    spacing={2} 
                    className='inputs'
                >
                    <Grid size={6}>
                        <TextInput
                            name='title' 
                            label='Title'
                            required={true}
                            change={handleChange}
                            value={book.title}/>
                    </Grid>
                    <Grid size={6}>
                        <TextInput
                            name='author' 
                            label='Author'
                            required={true}
                            change={handleChange}
                            value={book.author}/>
                    </Grid>
                    <Grid size={4}>
                        {/* <SelectInput
                            options={genres}
                            label='Genre'
                            required={true}
                            value={book.genre}
                            change={handleSelect} /> */}
                        <Autocomplete
                            options={genres}
                            autoSelect
                            freeSolo
                            name='genre'
                            value={book.genre}
                            onChange={(e,value) => handleSelect(value)}
                            onInputChange={handleChange}
                            renderInput={(params) => (
                                <TextField {...params} required label='Genre' name='genre'/>
                            )}
                        />
                    </Grid>
                    <Grid size={4}>
                        <DateInput
                            change={handleDate}
                            required={true}
                            value={book.date ? dayjs(book.date) : null}
                            label='Publication Date' />
                    </Grid>
                    <Grid size={4}>
                        <TextInput
                            name='isbn'
                            label='ISBN'
                            required={true}
                            change={handleChange}
                            value={book.isbn} />
                    </Grid>
                </Grid>
                <Box className='submit-buttons'>
                    <Button className='submit-btn' type='submit' variant='contained'>
                        Add Book
                    </Button>
                    <Button className='submit-btn' onClick={clearInputs} variant='outlined'>
                        Clear
                    </Button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <Typography color={error ? 'error' : 'primary'} variant="body1">
                            {message}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
};
export default AddBookForm;