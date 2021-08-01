const nconf = require('nconf');
const session = require('express-session');
const cors = require('cors');
const cookie = require('cookie-parser');


module.exports = (app, express) => {
    nconf.argv().env().file({file: './server_config.json'});

    app.use(cors());
    app.use(session({secret: nconf.get('sessionSecret'), resave: true, saveUninitialized: true}));
    app.use(cookie());
}
