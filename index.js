const path = require('path');
const express = require('express');
const helmet = require('helmet');

require('dotenv').config();


const app = express();
app.enable('trust proxy');

app.use(helmet());
app.use(express.json());
app.use(express.static('./public'));
const start = path.join(__dirname, 'public/index.html');
const errorPage = path.join(__dirname, 'public/404.html');


app.get('/', (req, res, next) => {
      return res.status(200).sendFile(start);
});

app.use((req, res, next) => {
  res.status(404).sendFile(errorPage);
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
