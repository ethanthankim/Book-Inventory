import React, { useEffect, useState } from 'react';
import '../App.css';
import dayjs from 'dayjs';
import axios from 'axios';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';
import AddBookForm from './AddBookForm';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Toolbar, Typography, Tooltip, IconButton} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

const ViewForm = () => {
    const path = 'http://localhost:5001'
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({
        title: "",
        author: "",
        genre: "",
        startDate:'',
        endDate:'',
        isbn:''
    });
    const [genres, setGenres] = useState([]);
    const [ascending, setAscending] = useState(true);
    const [orderBy, setOrderBy] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

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
    const getBooks = async(title, author, genre, start, end, isbn, order, asc) => {
        try {
            const response = await axios.get(`${path}/viewBooks`, {
                params: {title, author, genre, start, end ,isbn, order, asc}
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
    const handleDate = (date, name) => {
        const formattedDate = dayjs(date.$d).format('YYYY-MM-DD');
        setFilters({
            ...filters,
            [name]: formattedDate
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        getBooks(filters.title, filters.author, filters.genre, filters.startDate, filters.endDate, filters.isbn);
    };
    const clearFilters = () => {
        setFilters({
            title:"",
            author:"",
            genre:"",
            startDate:"",
            endDate:"",
            isbn:""
        })
        setOrderBy('');
    }
    const sortBy = (field) => {
        const newOrderBy = field;
        const newAscending = orderBy === field ? !ascending : true;
        
        setOrderBy(newOrderBy);
        setAscending(newAscending);
        
        getBooks(filters.title, filters.author, filters.genre, filters.startDate,
            filters.endDate, filters.isbn, newOrderBy, newAscending);
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
    const exportTable = (type) => {
        // type will be a string of either 'csv' or 'json'
        if (books.length === 0) {
            alert("No Data to export");
            return;
        }
        let content;
        let blob;

        if (type === 'json') {
            content = JSON.stringify(books, null, 2);
            blob = new Blob([content], {type:"application/json"});
        } else {
            const headers = headings.map((h) => h.label);
            const rows = books.map((book) => [
                book.title,
                book.author,
                book.genre,
                book.publication_date.slice(0,10),
                book.isbn
            ]);
            const escapeCSV = (value) => `"${String(value).replace(/"/g, '""')}"`;
    
    
            content = [
                headers.map(escapeCSV).join(","),
                ...rows.map((row) => row.map(escapeCSV).join(","))
            ].join("\n");
            blob = new Blob([content], {type:"text/csv;charset=utf-8"})
        }

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `books.${type}`;
        link.click();
    }   

    return (
        <div className='page'>
            <Paper className="data-table" elevation={8}>
                <Toolbar className='toolbar'>
                    <Typography variant='h4'>Book Inventory</Typography>
                    <Box className='toolbar-icons'>
                        <Tooltip title="Filter">
                        <IconButton onClick={() => {
                            setShowFilters((prev) => {
                                if (!prev && showAddForm) setShowAddForm(false);  // hide AddForm if Filters are being shown
                                return !prev;
                            });
                        }}>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Add Book'>
                            <IconButton onClick={() => {
                                setShowAddForm((prev) => {
                                    if (!prev && showFilters) setShowFilters(false);  // hide Filters if AddForm is being shown
                                    return !prev;
                                });
                            }}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
                {showFilters && (
                    <Box
                    component='form'
                    autoComplete='off'
                    noValidate
                    onSubmit={handleSubmit}
                    className='inputs-bar'
                    >
                        <Grid 
                            container
                            className='inputs'
                            spacing={2}
                        >
                            <Grid size={4}>
                                <TextInput
                                    name={headings[0].name}
                                    label={headings[0].label}
                                    change={handleChange}
                                    value={filters.title} />
                            </Grid>
                            <Grid size={4}>
                                <TextInput
                                    name={headings[1].name}
                                    label={headings[1].label}
                                    change={handleChange}
                                    value={filters.author} />
                            </Grid>
                            <Grid size={4}>
                                <SelectInput
                                    options={genres}
                                    label={headings[2].label}
                                    change={handleSelect}
                                    value={filters.genre}
                                />
                            </Grid>
                            <Grid size={4}>
                                <DateInput
                                    change={(date) => handleDate(date, 'startDate')}
                                    value={filters.startDate ? dayjs(filters.startDate) : null}
                                    label='From' />
                            </Grid>
                            <Grid size={4}>
                                <DateInput
                                    change={(date) => handleDate(date, 'endDate')}
                                    value={filters.endDate ? dayjs(filters.endDate) : null}
                                    label='To' />
                            </Grid>
                            <Grid size={4}>
                                <TextInput
                                    name={headings[4].name}
                                    label={headings[4].label}
                                    change={handleChange}
                                    value={filters.isbn} />
                            </Grid>
                        </Grid>
                        <Box className='submit-buttons'>
                            <Button type='submit' variant='contained'>
                                View Books
                            </Button>
                            <Button onClick={clearFilters} variant='outlined'>
                                Clear Filters
                            </Button>
                        </Box>
                    </Box>
                )}
                {showAddForm && <AddBookForm />}
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
                <Box className='export-container'>
                    <Typography className='export-text'>Export to:</Typography>
                    <Button variant='outlined' onClick={() => exportTable('csv')} className='export'>
                        CSV
                    </Button>
                    <Button variant='outlined' onClick={() => exportTable('json')} className='export'>
                        JSON
                    </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default ViewForm;
