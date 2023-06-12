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



// Endpoint for adding a new post
app.post('/posts', (req, res) => {
  const { title, date, content, anonymous, mediaType, addedBy } = req.body;
  const dateObject = new Date(date);
  const dateValue = dateObject.toISOString().split('T')[0];

  const query = `INSERT INTO posts (title, date, content, anonymous, mediaType, addedBy)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [title, dateValue, content, anonymous, mediaType, addedBy];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error while adding a post:', error);
      res.status(500).send('An error occurred while adding the post' );
    } else {
      res.status(201).json({ message: 'Post added successfully' });
    }
  });
});


// Endpoint for deleting a post
app.delete('/posts/:id', (req, res) => {
  const postId = req.params.id;

  const deletePostQuery = 'DELETE FROM posts WHERE id = ?';
  const deleteCommentsQuery = 'DELETE FROM comments WHERE postId = ?';

  db.query(deleteCommentsQuery, postId, (error) => {
    if (error) {
      console.error('Error while deleting comments:', error);
      res.status(500).json({ error: 'An error occurred while deleting the comments' });
      return;
    }

    db.query(deletePostQuery, postId, (error, results) => {
      if (error) {
        console.error('Error while deleting a post:', error);
        res.status(500).json({ error: 'An error occurred while deleting the post' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Post with the specified ID does not exist' });
      } else {
        res.status(200).json({ message: 'Post and associated comments deleted successfully' });
      }
    });
  });
});






// Endpoint for updating a post
app.put('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, date, content, anonymous, mediaType, addedBy } = req.body;

  const query = `UPDATE posts SET title = ?, date = ?, content = ?, anonymous = ?, mediaType = ?, addedBy = ?
                 WHERE id = ?`;
  const values = [title, date, content, anonymous, mediaType, addedBy, postId];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error while updating a post:', error);
      res.status(500).send('An error occurred while updating the post' ); 
    } else if (results.affectedRows === 0) {
      res.status(404).send('Post with the specified ID does not exist');
    } else {
      res.status(200).json({ message: 'Post updated successfully' });
    }
  });
});


app.get('/posts', (req, res) => {
  const query = `
    SELECT
      p.id,
      p.title,
      p.date,
      p.content,
      p.anonymous,
      p.mediaType,
      p.addedBy,
      c.id AS commentId,
      c.postId AS commentPostId,
      c.content AS commentContent,
      c.addedBy AS commentAddedBy,
      c.created_at AS commentCreatedAt
    FROM
      posts p
    LEFT JOIN
      comments c ON p.id = c.postId
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error while getting posts and comments:', error);
      res.status(500).json({ error: 'An error occurred while getting the posts and comments' });
    } else {
      const posts = {};
      results.forEach((row) => {
        const postId = row.id;
        if (!posts[postId]) {
  
          posts[postId] = {
            id: postId,
            title: row.title,
            date: row.date,
            content: row.content,
            anonymous: row.anonymous,
            mediaType: row.mediaType,
            addedBy: row.addedBy,
            comments: [],
          };
        }

        if (row.commentId) {

          posts[postId].comments.push({
            id: row.commentId,
            postId: row.commentPostId,
            content: row.commentContent,
            addedBy: row.commentAddedBy,
            created_at: row.commentCreatedAt,
          });
        }
      });


      const postsArray = Object.values(posts);

      res.status(200).json(postsArray);
    }
  });
});




// Endpoint for getting posts with mediaType "series"
app.get('/posts/series', (req, res) => {
  const query = "SELECT * FROM posts WHERE mediaType = 'series'";

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error while getting series posts:', error);
      res.status(500).json({ error: 'An error occurred while getting the series posts' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint for getting posts with mediaType "movies"
app.get('/posts/movies', (req, res) => {
  const query = "SELECT * FROM posts WHERE mediaType = 'movies'";

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error while getting movies posts:', error);
      res.status(500).json({ error: 'An error occurred while getting the movies posts' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint for getting a post by ID
app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;

  const query = 'SELECT * FROM posts WHERE id = ?';

  db.query(query, postId, (error, results) => {
    if (error) {
      console.error('Error while getting a post:', error);
      res.status(500).json({ error: 'An error occurred while getting the post' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Post with the specified ID does not exist' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});


app.get('/user-role', (req, res) => {
  const { username } = req.query;

  const sqlQuery = `SELECT user_role FROM users WHERE username = '${username}'`;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Błąd podczas pobierania roli użytkownika:', error);
      res.sendStatus(500);
    } else {
      if (results.length > 0) {
        const userRole = results[0].user_role;
        res.json({ userRole });
      } else {
        res.sendStatus(404);
      }
    }
  });
});

app.get('/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const query = 'SELECT * FROM comments WHERE postId = ?';

  db.query(query, [postId], (error, results) => {
    if (error) {
      console.error('Error while getting comments:', error);
      res.status(500).json({ error: 'An error occurred while getting the comments' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint for adding a comment to a post
app.post('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const { content, addedBy } = req.body;

  const query = `INSERT INTO comments (postId, content, addedBy) VALUES (?, ?, ?)`;
  const values = [postId, content, addedBy];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error while adding a comment:', error);
      res.status(500).json({ error: 'An error occurred while adding the comment' });
    } else {
      res.status(201).json({ message: 'Comment added successfully' });
    }
  });
});

// Endpoint for deleting a comment
app.delete('/posts/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;

  const query = 'DELETE FROM comments WHERE id = ?;';
  const values = [commentId, postId];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error while deleting a comment:', error);
      res.status(500).json({ error: 'An error occurred while deleting the comment' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Comment with the specified ID does not exist' });
    } else {
      res.status(200).json({ message: 'Comment deleted successfully' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



  

