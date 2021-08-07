require("../init/file.init").fileinit(__filename, "init finished");
const getuser = require("../../api/team/getuser/getuser");
const nconf = require('nconf');
const log = require("../../_log");
const Status = require("../config/status.json");
const { teamSignin } = require("../../api/team/signin/team-signin");
const teamroute = nconf.get('mainrouting') + nconf.get('routing:team:main');

module.exports = (app) => {

    app.post(teamroute + nconf.get('routing:team:login:signin'), (req, res) => {
        teamSignin.validateForm(req.body.teamid, req.body.password, (response) => {
            if (response) {
                res.send(response);
                return;
            }
        });
        teamSignin.signIn(res, req.body.teamid, req.body.password, (response) => {
            res.send(response);
            return;
        });
        return;
    });



    app.get(teamroute + nconf.get('routing:team:getuser'), async (req, res) => {
        log.info(`${
            teamroute + nconf.get('routing:team:getuser')
        } connected Team with IP: `, req.ip);

        var obj = {};
        getuser.selectlogindata(req, true, (result) => {
            obj = result;
            send();
        });
        function send() {
            if (!obj) {
                res.sendStatus(Status.STATUS_NO_CONTENT);
                return;
            }
            res.status(Status.STATUS_OK).send(obj);
        }
    });
}
