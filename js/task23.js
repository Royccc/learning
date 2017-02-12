var btn = document.getElementsByTagName('button');
var treeNode = document.getElementById('root');

//广度遍历
function levelOrder(node) {
	if(node !== null) {
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

function animate(que, aInput) {
	var i = 0;
	timer = setInterval(function() {
		if(i < que.length) {
			if(i == 0) {
				que[i].className = 'active';
			} 
			else {
				que[i - 1].className = '';
				que[i].className = 'active';
			}
			//匹配字符
			if(que[i].firstChild.nodeValue.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/g)[0] === aInput) {
				que[i].className = 'found';
				foundFlag = true;
			}
			i++;
		} 
		else {
			que[i - 1].className = '';
			clearInterval(timer);
			if(foundFlag == false) {
				alert('没有找到');
			}
		}
	}, 500);
}

//判断输入字符
var aInput;
function checkInput() {
	aInput = document.getElementsByTagName('input')[0].value.trim();
	if(aInput == '') {
		alert('请输入');
		return false;
	} else {
		return true;
	}
}

//初始化
function areset() {
	clearInterval(timer);
	que = [];
	index = 0;
	foundFlag = false;
	foundNumber = 0
	var divs = document.getElementsByTagName('div');
	for(var i in divs) {
		divs[i].className = '';
	}
}

//点击按钮,不知道用什么方法简化，switch方法失败，或者应该在input button外层加个div 事件委托
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
	if(checkInput()) {
		depthOrder(treeNode);
		animate(que, aInput);
	}
})
btn[3].addEventListener('click', function() {
	areset();
	if(checkInput()) {
		levelOrder(treeNode);
		animate(que, aInput);
	}
})