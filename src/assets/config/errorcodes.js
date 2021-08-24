import { getLang } from "../../../../PhenixGames-Team-Backend/server/config/lang/getLang";

const lang = getLang();

const c = lang.errorcodes;

const errorcodes = {
    "0": c.c0,
    "1": c.c1,
}

export{ errorcodes };