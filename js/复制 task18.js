    /* 帮我绑定好回调。sort和random要插进去就太丑了，暂时舍弃 */
    function deal(func, succ) {
      var args = [].slice.call(arguments, 2);
      return function(e) {
        if (inAnimation) {
          alert('in animation');
          return;
        }
        try {
          var arg = args.map(function(item) {
            return typeof item === "function" ? item(e) : item;
          });
          var result = func.apply(data, arg);
          if (succ != null) {
            succ(result);
          }
        } catch (ex) {
          if (ex.message != '')
            alert(ex.message);
        }
        render();
      };
    }
    /* 你输了什么？ */
    function getInputValue() {
      var numStr = $('input').value;
      if (!validateStr(numStr)) throw new Error('input error');
      if (data.length > 59) throw new Error('no room');
      var val = parseInt(numStr);
      if (val < 10 || val > 100) throw new Error('out of range');
      return val;
    }
    /* 你单击了什么？ */
    function getClickIndex(e) {
      var node = e.target;
      if (node.id == "result") throw new Error(''); // 中断你们，破坏流程，毁灭世界
      return [].indexOf.call(node.parentNode.children, node);
    }
    /* 不要太勤奋，lazy */
    function getLastIndex() {
      return data.length - 1;
    }
    /* 过滤掉万恶的QA和小白 */
    function validateStr(str) {
      return /\d+/.test(str);
    }
    /* 全部都绑起来 */
    $('#left-in').onclick = deal([].unshift, null, getInputValue);
    $('#right-in').onclick = deal([].push, null, getInputValue);
    $('#left-out').onclick = deal([].shift, window.alert);
    $('#right-out').onclick = deal([].pop, window.alert);
    $('#result').onclick = deal([].splice, null, getClickIndex, 1);