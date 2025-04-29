const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ['https://chuntyng.github.io'],
  }),
);

app.get('/', (req, res) => {
  res.send('Welcome to the static job listings API! Access data at /data');
});

app.use(
  '/src/assets/images',
  express.static(path.join(__dirname, 'src/assets/images')),
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/data/src/assets/images/:imageName', (req, res) => {
  const imagePath = path.join(
    __dirname,
    'src/assets/images',
    req.params.imageName,
  );
  res.sendFile(imagePath);
});

app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data file');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(JSON.parse(data), null, 2));
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
