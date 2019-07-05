<template>
  <!--一定要给宽高，不然会报错，container没有高度-->
  <div id="chart">echarts百度地图</div>
</template>

<script>
//引入json数据
import baiduJSON from "./baiduData";

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
	//   option: {
    //     backgroundColor: "#404a59", //整个画布背景
    //     //标题组件
    //     title: {
    //       text: "全国主要城市空气质量",
    //       subtext: "data from PM25.in",
    //       sublink: "http://www.pm25.in",
    //       left: "center",
    //       textStyle: {
    //         color: "#fff"
    //       }
    //     },
    //     //提示框组件
    //     tooltip: {
    //       trigger: "item",
    //       confine: true,
    //       formatter: p => {
    //         //自定义提示信息
    //         let dataCon = p.data;
    //         let txtCon;
    //         txtCon = dataCon.name + "<br>值:" + dataCon.value[2];
    //         return txtCon;
    //       }
    //     },
    //     //左下lengend
    //     visualMap: {
    //       min: 0, //最小
    //       max: 300, //最大
    //       splitNumber: 5, //共分5层
    //       color: ["#ff6300", "#eac736", "#50a3ba"], //颜色从高到低依次渐变
    //       textStyle: {
    //         color: "#fff"
    //       }
    //     },
    //     //地图区域样式
    //     geo: {
    //       map: "china",
    //       roam: true,
    //       label: {
    //         emphasis: {
    //           show: true
    //         },
    //         normal: {
    //           show: true, //显示省份标签
    //           textStyle: {
    //             color: "blue"
    //           }, //省份标签字体颜色
    //           position: "left"
    //         }
    //       },
    //       itemStyle: {
    //         //未激活样式
    //         normal: {
    //           areaColor: "#323c48",
    //           borderColor: "#111"
    //         },
    //         //激活样式
    //         emphasis: {
    //           areaColor: "#2a333d"
    //         }
    //       },
    //       scaleLimit: {
    //         max: 5,
    //         min: 1
    //       }
    //     },
    //     //数据
    //     series: [
    //       {
    //         name: "pm2.5",
    //         type: "scatter",
    //         coordinateSystem: "geo",
    //         data: [],
    //         symbolSize: 10,
    //         //直接在点上显示标签
    //         label: {
    //           show: false,
    //           formatter: "{b}",
    //           offset: [15, -15] //文字的相对偏移
    //         },
    //         //标签的样式
    //         itemStyle: {
    //           emphasis: {
    //             borderColor: "#fff",
    //             borderWidth: 1
    //           }
    //         }
    //       }
    //     ]
    //   },
	  	option : {
          animation: false,
          bmap: {
            center: [120.13066322374, 30.240018034923],
            zoom: 14,
            roam: true
          },
          visualMap: {
            show: true,
            top: "top",
            min: 0,
            max: 5,
            seriesIndex: 0,
            calculable: true,
            inRange: {
              color: ["blue", "blue", "green", "yellow", "red"]
            }
          },
          series: [
			
            {
              type: "heatmap",
              coordinateSystem: "bmap",
              data: null,
              pointSize: 5,
              blurSize: 6
            },
          ]
		}
	};
  },
  mounted() {
	  this.convertData()
	  this.aaa()
  },
  methods: {
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
        }
      }
    //   this.option.series[0].data = res;
	},
	aaa() {
    setTimeout(() => {
      let myChart = this.$echarts.init(document.getElementById("chart"));
      let pointsData = baiduJSON; //其实这一步是多余的
    //   把数据处理成需要的格式，只是把数值都改成了1，具体项目可以根据自己实际来处理
      var points = [].concat.apply(
        [],
        pointsData.map(function(track) {
          return track.map(function(seg) {
            return seg.coord.concat([1]);
          });
        })
      );
	  this.option.series[0].data = points
      let option = this.option;
      myChart.setOption(option);
      var bmap = myChart.getModel().getComponent("bmap").getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    }, 20);
  }
  },
  
};
</script>

<style>
#chart {
  width: 100%;
  height: 100%;
}
</style>