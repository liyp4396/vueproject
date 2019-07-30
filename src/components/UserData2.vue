<template>
  <div class="userdata2">
    <div class="user-data"></div>
    <div class="pie-user" ref="bar"></div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default {
  name: "userdata2",
   props: ["title"],
  data() {
    return {};
  },
  mounted() {
    let myChart = echarts.init(this.$refs.bar);
    // 绘制图表
    myChart.setOption({
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    });
  }
};
</script>

<style lang="scss" scoped>
.pie-user {
  width: px2rem(175);
  height: px2rem(175);
}
</style>