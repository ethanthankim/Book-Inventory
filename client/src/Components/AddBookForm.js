import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import dayjs from 'dayjs';

import TextInput from './TextInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
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

    /* API Calls */
    useEffect(() => {
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
    }, []);
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
        e.preventDefault();
        if (!book.title || !book.author || !book.date || !book.isbn) {
            setMessage('Missing one or more required fields.');
            setError(true);
            setOpen(true);
            return;
        }

        console.log('Submitted', book);
        addBook();
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setBook({
            ...book,
            [name]: value
        })
    };
    const handleSelect = (e) => {
        setBook({
            ...book,
            genre: e.target.value
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
                        <SelectInput
                            options={genres}
                            label='Genre'
                            value={book.genre}
                            change={handleSelect} />
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
                    <Button type='submit' variant='contained'>
                        Add Book
                    </Button>
                    <Button onClick={clearInputs} variant='outlined'>
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