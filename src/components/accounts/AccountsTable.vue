<template>
    <div>
       <DataTable :value="accounts.items" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="name" header="Name"></Column>
            <Column field="amountWithCurrency" header="Balance"></Column>
            <Column field="currency" header="Currency"></Column>
             <template #paginatorLeft>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" />
            </template>
            <template #paginatorRight>
                <Button type="button" icon="pi pi-cloud" class="p-button-text" />
            </template>
        </DataTable>
    </div>
 
</template>

<script>

export default {
    computed: {
         accounts () {
            return this.$store.state.accounts.accounts;
        }
    },
    created () {
        this.$store.dispatch('accounts/getAll');
    },
    methods: {
    }
};
</script>