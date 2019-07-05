<template>
  <div style="height:100%">
    <div id="brtmap"></div>

		<div class="console">
			<div class="title">点击地图-查看效果</div>
			<div class="content" id="content" @click="ccc">
				-
			</div>
		</div>
  </div>
</template>
<script type="text/javascript" src="https://files.brtbeacon.net/BRTMap/3D/brtmap-2.3.2.js"></script>
<script>
import pic from '@/assets/marker.png'
import arr from '@/api/aaa.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
	  msg: 'Welcome to Your Vue.js App',
	  buildingID:'07550063',
	  token:'ef124b1221b5447393203e648bdec08e',
	  marker:null,
	  list:[],
	  arr:arr
    }
  },
  
  methods:{
		ccc(){
			console.log(this.list);
			this.list[9].remove()
		},
		aaa(){
			var buildingID = this.buildingID;
			var token = this.token;
			//初始化地图
			setTimeout(()=>{
				var $map = new brtmap.Map({
				container: 'brtmap',
				token:token,
				buildingID: buildingID
			});
			let arr = this.arr
			var $marker
			// mapready

			var _this = this
			$map.on('mapready',function(){
				arr.forEach((item,index) => {
					$marker = new brtmap.Symbol.Marker({
						url:pic,
						size:0.8,
						offset:[0,0],
						angle:item.angel ? item.angel : 0,
						type: 'map',
					}).addTo($map);
					let obj1 = {
						lng:item.lng,
						lat:item.lat
					}
					$marker.setLnglat(obj1);
					_this.list[index] = $marker
					$marker.on('contextmenu',function(e){
						console.log(e);	
					})
				})
					
			});				
			
				var canvas = document.getElementsByClassName('mapboxgl-canvas')[0]
				canvas.style.position = 'relative'
			},1000)
			
		},

  },
  mounted(){
		this.aaa()
	
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
	height:100%;
}
#brtmap {
	height: 100%;
}
* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.console { position: absolute; left: 80px; top: 10px; background-color: #ffffff; border-radius: 3px; box-shadow: 0 0 3px #CCCCCC; font-size: 13px; z-index: 10;}
.console > .title { line-height: 36px; padding: 0 10px; border-bottom: 1px solid #eeeeee; color: #666666;}
.console > .content { padding: 10px;}

.button{ display: block; width: 65px; line-height: 30px; text-align: center; border: none; border-radius: 3px; background-color: #0099FF; color: #ffffff; cursor: pointer;}




</style>
