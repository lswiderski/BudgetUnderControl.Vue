<template>
  <div class="p-grid p-fluid dashboard">
    <div class="p-col-12 p-md-4 p-lg-4">
      <Panel header="this Month" style="height: 100%">
        <CategoryPieChart
        :series="thisMonthSeries"
        :labels="thisMonthLabels" />
      </Panel>
    </div>
    <div class="p-col-12 p-md-4 p-lg-4">
      <Panel header="previous Month" style="height: 100%">
        <CategoryPieChart
          :series="previousMonthSeries"
          :labels="previousMonthLabels"
        />
      </Panel>
    </div>
    <div class="p-col-12 p-md-4 p-lg-4">
      <Panel header="Incomes and Expenses" style="height: 100%">
        <IncomesExpensesChart
          :series="incomesExpensesSeries"
          :labels="incomesExpensesLabels"
        />
      </Panel>
    </div>
    <div class="p-col-12 p-md-4 p-lg-4">
      <Panel header="Status" style="height: 100%">
        <CurrentCurrencies />
      </Panel>
    </div>
    <div class="p-col-12 p-md-4 p-lg-4">
      <Panel header="Last Days Expenses" style="height: 100%">
        <CategoriesColumnChart :series="dailyExpensesSeries" />
      </Panel>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import IncomesExpensesChart from "@/components/charts/IncomesExpensesChart";
import CurrentCurrencies from "@/components/currencies/CurrentCurrencies";
import CategoriesColumnChart from "@/components/charts/CategoriesColumnChart";
export default {
  name: "Home",
  components: {
    CategoryPieChart,
    IncomesExpensesChart,
    CurrentCurrencies,
    CategoriesColumnChart,
  },
  data: () => ({
    thisMonthSeries: [],
    thisMonthLabels: [],
    previousMonthSeries: [],
    previousMonthLabels: [],
    incomesExpensesSeries: [],
    incomesExpensesLabels: [],
    dailyExpensesSeries: [],
  }),
  created() {
    this.refreshDashboard();
  },
  methods: {
    refreshDashboard: function () {
      this.$store.dispatch("reports/getDashboardData");
    },
  },
  computed: {
    dataSource() {
      return this.$store.state.reports.dashboardData;
    },
  },
  watch: {
    dataSource(newValue) {
      if (newValue.items) {
        this.thisMonthSeries = this.$store.state.reports.dashboardData.items.thisMonthCategoryChart.map(
          (serieValue) => Math.abs(serieValue.value)
        );
        this.thisMonthLabels = this.$store.state.reports.dashboardData.items.thisMonthCategoryChart.map(
          (serieValue) =>
            `${serieValue.category}  ${Math.abs(serieValue.value)}`
        );

        this.previousMonthSeries = this.$store.state.reports.dashboardData.items.lastMonthCategoryChart.map(
          (serieValue) => Math.abs(serieValue.value)
        );
        this.previousMonthLabels = this.$store.state.reports.dashboardData.items.lastMonthCategoryChart.map(
          (serieValue) =>
            `${serieValue.category}  ${Math.abs(serieValue.value)}`
        );
        this.incomesExpensesSeries = [
          {
            name: "income",
            data: this.$store.state.reports.dashboardData.items.incomes.map(
              (x) => x.value
            ),
          },
          {
            name: "expense",
            data: this.$store.state.reports.dashboardData.items.expenses.map(
              (x) => x.value
            ),
          },
        ];
        this.incomesExpensesLabels = this.$store.state.reports.dashboardData.items.incomes.map(
          (x) =>
            new Date(x.from).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })
        );
        if(this.$store.state.reports.dashboardData.items.expensesChart.length > 0) {
            this.dailyExpensesSeries = this.$store.state.reports.dashboardData.items.expensesChart.map(
                (x) => ({
                  name: x.name,
                  data: x.data.map((y) => ({ x: y.xAxis, y: y.yAxis })),
                })
              );
        }
      }
    },
  },
};
</script>