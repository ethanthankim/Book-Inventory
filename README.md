
## Book Inventory Management

This project allows you to manage a book inventory with the ability to add books, search, and filter books by various criteria such as title, author, genre, and publication date.

Project Structure

- **`server/`**: Contains the backend API built with Express and MySQL.
- **`client/`**: Contains the frontend built with React.

Prerequisites

Before running the project, ensure you have the following installed:
- **Node.js** (version 14 or higher)  https://nodejs.org/en/download/ 
- **MySQL** (or any compatible relational database), https://dev.mysql.com/downloads/installer/ 

## Setup Instructions

### Backend Setup (Server)

1.	Clone this repository to your local machine.

2.	Navigate to the `server/` folder:
   	```bash
   	cd server
   	```
3.	Create a .env file in the server folder to store your database credentials. The file should look like this:
    ```env
    DB_HOST=localhost 
    DB_USER=root 
    DB_PASSWORD=**YourDatabasePassword**
    DB_NAME=book_inventory
    ```

**Important:** Do not commit your `.env` file to GitHub or any public repository. Add it to your `.gitignore` file to ensure your database credentials are not exposed.

4.	**Install dependencies**:
  	 Run the following command to install required dependencies:
   	```bash
   	npm install
   	```
5.	**Database Setup**:
   	Ensure MySQL is installed and running on your machine.
    Create a database named `book_inventory` (or change the database name in the `server/index.js` file if preferred. If you want to change the database name, you can modify the `DB_NAME` variable in `server/config.js` or wherever your database connection is configured).

    Run the following SQL query to create the `Books` table in the `book_inventory` database:
      	
    ```sql
    CREATE TABLE Books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      genre VARCHAR(100),
      publication_date DATE,
      isbn VARCHAR(20) UNIQUE NOT NULL
    );
    ```

6.	**Start the Backend Server**:
   	Run the following command to start the backend server with `nodemon`:
   	```bash
  	npm start
   	```
   	This will run the server on `http://localhost:5001`.

### Frontend Setup (Client)

1.	**Navigate to the `client/` folder**:
   	```bash
   	cd client
   	```

2.	**Install dependencies**:
    Run the following command to install required dependencies:
    ```bash
    npm install
    ```

3.	**Start the Frontend React Application**:
    Run the following command to start the React development server:
    ```bash
    npm start
    ```
    This will run the frontend on `http://localhost:3000`.

### Testing the API

1. **Test Database Connection**:
   To check if the backend is correctly connected to the database, visit:
   ```
   http://localhost:5001/test-db
   ```
   This should return data from the `Books` table (or an empty result if the table is empty).


### Common Issues

1. **CORS Errors**:
   - If you encounter CORS errors when the frontend makes API requests to the backend, ensure the backend is running on a different port (e.g., 5001 for the backend and 3000 for the frontend). The backend is configured to use `cors()` middleware, which allows cross-origin requests.

2. **Database Connection Issues**:
   - If there are issues connecting to MySQL, double-check the database credentials and ensure the MySQL service is running on your machine.

3. **Unresolved Dependencies**:
   - If dependencies are missing, run `npm install` both in the `client/` and `server/` folders to make sure all dependencies are correctly installed.

## License

This project is open source and available under the MIT License.

