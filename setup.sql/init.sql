CREATE DATABASE IF NOT EXISTS exchio;

USE exchio;

CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);