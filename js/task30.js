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

var aInput = document.getElementsByTagName('input');
var note = document.getElementsByTagName('span');
var btn = document.getElementsByTagName('button')[0];
var checkFlag, newkey;

//验证表单内容
function check(e) {
	var word = e.value.trim();
	if(getLen(word) == 0) {
		e.nextElementSibling.innerHTML = '输入不能为空';
	} else {
		if(e.id === 'username') {
			if(getLen(word) <= 16 && getLen(word) >= 4) {
				checkFlag = true;
			} else {
				e.nextElementSibling.innerHTML = '长度为4-16个字符';
			}
		}
		if(e.id === 'key') {
			if(e.value.match(/^[a-zA-Z0-9]{6,16}$/)) {
				newkey = e.value;
				checkFlag = true;
			} else {
				e.nextElementSibling.innerHTML = '长度为6-16的数字和字母';
			}
		}
		if(e.id === 'confirmkey') {
			if(e.value === newkey) {
				checkFlag = true;
			} else {
				e.nextElementSibling.innerHTML = '两次密码不同';
			}
		}
		if(e.id === 'email') {
			var reg = new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$', 'i');
            if (e.value.match(reg)) {
               checkFlag = true;
            } else {
               e.nextElementSibling.innerHTML = '邮箱格式错误';
            }
		}
		if(e.id === 'phone') {
			if(e.value.match(/^[0-9]{11}/)) {
				checkFlag = true;
			} else {
				e.nextElementSibling.innerHTML = '输入有效的手机号';
			}
		}
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

//初始化，隐藏所有提示信息
for(var j in note) {
	note[j].className = 'hidden';
}

//监听事件
for(var i = 0; i < aInput.length; i++) {
	//获得焦点时显示填写规则
	addEvent(aInput[i], 'focus', function() {
		this.nextElementSibling.className = 'hidden';
		this.parentNode.lastElementChild.className = '';
	});
	//失去焦点时验证
	addEvent(aInput[i], 'blur', function() {
		this.nextElementSibling.className = '';
		this.parentNode.lastElementChild.className = 'hidden';
		checkFlag = false;
		check(this);
		if(checkFlag) {
			this.nextElementSibling.innerHTML = '符合要求';
			this.style.border = '1px solid green';
			this.nextElementSibling.style.color = 'green';
		} else {
			this.style.border = '1px solid red';
			this.nextElementSibling.style.color = 'red';
		}
	});

}
//提交所有
var num=0;
function submitAll() {
	for(var i in note) {
		if(note[i].className === '' && note[i].innerHTML === '符合要求') {
			num++;
		}
	}
	if(num === note.length / 2) {
		return true;
	}
}
addEvent(btn, 'click', function() {
		if(submitAll()) {
			alert('提交成功');
		} else {
			alert('提交失败,请检查');
		}
	}
);