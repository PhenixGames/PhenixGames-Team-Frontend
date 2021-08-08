import {gettmlang} from '../getteamlang';
const tm_lang = gettmlang.gettmlang();

export const checkForm = {
    checkForm: (teamid, password) => {
        switch(true) {
            case teamid === "":
                return tm_lang.login.error_b;
            case teamid.length < 5:
                return tm_lang.login.error_b_leng;
            case password === "":
                return tm_lang.login.error_p;
        }
    }
}