<template>
  <div id="charts"></div>
</template>

<script type="text/ecmascript-6">
import "echarts/map/js/china.js";
import echarts from "echarts";
export default {
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
        backgroundColor: "#404a59", //整个画布背景
        //标题组件
        title: {
          text: "全国主要城市空气质量",
          subtext: "data from PM25.in",
          sublink: "http://www.pm25.in",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        //提示框组件
        tooltip: {
          trigger: "item",
          confine: true,
          formatter: p => {
            //自定义提示信息
            let dataCon = p.data;
            let txtCon;
            txtCon = dataCon.name + "<br>值:" + dataCon.value[2];
            return txtCon;
          }
        },
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
        //地图区域样式
        geo: {
          map: "china",
          roam: true,
          label: {
            emphasis: {
              show: true
            },
            normal: {
              show: true, //显示省份标签
              textStyle: {
                color: "blue"
              }, //省份标签字体颜色
              position: "left"
            }
          },
          itemStyle: {
            //未激活样式
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            //激活样式
            emphasis: {
              areaColor: "#2a333d"
            }
          },
          scaleLimit: {
            max: 5,
            min: 1
          }
        },
        //数据
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
          }
        ]
      }
    };
  },
  methods: {
    drawChinaMap() {
      var mycharts = echarts.init(document.getElementById("charts"));
      mycharts.setOption(this.option);
      mycharts.on("click", function(params) {
        console.log(params);
      });
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
    this.convertData();
    this.drawChinaMap();
    console.log(this.option);
  },
  computed: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#charts {
  width: 856px;
  height: 640px;
  background-color: #003077;
  margin: 110px auto 0 auto;
}
</style>
