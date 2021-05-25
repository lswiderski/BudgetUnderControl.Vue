<template>
  <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: "CategoriesColumnChart",
  props: {
    series: Array,
  },
  data: () => ({}),
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        series: this.series,
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: "category",
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      };
    },
  },
};
</script>

<style lang="sass" scoped>
</style>