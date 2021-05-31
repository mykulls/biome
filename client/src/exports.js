import * as Realm from 'realm-web';

const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });
const origin = process.env.NODE_ENV === 'production' ? '' : `http://localhost:${process.env.REACT_APP_PORT}`;
// replace production with the deploy link later

export { app, Realm, origin };
