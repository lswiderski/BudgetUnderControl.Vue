import { accountsService } from '../services';

export const accounts = {
    namespaced: true,
    state: {
        accounts: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            accountsService.getAll()
                .then(
                    data => commit('getAllSuccess', data),
                    error => commit('getAllFailure', error)
                );
        }
    },
    mutations: {
        getAllRequest(state) {
            state.accounts = { loading: true };
        },
        getAllSuccess(state, data) {
            state.accounts = { items: data};
        },
        getAllFailure(state, error) {
            state.accounts = { error };
        }
    }
}
