const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const register = require('./app/modules/register/routes/register');
const login = require('./app/modules/login/routes/login');
const pointOfInterest = require('./app/modules/point-of-interest/routes/point-of-interest');
const category = require('./app/modules/category/routes/category');
const question = require('./app/modules/question/routes/question');
const country = require('./app/modules/country/routes/country');

app.use('/register', register);
app.use('/login', login);
app.use('/point-of-interest', pointOfInterest);
app.use('/category', category);
app.use('/question', question);
app.use('/country', country);

const port = 3000;
app.listen(port, function () {
    console.log('Servers side app listening on port ' + port);
});
