<template>
  <div class="UserData">
    <div class="user-data"></div>
    <div class="pie-user" ref="pie"></div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/pie";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default {
  name: "UserData",
   props: {
    title: { type: String, required: true },
    // val: { type: Number, required: true },
    // percent: { type: Boolean, required: true, default: false }
  },
  data() {
    return {};
  },
  mounted() {
      // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(this.$refs.pie);
    // 绘制图表
    myChart.setOption({
        series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
    });
  }
};
</script>

<style lang="scss" scoped>
.UserData{
    // text-align: center;
}
.pie-user {
  width: px2rem(175);
  height: px2rem(175);
}
</style>