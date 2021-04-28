import { createStore } from 'vuex';
import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { categories } from './categories.module';
import { users } from './users.module';
import { accounts } from './accounts.module';
import { transactions } from './transactions.module';
import { tags } from './tags.module';
import { transactionFilters } from './transactionFilters.module';
import { reports } from './reports.module';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alert,
    authentication,
    categories,
    users,
    accounts,
    transactions,
    tags,
    transactionFilters,
    reports
  },
});
