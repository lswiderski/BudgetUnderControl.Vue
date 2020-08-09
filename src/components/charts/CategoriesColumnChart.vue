<template>
  <div>
    <apexchart type="bar" :options="chartOptions" :series="series" ></apexchart>
  </div>
</template>

<script>
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";

Vue.component("apexchart", VueApexCharts);

export default {
  name: "CategoriesColumnChart",
  components: {
    apexchart: VueApexCharts
  },
  props: {
      series:  Array,
  },
  data:()=> ( {
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            xaxis: {
              type: 'category',
            },
            legend: {
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
          },
          
          
        
  }),
  computed: {

  }
};
</script>

<style lang="sass" scoped>

</style>