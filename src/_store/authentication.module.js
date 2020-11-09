import { loginService } from '../_services';
import router from '../_helpers/router';

const token = JSON.parse(localStorage.getItem('jwt-token'));
const initialState = token
    ? { status: { loggedIn: true }, token, errors: null }
    : { status: {}, token: null, errors: {} };

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
    }
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
    }
};


export const authentication = {
    namespaced: true,
    state,
    actions,
    mutations
};
