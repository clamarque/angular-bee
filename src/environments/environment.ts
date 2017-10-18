// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBS44ORyo8_227W93i47ZIDXxa5FWFmrBM",
    authDomain: "angular-bee.firebaseapp.com",
    databaseURL: "https://angular-bee.firebaseio.com",
    projectId: "angular-bee",
    storageBucket: "angular-bee.appspot.com",
    messagingSenderId: "62940649793"
  }
};
