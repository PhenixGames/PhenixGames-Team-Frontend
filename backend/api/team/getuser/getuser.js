const {conn} = require("../../../server/db/db");
const log = require("../../../_log");
const txt = require('../../../txt/txt.json');
const { getusercookie } = require("./getusercookie");

const getuser = {
    /**
     * Select data from the database and send it to the frontend
     *  
     * @param boolean secure -> true = frontend | false = backend
     * @param string db Select database
     * @return array cb
     */
    selectlogindata(req, secure, cb) {
        var teamid;
        try {
            getusercookie.returncookie(req, (result) => {
                teamid = result.teamid;
            });
        } catch(err) {
            teamid = false;
        }
        
        if(teamid) {
            conn.query(`SELECT * from team_login where teamid = ?`, teamid,  (err, result, fields) => {
                if (err) {
                    log.warn(txt.database.err, err)
                    return false;
                }
                
                if(secure) {
                    return cb({
                        'teamid': result[0].teamid,
                    });
                }
                return cb(result[0]);
            });
        }else {
            return cb(false);
        }
    },
}

module.exports = getuser;
