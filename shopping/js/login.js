        var li = document.querySelector('#txq');
		var h = window.location.search;
		var i = h.indexOf('=');
		var c = h.substr(i + 1);
		li.innerText = '欢迎'+ c;