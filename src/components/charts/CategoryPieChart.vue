<template>
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>

</template>

<script>
export default {
  name: "CategoryPieChart",
  props: {
    series: Array,
    labels: Array,
  },
 data: () => ({}),
  computed: {
    chartOptions() {
      return {
        series: this.series,
        labels: this.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="sass" scoped>
</style>