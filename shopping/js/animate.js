function animate(obj, target, callback) {
	//当我们不断点击的时候 就会不停的调用函数 因此需要清除定时器 只保留一个定时器执行
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		//使用obj.timer 可以避免引起歧义 
		var step = (target - obj.offsetLeft) / 10;
		// 正值则往大取整，负值则往小取整
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		//缓动动画 （目标值- 现在的值 ） / 10;
		if (obj.offsetLeft == target) {
			clearInterval(obj.timer);
			//回调函数写在定时器结束的地方 先判断是否有回调函数 在调用 把函数当成一个参数
			if (callback) {
				callback();
			}
		} else {
			obj.style.left = obj.offsetLeft + step + 'px';
		}

	}, 15);
}
