import { loginService } from '../services';
import router from '../router';

const token = localStorage.getItem('jwt-token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? { status: { loggedIn: true }, token, user, errors: null }
    : { status: {}, token: null, user: null, errors: {} };

const state = initialState;

const actions = {
    loginSuccess({ dispatch, commit }, {token, user}) {
        commit('loginSuccess', {token, user});
        dispatch('alert/success', { title: 'Success!', message: 'Successful login' }, { root: true });
        router.push('/');
    },
    loginFailure({ dispatch, commit },  error) {
        commit('loginFailure', error);
        dispatch('alert/error', error.message, { root: true });
    },
    loginRequest({ commit }, ) {
        commit('loginRequest');
    },

    logout({ commit }) {
        loginService.logout();
        commit('logout');
    },

    registerSuccess({ dispatch, commit }) {
        commit('registerSuccess');
        dispatch('alert/success', { title: 'Success!', message: 'Registration successful' }, { root: true });
        router.push('/login');
    },
    registerFailure({ dispatch, commit },  error) {
        commit('registerFailure', error);
        dispatch('alert/error', error.message, { root: true });
    },
    registerRequest({ commit }, ) {
        commit('registerRequest');
    },

    activate({ dispatch, commit }, { code }) {
        commit('activateRequest', { code });

        loginService.activate(code)
            .then(
                user => {
                    commit('activateSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('activateFailure', error);
                    dispatch('alert/error', error.message, { root: true });
                }
            );
    },
};
const mutations = {
    loginRequest(state) {
        state.status = { loggingIn: true };
        state.token = null;
        state.user = {};
    },
    loginSuccess(state, {token, user}) {
        state.status = { loggedIn: true };
        state.token = token;
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.token = null;
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.token = null;
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
        state.errors = {};
    },
    registerSuccess(state) {
        state.status = {};
        state.errors = {};
    },
    registerFailure(state, error) {
        state.status = {};
        state.errors = error
    },
    activateRequest(state) {
        state.status = { activating: true };
        state.errors = {};
    },
    activateSuccess(state, user) {
        state.status = {};
        state.errors = {};
        state.user = user;
    },
    activateFailure(state, error) {
        state.status = {};
        state.errors = error
    }
};


export const authentication = {
    namespaced: true,
    state,
    actions,
    mutations
};
