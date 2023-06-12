import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
const port = 3000;
const secretKey = 'mysecretkey';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const db = mysql.createPool({
  host: 'mysql_db',
  user: 'admin',
  password: 'admin',
  database: 'todoapp' 
})




app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUsernameQuery, [username], (err, usernameResult) => {
    if (err) {
      console.error('Error while checking username:', err);
      res.status(500).send('An error occurred while checking the username.');
      return;
    }

    if (usernameResult.length > 0) {
      res.status(409).send('Username is already taken.');
      return;
    }

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, emailResult) => {
      if (err) {
        console.error('Error while checking email:', err);
        res.status(500).send('An error occurred while checking the email.');
        return;
      }

      if (emailResult.length > 0) {
        res.status(409).send('Email is already taken.');
        return;
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error while hashing the password:', err);
          res.status(500).send('An error occurred while hashing the password.');
          return;
        }

        const insertUserQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [username, hash, email], (err, result) => {
          if (err) {
            console.error('Error while inserting the user:', err);
            res.status(500).send('An error occurred while registering the user.');
            return;
          }

          res.send('Registration successful');
        });
      });
    });
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.status(401).send('Invalid username or password');
    } else {
      bcrypt.compare(password, result[0].password, (err, bcryptResult) => {
        if (err) throw err;

        if (bcryptResult) {
          const token = jwt.sign({ username: result[0].username }, secretKey);
          const expiresIn = 3600; 
          const response = {
            token,
            expiresIn,
            tokenType: 'Bearer',
            authState: {
              username: result[0].username,
            },
          };

          res.cookie('token', token, { httpOnly: true });

          res.json(response);
        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    }
  });
});


// Add Task
app.post('/addTask', (req, res) => {
  const { taskName, deadline, notes, priority, username } = req.body;
  const dateObject = new Date(deadline);
  const dateValue = dateObject.toISOString().split('T')[0];

  const query = `INSERT INTO tasks (taskName, deadline, notes, priority, username)
                 VALUES (?, ?, ?, ?, ?)`;
  const values = [taskName, dateValue, notes, priority, username];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error while adding a task:', error);
      res.status(500).send('An error occurred while adding a task');
    } else {
      res.status(201).json({ message: 'Task added successfully' });
    }
  });
});




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



  

