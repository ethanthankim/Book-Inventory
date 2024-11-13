import React, { useEffect, useState } from 'react';
import '../App.css';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

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
    
    /* Handler Functions */
    const handleChange = (e) => {
        const {name, value} = e.target
        setFilters({
            ...filters,
            [name]: value
        })
    };
    const handleSelect = (e) => {
        setFilters({
            ...filters,
            genre: e.target.value
        })
    };
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
    function createHeading(name, label, justify) {
        return {
            'name': name,
            'label': label,
            'justify': justify
        }
    }
    
    const headings = [
        createHeading('title', 'Title', 'left'),
        createHeading('author','Author', 'right'),
        createHeading('genre','Genre','right'),
        createHeading('publication_date','Publication Date', 'right'),
        createHeading('isbn','ISBN','right')
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
                    <TextInput
                        name={headings[0].heading}
                        label={headings[0].label}
                        change={handleChange}
                        value={filters.title} />
                    <TextInput
                        name={headings[1].heading}
                        label={headings[1].label}
                        change={handleChange}
                        value={filters.author} />
                    <SelectInput
                        options={genres}
                        label={headings[2].label}
                        change={handleSelect}
                        value={filters.genre}
                    />
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
                                    <TableCell key={e.name} align={e.justify}>
                                        <Button onClick={() => sortBy(`${e.name}`)}>
                                            <TableSortLabel
                                                active={orderBy === e.name && orderBy !== ''}
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
