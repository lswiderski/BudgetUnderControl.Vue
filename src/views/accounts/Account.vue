<template>
  <div>
    <Card>
      <template #title> Account </template>
      <template #content>
        <EditAccountForm :id="id" />
      </template>
    </Card>

    <TransactionsFilters
      v-on:filtersChanged="refreshGrid"
      ref="transactionFilters"
      class="p-mt-4"
    />
    <TransactionsTable />
  </div>
</template>

<script>
import EditAccountForm from "../../components/accounts/EditAccountForm";
import TransactionsFilters from "../../components/transactions/TransactionsFilters";
import TransactionsTable from "../../components/transactions/TransactionsTable";
import { accountsService } from "../../services";

export default {
  components: {
    EditAccountForm,
    TransactionsTable,
    TransactionsFilters,
  },
  data() {
    return {
      account: {},
      errors: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    const _self = this;

    accountsService.getDetails(this.id).then((dto) => {
      _self.account = dto;
      this.$refs.transactionFilters.accountsIds = [dto.id];
    });
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