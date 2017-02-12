

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(500),
  "广州": randomBuildData(500),
  "深圳": randomBuildData(500),
  "成都": randomBuildData(500),
  "西安": randomBuildData(500),
  "福州": randomBuildData(500),
  "厦门": randomBuildData(500),
  "沈阳": randomBuildData(500)
};



/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 用于渲染图表的数据
var chartData = {};//{日期：数字}
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

var time = document.getElementById('form-gra-time');
var city = document.getElementById('city-select');
var wrap = document.getElementsByClassName('aqi-chart-wrap')[0];

/**
 * 渲染图表
 */ 
function renderChart() {
	var data = '';
	var color = '';
	for(var item in chartData){
//		console.log(item);
        color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
		data += '<li title="'+item+''+" 空气指数"+''+chartData[item]+'" style="height:'+chartData[item]+'px;width:5px;background-color:'+color+';"></li>';
	}	
	wrap.innerHTML = data;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(graTime) {
  // 确定是否选项发生了变化 
//var graTime = event.checked.target.value;
  if(pageState.nowGraTime !== graTime){
  	pageState.nowGraTime = graTime;
  }
  else{
  	return;
  }
  // 设置对应数据
  initAqiChartData() ;

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(graCity) {
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity !== graCity){
  	pageState.nowSelectCity = graCity;
  }
  else{
  	return;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}
 
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	time.addEventListener('click',function(event){
		if(event.target.nodeName.toLowerCase()==='input'){
			var graTime = event.target.value;
	  	graTimeChange(graTime);
		}
	});
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citys ='';
  for(var initCity in aqiSourceData){
  	citys += '<option>'+initCity+'</option>';
  }
  city.innerHTML = citys;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city.addEventListener('change',function(event){
		var graCity = event.target.value;
		citySelectChange(graCity);
	});
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var countData = aqiSourceData[pageState.nowSelectCity];
  if(pageState.nowGraTime === 'day'){
  	chartData = countData;
  }
  if(pageState.nowGraTime === 'week'){
  	 chartData = {};
  	var weekData=0, weeknum=0, num=0;
  	for(var wData in countData){
  			weekData += countData[wData];
  			num++;
  			if ((new Date(wData)).getDay() == 6 ) {
  			 	weeknum ++;
  				chartData['第'+weeknum+'周'] = Math.floor(weekData/num);
  				weekData=0;
  				num=0;
  			}
  	}
  	if(num) {
      weeknum++;
      chartData['第'+weeknum+'周'] = Math.floor(weekData/num);
    }//保证最后一周若不满也能算一周
  }
  if(pageState.nowGraTime === 'month'){
  	 chartData = {};
  	var monthData=0,num=0,monthnum=0;
  	for(var mData in countData){
  		monthData += countData[mData];
  		num++;
  		if ((new Date(mData)).getMonth() !== monthnum) {
  			monthnum ++;
  			chartData['第'+monthnum+'月'] = Math.floor(monthData/num);
  			monthData=0;
  			num=1;
  		}
  	}
  	if(num){
  		monthnum++;
  		chartData['第'+monthnum+'月'] = Math.floor(monthData/num);
  	}
  }
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
