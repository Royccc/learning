			$ = function(el) {return document.querySelector(el);};
			var line = []; //队列
			
			//判断input的值是否符合要求
			function aCheck(){
				var aInput = $('input').value;
				if(!aInput.match(/^[0-9]+$/)){
					alert("请输入一个数字！");
					return false;
				}
				return aInput;
			}

			//为队列line动态创建li
			function renderLine(){
				var lis = '';
				for(var i=0;i<line.length;i++){
					lis += '<li value='+i+'>'+line[i]+'</li>';
				}
				$('#container').innerHTML = lis;
			}
			
			
			//按钮的函数功能
			function pushLeft(){
				if(aCheck()){
					line.unshift(aCheck());
					renderLine();
				}
//				console.log(line);
			}
			function pushRight(){
				if(aCheck()){
					line.push(aCheck());
					renderLine();
				}
			}
			function popLeft(){
				if(line.length){
					line.shift();
					renderLine();
				}
				else{
					alert("Is empty");
				}
			}
			function popRight(){
				if(line.length){
					line.pop();
					renderLine();
				}
				else{
					alert("Is empty");
				}
			}
			
			//点击删除，通过li的改变获取index值，删除队列中的元素
			function del(d){
				var index = d.getAttribute('value');
					line.splice(index,1);
					renderLine();
			}
			
			
			  
			//为button绑定函数
			$('#leftin').addEventListener('click',pushLeft);
			$('#rightin').addEventListener('click',pushRight);
			$('#leftout').addEventListener('click',popLeft);
			$('#rightout').addEventListener('click',popRight);
			
			$('#container').addEventListener('click',function(event){
				if(event.target.nodeName.toLowerCase() === 'li'){
					del(event.target);
				}
			});
			
			
