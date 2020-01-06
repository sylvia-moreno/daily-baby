export const language;

if(window.navigator.languages) {
  language = window.navigator.languages[0].split('-')[0];
} else {
  language = window.navigator.userLanguage || window.navigator.language;	
}

export const locales = {
  language: require(`date-fns/locale/${language}`);
}