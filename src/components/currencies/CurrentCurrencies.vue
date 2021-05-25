<template>
   <DataTable :value="currencies" :paginator="true" :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5,10,20,50]" responsiveLayout="scroll"
            currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <Column field="currency" header="Name"></Column>
            <Column field="balance" header="Balance"></Column>
        </DataTable>
</template>

<script>
export default {
    name: "CurrentCurrencies",
    data() {
        return {
        headers: [
           {text: "Name", value: "currency"},
           {text: "Balance", value: "balance"},
        ],
        currencies:[]
        }
    },
    computed: {
        dataSource() {
      return this.$store.state.reports.dashboardData;
    }
    },
         watch: {
    dataSource(newValue) {

      if (newValue.items) {
          this.currencies = this.$store.state.reports.dashboardData.items.actualStatus;

      }
    },
},
};
</script>

<style>

</style>