const lang = require("../../../server/config/lang/getLang").getLang();
const bcryptjs = require("bcryptjs");
const {conn} = require("../../../server/db/db");
const log = require("../../../_log");
const {getusercookie} = require("./getusercookie");
const getuser = { /**
     * Select data from the database and send it to the frontend
     *  
     * @param boolean isFrontedRequest -> true = frontend | false = backend
     * @param string db Select database
     * @return array cb
     */
    getUser(req, isFrontedRequest, cb) {
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
        if (teamid) {
            try {
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
                            if (isFrontedRequest) {
                                return cb({'teamid': result[0].teamid});
                            } else {
                                return cb(result[0]);
                            }
                        }
                    });
                });
            } catch (err) {
                log.warn(__filename, err);
                return cb(false);
            }
        } else {
            return cb(false);
        }
    }
}

module.exports = getuser;
