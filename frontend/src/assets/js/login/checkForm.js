import {gettmlang} from '../getteamlang';
const tm_lang = gettmlang.gettmlang();

export const checkForm = {
    checkForm: (username, password) => {
        switch(true) {
            case username === "":
                return tm_lang.login.error_b;
            case password === "":
                return tm_lang.login.error_p;
        }
    }
}