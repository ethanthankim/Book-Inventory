import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import dayjs from 'dayjs';

import TextInput from './TextInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


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
            console.log('Book added successfully:', response.data);
            clearInputs();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    /* Handler Functions */

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted', book);
        addBook();
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(name, value, e);
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
                <Box className='inputs'>
                    <TextInput
                        name='title' 
                        label='Title'
                        change={handleChange}
                        value={book.title}/>
                    <TextInput
                        name='author' 
                        label='Author'
                        change={handleChange}
                        value={book.author}/>
                    <SelectInput
                        options={genres}
                        label='Genre'
                        value={book.genre}
                        change={handleSelect} />
                    <DateInput
                        change={handleDate}
                        label='Publication Date' />
                    <TextInput
                        name='isbn'
                        label='ISBN'
                        change={handleChange}
                        value={book.isbn} />
                </Box>
                <Box className='inputs'>
                    <Button type='submit' variant='contained'>
                        Add Book
                    </Button>
                    <Button onClick={clearInputs} variant='outlined'>
                        Clear
                    </Button>
                </Box>
            </Box>
        </div>
    );
};
export default AddBookForm;