<template>
  <div id="map_yangan" style="width:1000px;height: 730px;margin-left:100px;"></div>
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
     
    };
  },
  methods: {
    drawChinaMap() {
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
        }
      }
      
        return res
    },
    convertData() {
      setTimeout(() => {
        var myChart = echarts.init(document.getElementById("map_yangan"));
        var option = {
          //标题设置
          title: {},
          tooltip: {
            trigger: "item"
          },
          //百度地图配置
          bmap: {
            //中心坐标，如下定义为北京
            center: [104.114129, 37.550339], //地图初始显示的缩放大小
            zoom: 5,
            roam: true, //地图上的一些特征属性设置
            mapStyle: {
              styleJson: [
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: {
                    color: "#021625"
                  }
                },
                {
                  featureType: "land",
                  elementType: "all",
                  stylers: {
                    color: "#404a59"
                  }
                },
                {
                  featureType: "railway",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "highway",
                  elementType: "all",
                  stylers: {
                    color: "#404a59"
                  }
                },
                {
                  featureType: "highway",
                  elementType: "labels",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "geometry",
                  stylers: {
                    color: "#404a59"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#404a59"
                  }
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "green",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "subway",
                  elementType: "all",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "manmade",
                  elementType: "all",
                  stylers: {
                    color: "#404a59"
                  }
                },
                {
                  featureType: "local",
                  elementType: "all",
                  stylers: {
                    color: "#404a59"
                  }
                },
                {
                  featureType: "arterial",
                  elementType: "labels",
                  stylers: {
                    visibility: "off"
                  }
                },
                {
                  featureType: "boundary",
                  elementType: "all",
                  stylers: {
                    color: "#000000"
                  }
                },
                {
                  featureType: "building",
                  elementType: "all",
                  stylers: {
                    color: "#404a59"
                  }
                },
                {
                  featureType: "label",
                  elementType: "labels.text.fill",
                  stylers: {
                    color: "#404a59"
                  }
                }
              ]
            }
          },
          //散点数据的配置
          series: [
            {
              name: "设备分布",
              type: "effectScatter",
              coordinateSystem: "bmap",
              //数据载入，这里需要自己定义自己的数据，主要是[{name : ***, value : ***}]
              data: this.drawChinaMap(),
              symbolSize: 10,
              //配置标签的显示
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              //配置散点的颜色
              itemStyle: {
                normal: {
                  shadowBlur: 2,
                  shadowColor: "#f4e925",
                  color: "#f4e925"
                }
              }
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }, 500);
    },
  },

  mounted() {
    this.convertData();
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
