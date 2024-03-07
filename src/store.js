import { createStore } from 'vuex';
import { auth, matchesRef } from './firebase';
import { router } from './routes';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

function hoje() {
  const currentDate = new Date();
  return currentDate.toLocaleDateString('en-CA');
}

const state = () => ({
  usuario: null,
  match: []
});

const getters = {
  getUsuario(state) {
    return state.usuario;
  },
  getMatch(state) {
    return state.match;
  }
};

const mutations = {
  setUsuario(state, usuario) {
    state.usuario = usuario;
  },
  setUsuarioDisplayName(state, displayName) {
    const usuario = { ...state.usuario };
    usuario['displayName'] = displayName;
    state.usuario = usuario;
  },
  setMatch(state, match) {
    state.match = match;
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
    } catch (e) {
      console.log('Erro inesperado: ', e);
    }
  },
  async createMatch(context, votes) {
    const data = hoje();
    const { uid, email } = context.getters.getUsuario;
    const matchData = {};
    matchData[uid] = { email, votes };

    try {
      await setDoc(doc(matchesRef, data), matchData, { merge: true });
    } catch (error) {
      console.error('Error Adding: ', error);
    }

    return matchData;
  },
  async getMatchHoje(context) {
    const dhoje = hoje();
    try {
      const docRef = doc(matchesRef, dhoje);
      const docSnap = await getDoc(docRef);
      const dados = docSnap.data();
      if (dados) {
        context.commit('setMatch', dados);
      }
    } catch (err) {
      console.error('Error Getting Users: ', err);
    }
  },
  async alteraNome(context, { displayName }) {
    try {
      await updateProfile(auth.currentUser, { displayName });
      context.commit('setUsuarioDisplayName', displayName);
    } catch (err) {
      console.error('Error setting displayName: ', err);
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
  }
});

