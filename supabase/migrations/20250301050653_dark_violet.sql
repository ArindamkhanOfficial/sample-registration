-- Create the registration database
CREATE DATABASE IF NOT EXISTS registration_db;

-- Switch to the registration database
USE registration_db;

-- Create the users table
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on the email field for faster lookups
CREATE INDEX idx_email ON user(email);

-- Optional: Create a sample user for testing
-- INSERT INTO user (name, email, phone, city) VALUES ('Test User', 'test@example.com', '123-456-7890', 'Test City');

-- Show the table structure
DESCRIBE user;