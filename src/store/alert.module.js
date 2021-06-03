export const alert = {
    namespaced: true,
    state: {
        message: null,
        title: null,
    },
    actions: {
        success({ commit }, payload) {
            commit('success', payload);
        },
        error({ commit }, message) {
            commit('error', message);
        },
        info({ commit }, payload) {
            commit('info', payload);
        },
        warn({ commit }, payload) {
            commit('warn',payload);
        },
        clear({ commit }) {
            commit('success');
        }
    },
    mutations: {
        success(state, { title, message}) {
            state.message = message;
            state.title =  title
        },
        error(state, message) {
            state.message =  message;
        },
        info(state, { title, message}) {
            state.message = message;
            state.title =  title
        },
        warn(state,{ title, message}) {
            state.message = message;
            state.title =  title
        },
        clear(state) {
            state.message = null;
        }
    },
    getters :{
        alert: state => {
            return state;
        }
    }
}
