<template>
  <div>
    <DataTable
      :value="accounts.items"
      :paginator="true"
      :rows="10"
      v-model:selection="selectedAccount"
      selectionMode="single"
      @rowSelect="onRowSelect"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      :filters="filters"
    >
      <template #header>
        <div
          class="
            table-header
            p-d-flex p-flex-column p-flex-md-row p-jc-md-between
          "
        >
          <h5 class="p-mb-2 p-m-md-0 p-as-md-center">Accounts</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Search..."
              class="p-mr-2"
            />
            <Button
              label="New"
              icon="pi pi-plus"
              class="p-button-success p-mr-2"
              @click="openNew"
            />
          </span>
        </div>
      </template>

      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="amountWithCurrency" header="Balance" :sortable="true"></Column>
      <Column field="currency" header="Currency" :sortable="true"></Column>
        <Column field="order" header="Order" :sortable="true"></Column>
       <Column field="isActive" header="Active" :sortable="true"></Column>
      
      <template #paginatorLeft>
        <Button type="button" icon="pi pi-refresh" class="p-button-text" />
      </template>
      <template #paginatorRight>
        <Button type="button" icon="pi pi-cloud" class="p-button-text" />
      </template>
    </DataTable>
    <AddAccountDialog ref="addDialog" />
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import AddAccountDialog from "./AddAccountDialog";
export default {
    components:{
        AddAccountDialog,
    },
  data() {
    return {
      selectedAccount: null,
      filters: {},
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts.accounts;
    },
  },
  created() {
    this.initFilters();
    this.$store.dispatch("accounts/getAll");
  },
  methods: {
    onRowSelect(event) {
      this.$router.push({
        name: "Account",
        params: { id: event.data.externalId },
      });
    },
    openNew() {
      this.$refs.addDialog.openEmptyDialog();
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>