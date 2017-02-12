var btn = document.getElementById('command');
var td = document.getElementsByTagName("td"); //var active = document.getElementById('active');

//初始化active的坐标
var spot = {
	x: 1,
	y: 2,
	direction: 0
};
//建立坐标系
var tr = document.getElementsByTagName("tr");
function axix() {
	for(var i = 0, len1 = tr.length; i < len1; i++) {
		var td = tr[i].getElementsByTagName("td");
		for(var j = 0, len2 = td.length; j < len2; j++) {
			if(i >= 0 && j === 0) {
				tr[i].firstElementChild.innerHTML = i; // 标注行数
			}
			if(i === 0 && j >= 0) {
				td[j].innerHTML = j; // 标注列数
			}
		}
	}
}
axix();
getSpot();

//显示当前active的坐标
function getSpot() {
	tr[spot.x].getElementsByTagName('td')[spot.y].innerHTML = "<div id = 'active'></div>";
	var active = document.getElementById('active');
	active.style.border='';
	switch(spot.direction){
		case 0 :active.style.borderTop = '10px solid blue';
		active.style.height = '26px';break;
		case 90:active.style.borderRight = '10px solid blue';
		active.style.height = '36px';break;
		case 180:active.style.borderBottom = '10px solid blue';
		active.style.height = '26px';break;
		case 270:active.style.borderLeft = '10px solid blue';
		active.style.height = '36px';break;
	}
}

//确定go的方向
function go() {
	if((spot.x === 0 && spot.direction === 0) || (spot.x === 9 && spot.direction === 180) || (spot.y === 0 && spot.direction === 270) || (spot.y === 9 && spot.direction === 90)) {
		alert('已到尽头');
	} else {
	tr[spot.x].getElementsByTagName('td')[spot.y].innerHTML = '';
		if(spot.direction === 0) {
			spot.x--;
		}
		if(spot.direction === 180) {
			spot.x++;
		}
		if(spot.direction === 270) {
			spot.y--;
		}
		if(spot.direction === 90) {
			spot.y++;
		}
	}
}

//旋转
function turnRight(){
	var active = document.getElementById('active');
	spot.direction = (spot.direction + 90) % 360;
}
function turnLeft(){
	var active = document.getElementById('active');
	spot.direction =((spot.direction - 90) +360) % 360;
} 

//点击执行命令
btn.onclick = function() {
	var aInput = document.getElementById("command-text").value.toLowerCase();
	if(aInput === 'go') {
		go();
	}
	if(aInput === 'tun rig'){
	turnRight();
	}
	if(aInput === 'tun lef'){
	turnLeft();
	}
	getSpot();
};

//用一个数组定位格子； 指令函数；点击调用