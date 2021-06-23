<template>
  <div>
    <TransactionsFilters v-on:filtersChanged="refreshGrid" />
    <TransactionsTable />
  </div>
</template>

<script>
import TransactionsFilters from "../../components/transactions/TransactionsFilters";
import TransactionsTable from "../../components/transactions/TransactionsTable";
export default {
  components: {
    TransactionsTable,
    TransactionsFilters,
  },
  methods: {
    refreshGrid: function () {
      this.$store.dispatch(
        "transactions/getAll",
        this.$store.state.transactionFilters
      );
    },
  },
};
</script>