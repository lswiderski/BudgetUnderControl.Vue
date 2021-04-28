import { loginService } from '../services';
import router from '../router';

const token = JSON.parse(localStorage.getItem('jwt-token'));
const user = JSON.parse(localStorage.getItem('user'));

const initialState = token
    ? { status: { loggedIn: true }, token, user, errors: null }
    : { status: {}, token: null, user: null, errors: {} };

const state = initialState;

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });

        loginService.login(username, password)
            .then(
                token => {
                    commit('loginSuccess', token);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        loginService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
        loginService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    activate({ dispatch, commit }, { code }) {
        commit('activateRequest', { code });

        loginService.activate(code)
            .then(
                token => {
                    commit('activateSuccess', token);
                    router.push('/');
                },
                error => {
                    commit('activateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
};
const mutations = {
    loginRequest(state, token) {
        state.status = { loggingIn: true };
        state.token = token;
    },
    loginSuccess(state, token) {
        state.status = { loggedIn: true };
        state.token = token;
    },
    loginFailure(state) {
        state.status = {};
        state.token = null;
    },
    logout(state) {
        state.status = {};
        state.token = null;
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
    activateSuccess(state) {
        state.status = {};
        state.errors = {};
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
