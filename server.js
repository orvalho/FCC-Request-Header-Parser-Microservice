'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.enable('trust proxy');

app.get('/api/whoami', (req, res) => {
  res.json({'ipaddress': req.ip,
            'language': req.headers['accept-language'],
            'software': req.headers['user-agent']
  });
});

app.use((req, res) => res.status(404).send('Not found'));

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
