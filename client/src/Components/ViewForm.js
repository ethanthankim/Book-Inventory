import React, { useEffect, useState } from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ViewForm = () => {
    const path = 'http://localhost:5001'
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({
        title: "",
        author: "",
        genre: ""
    });
    const [genres, setGenres] = useState([]);
    const [ascending, setAscending] = useState(true);
    const [orderBy, setOrderBy] = useState('');

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
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFilters({
            ...filters,
            [name]: value
        })
    };
    const handleSelect = (e) => {
        console.log('selected', e.target);
        setFilters({
            ...filters,
            genre: e.target.value
        })
    };
    const getBooks = async(title, author, genre, order, asc) => {
        try {
            const response = await axios.get(`${path}/viewBooks`, {
                params: {title, author, genre, order, asc}
            });
            console.log(response.data)
            setBooks(response.data)
        } catch (error) {
            console.log('Error fetching books:', error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getBooks(filters.title, filters.author, filters.genre);
    };
    const clearFilters = () => {
        setFilters({
            title:"",
            author:"",
            genre:""
        })
        setOrderBy('');
    }
    const sortBy = (field) => {
        const newOrderBy = field;
        const newAscending = orderBy === field ? !ascending : true;
        
        setOrderBy(newOrderBy);
        setAscending(newAscending);
        
        // Call getBooks directly with the new order values
        getBooks(filters.title, filters.author, filters.genre, newOrderBy, newAscending);
    };
    
    
    const headings = [
        {
            'heading': 'title',
            'label': 'Title',
            'justify':'left'
        },
        {
            'heading': 'author',
            'label':'Author',
            'justify':'right'
        },
        {
            'heading': 'genre',
            'label':'Genre',
            'justify':'right'
        },
        {
            'heading': 'publication_date',
            'label':'Publication Date',
            'justify':'right'
        },
        {
            'heading': 'isbn',
            'label':'ISBN',
            'justify':'right'
        }
    ]
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
                    <TextField 
                        className='input-field'
                        name='title' 
                        label='Title' 
                        onChange={handleChange} 
                        variant='outlined'
                        value={filters.title} />
                    <TextField 
                        className='input-field'
                        name='author' 
                        label='Author' 
                        onChange={handleChange} 
                        variant='outlined' 
                        value={filters.author} />
                    <Box className='input-field'>
                        <FormControl fullWidth>
                            <InputLabel>Genre</InputLabel>
                            <Select
                                value={filters.genre}
                                label='Genre'
                                onChange={handleSelect}
                            >
                                <MenuItem key='None' value=''>--None--</MenuItem>
                                {genres.map((g)=> (
                                    <MenuItem key={g} value={g}>{g}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box className='inputs'>
                    <Button type='submit' variant='contained'>
                        View Books
                    </Button>
                    <Button onClick={clearFilters} variant='outlined'>
                        Clear Filters
                    </Button>
                </Box>
            </Box>
            <Paper className="data-table" elevation={8}>
                <TableContainer component={Paper} sx={{maxHeight: 400}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {headings.map((e) => (
                                    <TableCell key={e.heading} align={e.justify}>
                                        <Button onClick={() => sortBy(`${e.heading}`)}>
                                            <TableSortLabel
                                                active={orderBy === e.heading && orderBy !== ''}
                                                direction={ascending ? 'asc' : 'desc'}
                                            >
                                                {e.label}
                                            </TableSortLabel>
                                        </Button>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book)=> (
                                <TableRow key={book.id}>
                                    <TableCell component="th" scope="row">
                                        {book.title}
                                    </TableCell>
                                    <TableCell align="right">{book.author}</TableCell>
                                    <TableCell align="right">{book.genre}</TableCell>
                                    <TableCell align="right">{book.publication_date.slice(0,10)}</TableCell>
                                    <TableCell align="right">{book.isbn}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ViewForm;
