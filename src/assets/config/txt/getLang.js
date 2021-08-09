var lang = "de_DE";

const language = require(`./translation/${lang}.json`);

export function getLang() {
    return language;
}
