import { usersService } from '../_services';

export const users = {
    namespaced: true,
    state: {
        users: {},
        user: {data : null, loaded : false},
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            usersService.getAll()
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        },
        get({ commit }, id) {
            usersService.get(id)
                .then(
                    data => commit('getSuccess', data),
                    error => commit('getFailure', error)
                );
        }
    },
    mutations: {
        getAllRequest(state) {
            state.users = { loading: true };
        },
        getAllSuccess(state, data) {
            state.users = { items: data};
        },
        getAllFailure(state, error) {
            state.users = { error };
        },
        getSuccess(state, data) {
            state.user = {data, loaded: true };
        },
        getFailure(state, error) {
            state.user = { error };
        },
    },
    getters :{
        user: state => {
            return state.user.data;
        }
    }
}
