const nconf = require('nconf');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const bodyParser = require('body-parser');


module.exports = (app) => {
    nconf.argv().env().file({file: './server_config.json'});

    app.use(cors());
    app.use(session({secret: nconf.get('sessionSecret'), resave: true, saveUninitialized: true, cookie: {maxAge: 600000}}));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(flash());
}
