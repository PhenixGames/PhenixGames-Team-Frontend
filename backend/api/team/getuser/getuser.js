const lang = require("../../../server/config/lang/getLang").getLang();
const bcryptjs = require("bcryptjs");
const {conn} = require("../../../server/db/db");
const log = require("../../../_log");
const {getusercookie} = require("./getusercookie");
const getuser = { /**
     * Select data from the database and send it to the frontend
     *  
     * @param boolean secure -> true = frontend | false = backend
     * @param string db Select database
     * @return array cb
     */
    selectlogindata(req, secure, cb) {
        var teamid;
        var authkey;
        try {
            getusercookie.returncookie(req, (result) => {
                authkey = result.pg_authkey;
                teamid = result.pg_teamid;
            });
        } catch (err) {
            teamid = false;
        }
        console.log(teamid)
        if (teamid) {
            conn.query(`SELECT * from team_login where teamid = ?`, teamid, (err, result, fields) => {
                if (err) {
                    log.warn(lang.errors.database.err, err)
                    return false;
                }

                bcryptjs.compare(result[0].authkey, authkey, async (err, bres) => {
                    if (err) {
                        log.info(__filename, err)
                        return cb(false);
                    }
                    if (bres) {
                        if (secure) {
                            return cb({'teamid': result[0].teamid});
                        } else {
                            return cb(result[0]);
                        }
                    }
                });
            });
        } else {
            return cb(false);
        }
    }
}

module.exports = getuser;
