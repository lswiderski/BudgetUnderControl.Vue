<template>
<div>
    <TransactionsFilters v-on:filtersChanged="refreshChart"/>

    <MovingSumChart />

</div>
</template>
<script>

import MovingSumChart from "../../components/charts/MovingSumChart"
import TransactionsFilters from "@/components/transactions/TransactionsFilters"

export default {
    name: "MovingSumReport",
    components: {
        MovingSumChart,
        TransactionsFilters,
    },
    mounted() {
       this.refreshChart();
    },
    methods: {
        refreshChart: function() {
             this.$store.dispatch("reports/getMovingSumData",this.$store.state.transactionFilters)
        }
    },
}
</script>
<style lang="sass" scoped>

</style>