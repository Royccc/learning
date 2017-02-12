// 跨浏览器兼容
function addEvent(element, type, handler) {
	if(element.addEventListener) {
		element.addEventListener(type, handler);
	} else if(element.attachEvent) {
		element.attachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler;
	}
}

$ = function(el) {
	return document.querySelector(el);
};
var data = {
	"username": ["名称", "text", "长度为4-16个字符", "格式正确", "格式错误", "不能为空"],
	"key": ["密码", "password", "长度为6-16个字符", "格式正确", "格式错误", "不能为空"],
	"confirmkey": ["确认密码", "password", "再次输入密码", "密码一致，输入正确", "密码不一致", "不能为空"],
	"email": ["邮箱", "email", "请输入邮箱地址", "格式正确", "格式错误", "不能为空"],
	"phone": ["手机", "text", "请输入手机号码", "输入正确", "格式错误", "不能为空"]
};

//自定义选择创建需要的表单
function selectInput() {
	var formList = document.getElementsByName('formList');
	for(var i in formList) {
		//	console.log(formList[1].checked)
		if(formList[i].checked) {
			createInput(formList[i].value);
		}
	}
}
//渲染添加的表单
function createInput(e) { //e是多选框的value值
	var eachInput = '<p><label for="' + e + '">' + data[e][0] + '：</label><input id="' + e + '" type="' + data[e][1] + '" /><span></span></p>';
	if(e === 'key') {
		eachInput += '<p><label for="confirmkey">' + data["confirmkey"][0] + '：</label><input id="confirmkey" type="' + data["confirmkey"][1] + '" /><span></span></p>';
	}
	$('#formContent').innerHTML += eachInput;
}

//各input验证
var checkFlag;

function checkInput(e) { //e是当前的input
	if(e.id === 'username') {
		var word = e.value.trim();
		if(getLen(word) <= 16 && getLen(word) >= 4) {
			checkFlag = true;
		}
	}
	if(e.id === 'key') {
		if(e.value.match(/^[a-zA-Z0-9]{6,16}$/)) {
			checkFlag = true;
		}
	}
	if(e.id === 'confirmkey' && e.value === key.value && e.value) {
		checkFlag = true;
	}
	if(e.id === 'email') {
		var reg = new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$', 'i');
		if(e.value.match(reg)) {
			checkFlag = true;
		}
	}
	if(e.id === 'phone') {
		if(e.value.match(/^[0-9]{11}/)) {
			checkFlag = true;
		}
	}
}

//检查key和confirmkey,失败的函数
function confirmKey() {
	var k = $('#confirmkey');
	if($('#key').value !== k.value) {
		k.style.border = '1px solid red';
		k.nextElementSibling.style.color = 'red';
		k.nextElementSibling.innerHTML = data['confirmkey'][4];
	} else if(k.value && $('#key').value === k.value) {
		k.style.border = '1px solid green';
		k.nextElementSibling.style.color = 'green';
		k.nextElementSibling.innerHTML = data['confirmkey'][3];
	}
}

//计算字符串所占字符数
function getLen(word) {
	var len = 0;
	for(var i = 0; i < word.length; i++) {
		var wordCode = word.charCodeAt(i);
		if(wordCode >= 0 && wordCode <= 128) {
			len++;
		} else {
			len += 2;
		}
	}
	return len;
}

//监听事件
function inCheck() {
	var aInput = $('#formContent').getElementsByTagName('input');
	for(var i = 0, len = aInput.length; i < len; i++) {
		//获得焦点时显示填写规则
		addEvent(aInput[i], 'focus', function() {
			this.nextElementSibling.innerHTML = data[this.id][2];
		});
		//失去焦点时验证
		addEvent(aInput[i], 'blur', function() {

			checkInput(this);
			if(checkFlag) {
				this.nextElementSibling.innerHTML = data[this.id][3];
				this.style.border = '1px solid green';
				this.nextElementSibling.style.color = 'green';

				checkFlag = false;
			} else {
				if(getLen(this.value.trim()) == 0) {
					this.nextElementSibling.innerHTML = data[this.id][5];
				} else {
					this.nextElementSibling.innerHTML = data[this.id][4];
				}

				this.style.border = '1px solid red';
				this.nextElementSibling.style.color = 'red';
			}
			if($('#key')) {
				confirmKey();
			}
		});
	}
}

//点击生成表单
addEvent($('#productBtn'), 'click', function() {
	$('#formContent').innerHTML = '';
	selectInput();
	inCheck();
});

//提交函数
function submitAll() {
	var num = 0;
	var aInput = $('#formContent').getElementsByTagName('input');
	for(var i = 0, len = aInput.length; i < len; i++) {
		if(aInput[i].style.border === '1px solid green') {
			num++;
		}
	}
	if(num === aInput.length && aInput.length) {
		return true;
	}
}
//点击提交
addEvent($('#submitBtn'), 'click', function() {
	if(submitAll()) {
		alert('提交成功');
	} else {
		alert('提交失败,请检查');
	}
});