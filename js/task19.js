$ = function(el) {return document.querySelector(el);};
$$ = function(el) {return document.querySelectorAll(el);};

var line = []; //队列

//判断input的值是否符合要求
function aCheck() {
	var aInput = $('input').value;
	if(line.length >= 60) {
		alert("数量达到上限");
		return false;
	} else {
		if(aInput.match(/^[0-9]+$/) && aInput >= 10 && aInput < 100) {
			return aInput;
		} else {
			alert("请输入10-100内的数字");
			return false;
		}
	}
}

//为队列line动态创建li,渲染图表
function renderLine() {
	var lis = '';
	for(var i = 0; i < line.length; i++) {
		lis += '<li value=' + i + '' + " " + 'style="height:' + line[i] * 4 + 'px;">' + line[i] + '</li>';
		//		console.log(lis);
	}
	$('#container').innerHTML = lis;
}

//按钮的函数功能
function pushLeft() {
	if(aCheck()) {
		line.unshift(aCheck());
		renderLine();
	}
}

function pushRight() {
	if(aCheck()) {
		line.push(aCheck());
		renderLine();
	}
}

function popLeft() {
	if(line.length) {
		line.shift();
		renderLine();
	} else {
		alert("Is empty");
	}
}

function popRight() {
	if(line.length) {
		line.pop();
		renderLine();
	} else {
		alert("Is empty");
	}
}

//点击删除，通过li的改变获取index值，删除队列中的元素
function del(d) {
	var index = d.getAttribute('value');
	line.splice(index, 1);
	renderLine();
}
//随机生成数据
function randomLine() {
	for(var i = 0; i < 60; i++) {
		line[i] = Math.floor(Math.random() * 100);
	}
	renderLine();
}

//排序
function sortLine() {
	var timer = null;
	var i=0,temp;
	
	timer = setInterval(run, 1000);
	function run() {
		renderLine();
		if(i < line.length) {
			for (var j = i + 1; j < line.length;j++) {
				if(line[i] > line[j]) {
					temp = line[i];
					line[i] = line[j];
					line[j] = temp;
					$$('#container li')[j].style.backgroundColor ='blue';
//					renderLine();
				}
			}
			i++;
		}
		else{
			clearInterval(timer);
			return;
		}
	}
}


//为button绑定函数
$('#leftin').addEventListener('click', pushLeft);
$('#rightin').addEventListener('click', pushRight);
$('#leftout').addEventListener('click', popLeft);
$('#rightout').addEventListener('click', popRight);
$('#random').addEventListener('click', randomLine);
$('#sort').addEventListener('click', sortLine);

$('#container').addEventListener('click', function(event) {
	if(event.target.nodeName.toLowerCase() === 'li') {
		del(event.target);
	}
});