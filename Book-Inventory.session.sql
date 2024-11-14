DROP TABLE Books;
CREATE TABLE Books (
   id INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(255) NOT NULL,
   author VARCHAR(255) NOT NULL,
   genre VARCHAR(50),
   publication_date DATE,
   isbn VARCHAR(20) UNIQUE NOT NULL
);
-- @block
DELETE FROM Books;

-- @block
-- insert 50 books initially for testing
INSERT INTO Books(title, author, genre, publication_date, isbn)
VALUES
   ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', '1960-07-11', '9780061120084'),
   ('1984', 'George Orwell', 'Dystopian', '1949-06-08', '9780451524935'),
   ('Pride and Prejudice', 'Jane Austen', 'Romance', '1813-01-28', '9780141439518'),
   ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', '9780743273565'),
   ('Moby Dick', 'Herman Melville', 'Adventure', '1851-11-14', '9781503280786'),
   ('War and Peace', 'Leo Tolstoy', 'Historical Fiction', '1869-01-01', '9780199232765'),
   ('The Odyssey', 'Homer', 'Epic', '800-01-01', '9780140268867'),
   ('Ulysses', 'James Joyce', 'Fiction', '1922-02-02', '9780199535675'),
   ('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', '1951-07-16', '9780316769488'),
   ('Crime and Punishment', 'Fyodor Dostoevsky', 'Psychological Fiction', '1866-01-01', '9780140449136'),
   ('The Brothers Karamazov', 'Fyodor Dostoevsky', 'Philosophical Fiction', '1880-01-01', '9780374528379'),
   ('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', '1937-09-21', '9780547928227'),
   ('Brave New World', 'Aldous Huxley', 'Science Fiction', '1932-01-01', '9780060850524'),
   ('The Divine Comedy', 'Dante Alighieri', 'Epic', '1320-01-01', '9780142437223'),
   ('Fahrenheit 451', 'Ray Bradbury', 'Dystopian', '1953-10-19', '9781451673319'),
   ('Jane Eyre', 'Charlotte Brontë', 'Romance', '1847-10-16', '9780141441146'),
   ('Wuthering Heights', 'Emily Brontë', 'Gothic', '1847-12-01', '9780141439556'),
   ('The Scarlet Letter', 'Nathaniel Hawthorne', 'Historical Fiction', '1850-03-16', '9780142437261'),
   ('Great Expectations', 'Charles Dickens', 'Fiction', '1861-01-01', '9780141439563'),
   ('Les Misérables', 'Victor Hugo', 'Historical Fiction', '1862-01-01', '9780451419438'),
   ('Anna Karenina', 'Leo Tolstoy', 'Romance', '1877-01-01', '9780143035008'),
   ('Dracula', 'Bram Stoker', 'Gothic', '1897-05-26', '9780486411095'),
   ('The Call of the Wild', 'Jack London', 'Adventure', '1903-01-01', '9780486264721'),
   ('The Picture of Dorian Gray', 'Oscar Wilde', 'Philosophical Fiction', '1890-06-20', '9780141439570'),
   ('Heart of Darkness', 'Joseph Conrad', 'Adventure', '1899-01-01', '9780141441672'),
   ('Madame Bovary', 'Gustave Flaubert', 'Literary Fiction', '1857-01-01', '9780140449129'),
   ('Middlemarch', 'George Eliot', 'Fiction', '1871-01-01', '9780141439549'),
   ('The Count of Monte Cristo', 'Alexandre Dumas', 'Adventure', '1844-08-28', '9780140449266'),
   ('Frankenstein', 'Mary Shelley', 'Science Fiction', '1818-01-01', '9780141439471'),
   ('Don Quixote', 'Miguel de Cervantes', 'Adventure', '1605-01-16', '9780060934347'),
   ('Lolita', 'Vladimir Nabokov', 'Literary Fiction', '1955-01-01', '9780679723165'),
   ('Of Mice and Men', 'John Steinbeck', 'Fiction', '1937-01-01', '9780140177398'),
   ('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 'Magical Realism', '1967-01-01', '9780060883287'),
   ('The Old Man and the Sea', 'Ernest Hemingway', 'Fiction', '1952-09-01', '9780684801223'),
   ('The Catch-22', 'Joseph Heller', 'Satire', '1961-11-10', '9781451626650'),
   ('The Kite Runner', 'Khaled Hosseini', 'Fiction', '2003-05-29', '9781594631931'),
   ('Life of Pi', 'Yann Martel', 'Adventure', '2001-09-11', '9780156027328'),
   ('The Road', 'Cormac McCarthy', 'Dystopian', '2006-09-26', '9780307387899'),
   ('The Hunger Games', 'Suzanne Collins', 'Young Adult', '2008-09-14', '9780439023481'),
   ('The Fault in Our Stars', 'John Green', 'Young Adult', '2012-01-10', '9780525478812'),
   ('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 'Fantasy', '1997-06-26', '9780590353427'),
   ('The Maze Runner', 'James Dashner', 'Science Fiction', '2009-10-06', '9780385737944'),
   ('A Game of Thrones', 'George R.R. Martin', 'Fantasy', '1996-08-06', '9780553103540'),
   ('Ender\'s Game', 'Orson Scott Card', 'Science Fiction', '1985-01-15', '9780812550702'),
   ('Dune', 'Frank Herbert', 'Science Fiction', '1965-08-01', '9780441013593'),
   ('The Shining', 'Stephen King', 'Horror', '1977-01-28', '9780385121675'),
   ('It', 'Stephen King', 'Horror', '1986-09-15', '9780450411437'),
   ('The Da Vinci Code', 'Dan Brown', 'Thriller', '2003-03-18', '9780307474278'),
   ('Angels & Demons', 'Dan Brown', 'Thriller', '2000-05-01', '9780671027360'),
   ('The Alchemist', 'Paulo Coelho', 'Philosophical Fiction', '1988-01-01', '9780062315007'),
   ('A Walk in the Woods', 'Bill Bryson', 'Travel', '1998-05-04', '9780767902526'),
   ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'History', '2015-02-10', '9780062316097'),
   ('The Art of War', 'Sun Tzu', 'Philosophy', '0500-01-01', '9781590302255'),
   ('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', 'Technology', '1999-10-30', '9780201616224'),
   ('Becoming', 'Michelle Obama', 'Biography', '2018-11-13', '9781524763138'),
   ('Pride and Prejudice', 'Jane Austen', 'Romance', '1813-01-28', '9781503290563'),
   ('Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', '2011-10-25', '9780374533557'),
   ('Educated', 'Tara Westover', 'Memoir', '2018-02-20', '9780399590504');

-- Test Queries --
-- @block
SELECT * FROM Books;
-- @block
DELETE FROM Books WHERE id=60;
-- @block
SELECT id, title, author FROM Books
WHERE genre = 'fiction'
ORDER BY author ASC;
-- @block
SELECT id, title, author FROM Books
WHERE title = "The Great Gatsby";
-- @block
SELECT id, title, author FROM Books
WHERE author like "%Scott%";
-- @block
SELECT * FROM Books
WHERE isbn like "%97800%";
-- @block
SELECT * FROM books
WHERE publication_date >= '1990-01-01';

-- @block
-- Make sure books with same isbn cannot be added
INSERT INTO Books(title, author, genre, publication_date, isbn)
VALUES ('Duplicate ISBN Test', 'John Doe', 'Test Genre', '2024-01-01', '9780451524935');
-- @block
-- get list of distinct genres
SELECT DISTINCT Genre FROM Books;

-- @block
-- Make sure books with same author/title can be added
INSERT INTO Books(title, author, genre, publication_date, isbn)
VALUES
   ('Animal Farm', 'George Orwell', 'Satire', '1945-08-17', '9780451526342'),
   ('The Great Gatsby', 'Mary Smith', 'Drama', '2023-07-15', '9781234567890');
-- @block
-- Make sure books with same isbn cannot be added
INSERT INTO Books(title, author, genre, publication_date, isbn)
VALUES ('Duplicate ISBN Test', 'John Doe', 'Test Genre', '2024-01-01', '9780451524935');

