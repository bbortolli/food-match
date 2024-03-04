import { createStore } from 'vuex';
import { auth } from './firebase';
import { router } from './routes';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const state = () => ({
  usuario: null
});

const getters = {
  getUsuario(state) {
    return state.usuario;
  }
};

const mutations = {
  setUsuario(state, usuario) {
    state.usuario = usuario;
  }
};

const actions = {
  async login(context, { email, password }) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { user } = response;

      const { accessToken, displayName, uid } = user;
      const usuarioDados = {
        email, displayName, uid, accessToken
      };

      context.commit('setUsuario', usuarioDados);

    } catch (error) {
      console.log('Erro', error);
    }
  },
  async logout(context) {
    try {
      await signOut(auth);
      context.commit('setUsuario', null);
      router.push('/');
    } catch (e) {
      console.log('Erro inesperado: ', e);
    }
  }
};

export const store = createStore({
  state,
  getters,
  mutations,
  actions
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { accessToken, displayName, uid, email } = user;
    const usuarioDados = { email, displayName, uid, accessToken };
    store.commit('setUsuario', usuarioDados);
    router.push('/home');
  } else {
    store.commit('setUsuario', null);
    router.push('/');
  }
});

