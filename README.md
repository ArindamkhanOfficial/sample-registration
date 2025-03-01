# Registration Form Application

A full-stack application with React frontend and Flask backend for user registration.

## Project Structure

- `/src` - React frontend
- `/server` - Flask backend

## Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure MySQL:
   - Install MySQL if not already installed
   - Create a database named `registration_db`
   - Update the database connection string in `app.py` if needed

4. Start the Flask server:
   ```bash
   python app.py
   ```
   or from the project root:
   ```bash
   npm run server
   ```

## Technologies Used

- **Frontend**: React, TailwindCSS, Axios
- **Backend**: Flask, SQLAlchemy
- **Database**: MySQL