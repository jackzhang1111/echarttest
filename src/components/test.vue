<template>
  <div id="map-chart">
    <chart id="chartId" :options="option"></chart>
  </div>
</template>

<script type="text/ecmascript-6">
import "echarts/map/js/china.js";
import echarts from "echarts";
export default {
  props: ["mapDatas"],
  data() {
    return {
      geoCoordMap: {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        深圳: [114.0216064453, 22.5227057035]
      },
      option: {
        tooltip: {},
        //左下lengend
        visualMap: {
          min: 0, //最小
          max: 300, //最大
          splitNumber: 5, //共分5层
          color: ["#ff6300", "#eac736", "#50a3ba"], //颜色从高到低依次渐变
          textStyle: {
            color: "#fff"
          }
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: "left",
          top: "bottom",
          text: ["High", "Low"],
          seriesIndex: [1],
          inRange: {
            color: ["#e0ffff", "#006edd"]
          },
          calculable: true
        },
       
        geo: {
          map: "china",
          roam: true,
          label: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            //激活样式
            emphasis: {
              areaColor: "#2a333d"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              show: true,
              textStyle: {
                color: "blue"
              }, //省份标签字体颜色
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              scaleLimit: {
                max: 5,
                min: 1
              }
            }
          }
        },
        series: [
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "geo",
            data: [],
            symbolSize: 10,
            //直接在点上显示标签
            label: {
              show: false,
              formatter: "{b}",
              offset: [15, -15] //文字的相对偏移
            },
            //标签的样式
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1
              }
            }
          },
          {
            name: "全国地区占比",
            type: "map",
            geoIndex: 0,
            // tooltip: {show: false},
            data: [
              { name: "北京", value: 12 },
              { name: "天津", value: 13 },
              { name: "上海", value: 121 },
              { name: "重庆", value: 122 },
              { name: "河北", value: 123 },
              { name: "山西", value: 124 },
              { name: "辽宁", value: 123 },
              { name: "吉林", value: 124 },
              { name: "黑龙江", value: 412 },
              { name: "江苏", value: 142 },
              { name: "安徽", value: 212 },
              { name: "福建", value: 412 },
              { name: "江西", value: 512 },
              { name: "山东", value: 612 },
              { name: "河南", value: 712 },
              { name: "湖南", value: 812 },
              { name: "四川", value: 0 },
              { name: "云南", value: 612 },
              { name: "陕西", value: 512 },
              { name: "甘肃", value: 312 },
              { name: "青海", value: 312 },
              { name: "内蒙古", value: 312 },
              { name: "广西", value: 132 }
            ]
          }
        ]
      }
    };
  },
  methods: {
    drawChinaMap() {
      let myChart = echarts.init(document.getElementById("chartId"));
      myChart.setOption(this.option);
    },
    convertData() {
      var data = [
        { name: "海门", value: 9 },
        { name: "鄂尔多斯", value: 12 },
        { name: "招远", value: 12 },
        { name: "舟山", value: 12 },
        { name: "齐齐哈尔", value: 14 },
        { name: "盐城", value: 15 },
        { name: "赤峰", value: 100 },
        { name: "青岛", value: 18 },
        { name: "乳山", value: 300 },
        { name: "深圳", value: 19 }
      ];
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name]; //获取坐标
        if (geoCoord) {
          //如果有坐标
          res.push({
            //创建对象数组，
            name: data[i].name,
            value: geoCoord.concat(data[i].value) //用连接数组的形式将value值加入
          });
          //res.push(geoCoord.concat(data[i].value));
          //res.push(geoCoord.concat(data[i].name));
        }
      }
      this.option.series[0].data = res;
    }
  },
  mounted() {
    this.convertData()
    // this.drawChinaMap()

    var a,
      b,
      c,
      d = { a: 5 };
    a = d;
    b = d;
    a.a = 7;
    console.log(b.a);
  },
  created() {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#map-chart {
  display: flex;
  justify-content: center;
  width: 100%;

  height 100% {
    & > .echarts, canvas {
      width: 100% !important;
      height: 500px !important;
    }
  }
}
</style>
