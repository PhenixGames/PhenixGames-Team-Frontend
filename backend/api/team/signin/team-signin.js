require("../../../server/init/file.init").fileinit(__filename, "init finished");

const Status = require('../../../server/config/status.json');
const { conn } = require("../../../server/db/db");
const log = require("../../../_log");
const getLang = require( '../../../server/config/lang/getLang').getLang();
const lang = getLang;
const bcryptjs = require('bcryptjs');
const uuid = require('uuid')
const nconf = require('nconf');

const teamSignin = {
    validateForm: (teamid, password, cb) => {
        switch(true) {
            case isNaN(teamid):
                return  cb({
                    'status': Status.STATUS_METHOD_NOT_ALLOWED,
                    'message': lang.validation.signin.NaN
                });
            case teamid.length < 5:
                return cb({
                    'status': Status.STATUS_METHOD_NOT_ALLOWED,
                    'message': lang.validation.signin.nolength
                });
            case !password:
                return cb({
                    'status': Status.STATUS_NO_CONTENT,
                    'message': lang.validation.signin.Npwd
                });
        }
    },
    signIn: async (response, teamid, password, cb) => {
        conn.query(`SELECT teamid, password FROM team_login WHERE teamid = ${conn.escape(teamid)}`, (err, res) => {
            if(err) {
                return cb(lang.validation.signin.Nf);
            }
            if(!res.length) {
                return cb(lang.validation.signin.Nf);
            }
            dbteamid = res[0].teamid;
            dbpassword = res[0].password

            bcryptjs.compare(password, dbpassword, (err, res) => {
                if(err) {
                    return cb(lang.validation.signin.nc);
                }

                if(res) {
                    const authkey = bcryptjs.hash(uuid.v5, nconf.get('bcrypt:saltRounds'));
                    response.cookie('authkey', authkey, nconf.get('cookie') );
                    return cb(true);
                }
                return cb(lang.validation.signin.nc);
            });
        });
    }
};


module.exports = {
    teamSignin
}