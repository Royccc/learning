
var treeNode = document.getElementById('root');
var divs = document.getElementsByTagName('div');
var aInput = document.getElementsByTagName('input')[0];

//广度遍历
function levelOrder(node) {
	if(node) {
		que.push(node);
		levelOrder(node.nextElementSibling); //先把所用同级节点输入
		node = que[index];
		index++;
		//		console.log(index) ;
		//		console.log(que[index]) ;
		levelOrder(node.firstElementChild);
	}
}
//深度遍历
function depthOrder(node) {
	if(node) {
		que.push(node);
		depthOrder(node.firstElementChild);
		depthOrder(node.nextElementSibling);
	}
}

//计时器动画
var timer;
function animate(que, aInputVal) {
	var i = 0;
	timer = setInterval(function() {
		if(i < que.length) {
			if(i == 0) {
				que[i].className = 'active';
			} else {
				que[i - 1].className = '';
				que[i].className = 'active';
			}
			//匹配字符
			if(que[i].firstChild.nodeValue.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g)[0] === aInputVal) {
				que[i].className = 'found';
				foundFlag = true;
			}
			i++;
		} else {
			que[i - 1].className = '';
			clearInterval(timer);
			if(foundFlag == false) {
				alert('没有找到');
			}
		}
	}, 500);
}

//判断输入字符
function checkInput(a) {
	if(a == '') {
		alert('请输入');
		return false;
	} else {
		return true;
	}
}


//选择节点
var selectFlag;
var selectNode = document.getElementsByClassName('select');
function selectFunc(e) {
	areset();
	e.className = e.className + 'select';
	selectFlag = true;
}
//点击选择
var sec = document.getElementsByTagName('section')[0];
sec.addEventListener('click', function(e) {
	if(e.target.nodeName.toLowerCase() === 'div') {
		selectFunc(e.target);
	}
})

//删除选中的节点。先判断是否选择
function deleteNode() {
	if(selectFlag) {
		selectNode[0].remove();
		selectFlag = false;
	} else {
		alert("请选择要删除的部分");
	}
}
var del = document.getElementById('del');
del.addEventListener('click', deleteNode);



//在选择的节点下增加子节点

function addNode() {
	var addInputValue  = document.getElementById('add-content').value.trim();
	if(checkInput(addInputValue)&&selectFlag) {
	    selectNode[0].appendChild(document.createElement('div'));
		selectNode[0].lastElementChild.innerHTML = addInputValue;
	}
}

var addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', function() {
	if(selectFlag) {
		addNode();
	} else {
		alert("请选择添加节点的位置");
	}
})

//初始化
function areset() {
	clearInterval(timer);
	que = [];
	index = 0;
	foundFlag = false;
	for(var i in divs) {
		divs[i].className = '';
	}
}


//点击按钮,不知道用什么方法简化，switch方法失败，或者应该在input button外层加个div 事件委托
var btn = document.getElementsByTagName('button');
btn[0].addEventListener('click', function() {
	areset();
	depthOrder(treeNode);
	animate(que);
})
btn[1].addEventListener('click', function() {
	areset()
	levelOrder(treeNode);
	animate(que);
})
btn[2].addEventListener('click', function() {
	areset();
	var aInputVal = aInput.value.trim();
	if(checkInput(aInputVal)) {
		depthOrder(treeNode);
		animate(que, aInputVal);
	}
})
btn[3].addEventListener('click', function() {
	areset();
	var aInputVal = aInput.value.trim();
	if(checkInput(aInputVal)) {
		levelOrder(treeNode);
		animate(que, aInputVal);
	}
})