const express = require('express');
const exphbs = require('express-handlebars');
const { join } = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

require('env2')('./config.env');

const app = express();

const { router } = require('./controllers');

app.set('port', process.env.PORT || 5000);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: join(__dirname, 'views', 'layouts'),
    partialsDir: join(__dirname, 'views', 'partials'),
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(router);

module.exports = {
  app,
};
