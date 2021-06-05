import * as Realm from 'realm-web';

const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });
const origin = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER : `http://localhost:${process.env.REACT_APP_PORT}`;

export { app, Realm, origin };
