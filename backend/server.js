require("./server/init/file.init").fileinit(__filename, "init finished");

const fs = require('fs');
fs.mkdirSync('server/log/', { recursive: true })

const express = require('express');

const serverconfig = require('nconf');

const app = express();

serverconfig.argv().env().file({file: './server_config.json'});

require('./server-init')(app, express);
require('./server/route/route')(app, serverconfig)


app.listen(serverconfig.get('port'), () => {
    console.log(`${
        serverconfig.get('server')
    } server started on ${
        serverconfig.get('port')
    }`);
});
