const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const {
  getAllMessages,
  getMessagesByUser,
  createMessage
} = require('./controllers/messages');
const {
  loginUser,
  createUser
} = require('./controllers/users')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/messages', getAllMessages);
app.get('/api/messages/user/:userId', getMessagesByUser);
app.post('/api/messages', createMessage);

app.post('/api/users/login', loginUser);
app.post('/api/users/signup', createUser);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// standardize error and data response to front end
app.use('*', (req, res, next) => {
  if (res.err) res.status(500).send({ error: res.err });
  else res.send({ data: res.data });
});

app.listen(process.env.PORT || 8080);

module.exports = app;