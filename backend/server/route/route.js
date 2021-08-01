require("../init/file.init").fileinit(__filename, "init finished");
const getuser = require("../../api/team/getuser/getuser");
const nconf = require('nconf');
const log = require("../../_log");
const Status = require("../config/status.json");
module.exports = (app) => {


    const teamroute = nconf.get('mainrouting') + nconf.get('routing:team:main');

    app.post(teamroute + nconf.get('routing:team:login:signin'), (req, res) => { // Signin
        
    });

    app.get(teamroute + nconf.get('routing:team:getuser'), async (req, res) => {
        log.info(`${teamroute + nconf.get('routing:team:getuser')} connected with IP: `, req.ip);
        
        var obj = {};
        getuser.selectlogindata(req, true, (result) => {
            obj = result;
            send();
        });
        function send() {  
            if(!obj) { res.sendStatus(Status.STATUS_NO_CONTENT); return;}

            res.status(Status.STATUS_OK).send(obj);
        }
    });
}
