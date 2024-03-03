import { createApp } from 'vue';
import './style.css';
import { router } from './routes';
import { store } from './store';
import { auth, db, matchesRef } from './firebase';

import App from './App.vue';

// App
const app = createApp(App);

// Globals
app.config.globalProperties.$firebaseAuth = auth;
app.config.globalProperties.$firebaseDb = db;
app.config.globalProperties.$matchesRef = matchesRef;

// Uses
app.use(router);
app.use(store);

// Mount
app.mount('#app');