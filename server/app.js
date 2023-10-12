const express = require('express'); 
require('@babel/register');
const app = express(); 
const morgan = require('morgan'); 
const path = require('path');
require('dotenv').config(); 
const cors = require('cors');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const Register = require('./src/routes/register')
const Login = require("./src/routes/login")
const Logout = require("./src/routes/logout")
const User = require('./src/routes/user')
const Notebook = require("./src/routes/notebook")

const { PORT } = process.env;

const sessionConfig = {
  name: 'CardsCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(cors({
  origin: true, //["http://localhost:5173"]
  credentials: true }
));

//роутеры
app.use('/register', Register);
app.use('/login', Login);
app.use('/logout', Logout);
app.use('/user', User);
app.use('/notebook', Notebook);


// изменить ковычки на бектики
app.listen(PORT, () => {
  console.log('Сервер крутится на  порту!'); 
});
