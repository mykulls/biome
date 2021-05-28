import * as Realm from 'realm-web';

const REALM_APP_ID = 'application-0-stekp';
const app = new Realm.App({ id: REALM_APP_ID });

export { app, Realm };
