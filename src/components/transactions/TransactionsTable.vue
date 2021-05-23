<template>
  <div>
    <div class="card">
      <DataTable
        :value="transactions.items"
        responsiveLayout="scroll"
        dataKey="id"
        :paginator="true"
        :rows="15"
        :filters="filters"
        @rowReorder="onRowReorder"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[15, 25, 50, 100]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} transactions"
      >
        <template #header>
          <div
            class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
          >
            <h5 class="p-mb-2 p-m-md-0 p-as-md-center">Transactions</h5>
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
        <Column :rowReorder="true" headerStyle="width: 3rem" />
        <Column field="date" header="Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.date) }}
          </template>
        </Column>
        <Column field="account" header="Account"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="value" header="Value">
          <template #body="slotProps">
            <span :style="{ color: getColor(slotProps.data.value) }">{{
              slotProps.data.value
            }}</span>
          </template>
        </Column>
        <Column field="currencyCode" header="Currency"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="tags" header="Tags">
          <template #body="slotProps">
            <Chip v-for="(tag, i) in slotProps.data.tags" :key="i">{{
              tag.name
            }}</Chip>
          </template>
        </Column>
        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editTransaction(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-success p-mr-2"
              @click="removeTransaction(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <EditTransactionDialog ref="editDialog" />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import EditTransactionDialog from "./EditTransactionDialog";
import { transactionsService } from "../../services";
import moment from "moment";
export default {
  components: {
    EditTransactionDialog,
  },
  data() {
    return {
      submitted: false,
      filters: {},
    };
  },
  computed: {
    transactions() {
      return this.$store.state.transactions.transactions;
    },
  },
  created() {
    this.initFilters();
    this.$store.dispatch("tags/getAll");
  },
  mounted() {
    this.$store.dispatch(
      "transactions/getAll",
      this.$store.state.transactionFilters
    );
  },

  methods: {
    openNew() {
      this.$refs.editDialog.openEmptyDialog();
    },
    editTransaction(item) {
      this.$refs.editDialog.openDialog(item);
    },
    removeTransaction(item) {
      this.$confirm.require({
        message: "Are you sure you want to delete this transaction?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          transactionsService.remove(item.externalId).then(() => {
            this.$store.dispatch(
              "transactions/getAll",
              this.$store.state.transactionFilters
            );
          });
        },
        reject: () => {
        },
      });
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.transactions.items.length; i++) {
        if (this.transactions.items[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    onRowReorder(event) {
      this.transactions.items = event.value;
    },
    getColor(value) {
      if (value < 0) return "red";
      else return "green";
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY hh:mm");
      }
    },
  },
};
</script>