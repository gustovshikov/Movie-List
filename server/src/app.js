const {
  getAllMovies,
  postMovies,
  deleteMovieByID,
} = require('./controllers.js');

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('My API is up and running Yo!');
});

app.get('/movies', (req, res) => {
  getAllMovies()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.post('/movies', (req, res) => {
  postMovies(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.delete('/movies/:id', (req, res) => {
  let { id } = req.params;
  deleteMovieByID(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
