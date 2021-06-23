<template>
  <div>
    <div class="card toolbar-demo">
      <h5>Filters</h5>

      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12 p-md-2">
          <label for="dateFrom">From</label>
          <div>
            <Calendar
              v-model="dateFrom"
              :showIcon="true"
              id="dateFrom"
              :yearNavigator="true"
              yearRange="2000:2030"
              :monthNavigator="true"
            />
          </div>
        </div>
        <div class="p-field p-col-12 p-md-2">
          <label for="dateTo">To</label>
          <div>
            <Calendar
              v-model="dateTo"
              :showIcon="true"
              id="dateTo"
              :yearNavigator="true"
              yearRange="2000:2030"
              :monthNavigator="true"
            />
          </div>
        </div>

        <div class="p-field p-col-12 p-md-4">
          <label for="accounts">Accounts</label>
          <div>
            <MultiSelect
              v-model="accountsIds"
              :options="accounts"
              optionLabel="name"
              optionValue="id"
              placeholder="include all if empty"
              id="accounts"
              display="chip"
            />
          </div>
        </div>

        <div class="p-field p-col-12 p-md-4">
          <label for="categories">categories</label>
          <div>
            <MultiSelect
              v-model="categoryIds"
              :options="categories"
              optionLabel="name"
              optionValue="id"
              placeholder="include all if empty"
              id="categories"
              display="chip"
            />
          </div>
        </div>

        <div class="p-field p-col-12 p-md-4">
          <label for="tags">Tags</label>
          <div>
            <MultiSelect
              v-model="tagIds"
              :options="tags"
              optionLabel="name"
              optionValue="id"
              placeholder="include all if empty"
              id="tags"
              display="chip"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionFilters",
  data() {
    return {};
  },
  computed: {
    dateFrom: {
      get: function () {
        return this.$store.state.transactionFilters.fromDate;
      },
      set: function (value) {
        this.$store.dispatch("transactionFilters/setFrom", value);
        this.$emit("filtersChanged");
      },
    },
    dateTo: {
      get: function () {
        return this.$store.state.transactionFilters.toDate;
      },
      set: function (value) {
        this.$store.dispatch("transactionFilters/setTo", value);
        this.$emit("filtersChanged");
      },
    },
    accountsIds: {
      get: function () {
        return this.$store.state.transactionFilters.accountsIds;
      },
      set: function (value) {
        this.$store.dispatch("transactionFilters/setAccountsIds", value);
        this.$emit("filtersChanged");
      },
    },
    categoryIds: {
      get: function () {
        return this.$store.state.transactionFilters.categoryIds;
      },
      set: function (value) {
        this.$store.dispatch("transactionFilters/setCategoryIds", value);
        this.$emit("filtersChanged");
      },
    },
    tagIds: {
      get: function () {
        return this.$store.state.transactionFilters.tagIds;
      },
      set: function (value) {
        this.$store.dispatch("transactionFilters/setTagIds", value);
        this.$emit("filtersChanged");
      },
    },
    accounts() {
      return this.$store.state.accounts.accounts.items;
    },
    categories() {
      return this.$store.state.categories.categories.items;
    },
    tags() {
      return this.$store.state.tags.tags.items;
    },
  },
  methods: {
    clear() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      this.$store.dispatch(
        "transactionFilters/setFrom",
        firstDay.toISOString().substr(0, 10)
      );
      this.$store.dispatch(
        "transactionFilters/setTo",
        lastDay.toISOString().substr(0, 10)
      );

      this.accountsIds = [];
      this.categoryIds = [];
      this.tagIds = [];
    },
  },
  created() {
    this.$store.dispatch("accounts/getAll");
    this.$store.dispatch("categories/getAll");
    this.$store.dispatch("tags/getAll");
    this.clear();
  },
};
</script>