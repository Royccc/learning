$ = function(el) {
	return document.querySelector(el);
};
$$ = function(el) {
	return document.querySelectorAll(el);
};
var line = []; //队列

//将input中的字符串按要求分隔成数组
function aCheck() {
	var aInput = $('#content').value.trim();
	if(aInput === '') {
		alert('请输入字符');
	} else { //正则表达式为筛选出分隔符，返回被分割的字符串，过滤出其中的空字符串
		return aInput.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g).filter(function(e) {
			if(e.length !== 0) {
				return true;
			}
		});

	}
}

//为队列line动态创建li
function renderLine() {
	var lis = '';
	for(var i = 0; i < line.length; i++) {
		lis += '<li value=' + i + '>' + line[i] + '</li>';
	}
	$('#container').innerHTML = lis;
}

//按钮的函数功能
function pushLeft() {
	for(var i in aCheck()) {
		line.unshift(aCheck()[i]); //aCheck()返回的是含有两个元素的数组，需要依次添加到line中			
	}
	renderLine();
	//					console.log(aCheck().length)
	//					console.log(line.length)
}

function pushRight() {
	for(var i in aCheck()) {
		line.push(aCheck()[i]);
	}
	renderLine();
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

//查询词匹配,对数组的每个元素进行字符串查找，并返回匹配的部分的索引
function search() {
	var bInput = $('#search-text').value;

	//模糊匹配 去掉不能识别的标示符 返回一个字符串
	//				function bCheck(b){
	//					return bInput = bInput.toLowerCase()||bInput.toUpperCase();
	//				}

	//为每次查找初始化样式
	renderLine(); 
	for(var i = 0; i < line.length; i++) {

		var index = line[i].indexOf(bInput);
		//console.log(index); //第i个元素line[i]的index位置第一次出现bInput
		if(index >= 0) {
			//选出与bInput匹配的子串substr\
			var substr = line[i].slice(index, index + bInput.length);

			//替换样式
			bSelect = line[i].replace(substr, '<span style="color:white;">' + substr + '</span>');
			$$('#container li')[i].innerHTML = bSelect;
		}
	}
}

//为button绑定函数
$('#leftin').addEventListener('click', pushLeft);
$('#rightin').addEventListener('click', pushRight);
$('#leftout').addEventListener('click', popLeft);
$('#rightout').addEventListener('click', popRight);

$('#container').addEventListener('click', function(event) {
	if(event.target.nodeName.toLowerCase() === 'li') {
		del(event.target);
	}
});
$('#search-button').addEventListener('click', search);