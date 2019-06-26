<template>
  <el-card class="card">
    <my-list list1="数据管理" list2="数据展示"></my-list>
    <div id="main" style="width: 600px;height:400px;" v-loading="loading"></div>
  </el-card>
</template>

<script>
const echarts = require("echarts");
export default {
  mounted() {
    this.showMath();
  },
  data(){
    return {
      loading:true
    }
  },
  methods: {
    async showMath() {
      const myChart = echarts.init(document.getElementById("main"));
      const option1 = {
        title: {
          text: "图表展示"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
       
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
       
      };
      const res = await this.$http.get('reports/type/1');
      this.loading = false;
      
      const option2 = res.data.data; 
     const option = {...option1,...option2};
      myChart.setOption(option);
      
    }
  }
}
</script>

<style>
.card {
  height: 100%;
}
#main {
  margin-top: 20px;
}
</style>
