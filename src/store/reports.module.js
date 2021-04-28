import { reportsService } from '../services';

export const reports = {
    namespaced: true,
    state: {
        movingSumDataSource: {},
        dashboardData: {},
        expensesChartData: {},
    },
    actions: {
        getMovingSumData({ commit }, filters) {
            commit('getMovingSumDataRequest');
            reportsService.getMovingSumData(filters)
                .then(
                    data => commit('getMovingSumDataSuccess', data),
                    error => commit('getMovingSumDataFailure', error)
                );
        },
        getDashboardData({ commit }) {
            commit('getDashboardDataRequest');

            reportsService.getDashboardData()
                .then(
                    data => commit('getDashboardDataSuccess', data),
                    error => commit('getDashboardDataFailure', error)
                );
        },
        getExpensesChartData({ commit }, filters) {
            commit('getExpensesChartRequest');

            reportsService.getExpensesChartData(filters)
                .then(
                    data => commit('getExpensesChartSuccess', data),
                    error => commit('getExpensesChartFailure', error)
                );
        }
    },
    mutations: {
        getMovingSumDataRequest(state) {
            state.movingSumDataSource = { loading: true };
        },
        getMovingSumDataSuccess(state, data) {
            state.movingSumDataSource = { items: data};
        },
        getMovingSumDataFailure(state, error) {
            state.movingSumDataSource = { error };
        },

        getDashboardDataRequest(state) {
            state.dashboardData = { loading: true };
        },
        getDashboardDataSuccess(state, data) {
            state.dashboardData = { items: data};
        },
        getDashboardDataFailure(state, error) {
            state.dashboardData = { error };
        },

        getExpensesChartRequest(state) {
            state.expensesChartData = { loading: true };
        },
        getExpensesChartSuccess(state, data) {
            state.expensesChartData = { items: data};
        },
        getExpensesChartFailure(state, error) {
            state.expensesChartData = { error };
        }
    }
}
