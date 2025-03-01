# Registration Form Backend

This is a Flask backend for the registration form application.

## Setup Instructions

1. Install MySQL if not already installed
2. Create a database named `registration_db`:
   ```sql
   CREATE DATABASE registration_db;
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Update the database connection string in `app.py` if needed:
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/registration_db'
   ```
5. Run the Flask application:
   ```bash
   python app.py
   ```

The server will start on http://localhost:5000