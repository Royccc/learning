// 跨浏览器兼容的工具函数
function addEvent(element, type, handler) {
	if(element.addEventListener) {
		element.addEventListener(type, handler);
	} else if(element.attachEvent) {
		element.attachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler;
	}
}
//定义全局变量
var treeModule = document.getElementById('tree-module');
var treeNode = document.getElementsByClassName('nodebody-hidden');

//增加节点
var overLopFlag = false;
var addBtn = document.getElementsByClassName('add-btn');
var delBtn = document.getElementsByClassName('del-btn');

function addNode(e, addInput) { //e是label
	var addChild = document.createElement('div');
	addChild.className = 'nodebody-hidden';
	addChild.innerHTML = '<label class="tree-title"><span class="right-arrow"></span> <span class="tree-title-content">' + addInput + '</span><span class="del-btn">×</span><span class="add-btn">+</span></label>'
	e.parentNode.appendChild(addChild);
	overLopFlag = true; //展开时，即箭头向下时为true
}

//展开、折叠节点
function overLop(e) { //e是label节点
	var arrow = e.firstElementChild; //arrow是小箭头
	if(arrow.className.trim() === 'right-arrow') {
		arrow.className = 'down-arrow';
		for(var i = 1; i < e.parentNode.children.length; i++) {
			e.parentNode.children[i].style.display = 'block';
		}
	} else if(arrow.className.trim() === 'down-arrow') {
		if(overLopFlag) {
			for(var i = 1; i < e.parentNode.children.length; i++) {
				e.parentNode.children[i].style.display = 'block';
			}
		} else {
			arrow.className = 'right-arrow';
			for(var i = 1; i < e.parentNode.children.length; i++) {
				e.parentNode.children[i].style.display = 'none';
			}
		}
	}
	overLopFlag = false;
}

//点击绑定事件，
addEvent(treeNode[0], 'click', function(e) {
	if(e.target.className.split('-')[1] === 'arrow' || e.target.className === 'tree-title-content') {
		overLop(e.target.parentNode);
	}
	if(e.target.className === 'add-btn') {
		//判断字符是否合法，
		var addInput = prompt('新建一个笔记本');
		if(addInput == '') {
			alert('请输入名称');
		} else if(addInput) {
			addNode(e.target.parentNode, addInput);
			//判断当前节点状态，如果折叠则展开，展开则保持
			overLop(e.target.parentNode);
		}
	}
	//删除节点
	if(e.target.className === 'del-btn') {
		e.target.parentNode.parentNode.remove();
	}
});

//深度遍历
var que = [];
function depthOrder(node) {
	if(node) {
		if(node.className.trim().split(' ')[0] === 'nodebody-hidden') {
			que.push(node);
		}
		depthOrder(node.firstElementChild);
		depthOrder(node.nextElementSibling);
	}
}

//匹配动画
var timer;
var foundFlag;
function animate(que, sInput) {
	var i = 0;
	timer = setInterval(function() {
		if(i < que.length) {
			if(i == 0) {
				que[i].className += ' ' + 'active';
			} else {
				que[i - 1].className = que[i - 1].className.replace('active', ' ');
				que[i].className += ' active';
			}
			overLop(que[i].firstElementChild);
			//匹配字符
			if(que[i].children[0].children[1].innerHTML.trim() === sInput) {
				que[i].className += ' found';
				foundFlag = true;
			}
			i++;
			overLopFlag = true;
		} else {
			que[i - 1].className = que[i - 1].className.replace('active', ' ');
			clearInterval(timer);
			if(foundFlag == false) {
				alert('没有找到');
			}
		}
	}, 500);

}

var search = document.getElementById('search');
var searchBtn = document.getElementById('search-btn');
var clearBtn = document.getElementById('clear-btn');
//搜索.每次搜索前初始化
addEvent(searchBtn, 'click', function() {
	areset();
	var sInput = search.value.trim();
	if(sInput === '') {
		alert('请输入');
	} else {
		depthOrder(treeModule);
		animate(que, sInput);
	}
})

//初始化
function areset() {
	clearInterval(timer);
	foundFlag = false;
	overLopFlag = true;
	for(var i in treeNode) {
		treeNode[0].className = 'nodebody-hidden' + ' ' + 'nodebody-show';
		treeNode[i].className = 'nodebody-hidden';
	}
/*	for(var i=0;i<treeNode.length;i++){
		treeNode[i].className += " default";
	}//这样其实多次搜索的话类名会无限增多*/
	que = [];
}