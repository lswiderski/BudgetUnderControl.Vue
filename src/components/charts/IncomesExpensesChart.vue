<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  name: "IncomesExpensesChart",

  props: {
    series: Array,
    labels: Array,
  },
  data: () => ({}),

  computed: {
    chartOptions() {
      return {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: this.labels,
        },
        yaxis: {
          title: {
            text: "PLN",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " zł";
            },
          },
        },
      };
    },
  },
};
</script>

<style lang="sass" scoped>
</style>