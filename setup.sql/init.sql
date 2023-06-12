CREATE DATABASE IF NOT EXISTS todoapp;

USE todoapp;

CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  deadline DATE NOT NULL,
  notes TEXT,
  priority ENUM('high', 'medium', 'low') NOT NULL,
  username VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('todo', 'inprogress', 'completed') DEFAULT 'todo' NOT NULL
);