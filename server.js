// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Serve the data.json file
app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data file');
    }
    res.json(JSON.parse(data));
    res.send('Welcome to the static job listings API! Access data at /data');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
