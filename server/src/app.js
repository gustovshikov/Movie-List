const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('My API is up and running Yo!');
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
