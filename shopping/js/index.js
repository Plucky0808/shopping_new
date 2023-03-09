window.addEventListener('load', function() {
	// 1.获取元素
	var arrow_l = document.querySelector('.arrow-l');
	var arrow_r = document.querySelector('.arrow-r');
	var focus = document.querySelector('.focus');
	var focusWidth = focus.offsetWidth;
	// 2.鼠标经过focus时 显示侧边阴影部分
	focus.addEventListener('mouseenter', function() {
		arrow_r.style.display = 'block';
		arrow_l.style.display = 'block';
		//鼠标进入focus 时 停止自动播放 即停止定时
		clearInterval(timer);
		timer = null; //清除定时器变量
	});
	//3.鼠标离开focus时 隐藏侧边阴影部分
	focus.addEventListener('mouseleave', function() {
		arrow_r.style.display = 'none';
		arrow_l.style.display = 'none';
		//鼠标离开时自动播放
		timer = setInterval(function() {
				//手动调用定时器
				arrow_r.click();
			} , 2000);
		
	});
	// 4.动态获取得到的小圆圈 使得小圆圈的数量等于图片的数量
	var ul = focus.querySelector('ul');
	var ol = focus.querySelector('.circle');
	for (var i = 0; i < ul.children.length; i++) {
		//创建li
		var li = document.createElement('li');
		//设置一个index自定义属性 记录当前的索引号
		li.setAttribute('index', i);
		// 将li插入倒ol中
		ol.appendChild(li);
		//点击哪个li 就给哪个li添加current 利用排他思想
		li.addEventListener('click', function() {
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = '';
			}
			this.className = 'current';
			//点击li 则移动的距离位对应的索引号* 图片宽度  
			//获取每一张图片的宽度 以及对应的 索引号
			var index = this.getAttribute('index');
			// 当我们点击某个li 则将索引号给当前的num
			num = index;
			// 当我们点击某个li 则将对应的索引号给当前的circle 
			circle = index;
			// 点击左下角的按钮 则移动对应的距离
			animate(ul, -index * focusWidth);
		})
	}
	// 再将第一个li命名位current
	ol.children[0].className = 'current';
	// 声明一个全局变量num 让它作为右箭头的点击事件的变量   
	var num = 0;
	//声明一个变量 让圆圈随着右侧箭头而动
	var circle = 0;
	//使用节流阀 定义一个变量flag 锁住函数
	var flag = true;
	//5.克隆第一张li 不用在html页面中复制 克隆之后直接插入ul之中
	var first = ul.children[0].cloneNode(true);
	ul.appendChild(first);
	arrow_r.addEventListener('click', function() {
		if(flag) {
			flag = false;
			//6.利用无缝滚动原理 滚动图片 复制第一张图片到最后 当滚动到最后一张继续往下按时 迅速跳转到第一张 然后继续往下走
			//因为有5张图片 索引号是如下则为动态
			if (num == ul.children.length - 1) {
				ul.style.left = 0;
				num = 0;
			}
			num++;
			animate(ul, -num * focusWidth ,function () {
				flag = true;
			});
			// 因为小圆圈是跟随着一起变化的 所以在这里也写circle++ 
			circle++;
			// 当走到最后一张图片时 小圆圈还原从头开始 
			if (circle == ol.children.length) {
				circle = 0;
			}
			circleChange();
		};
	});

	arrow_l.addEventListener('click', function() {
		if(flag) {
			flag = false;
			//6.利用无缝滚动原理 滚动图片 复制第一张图片到最后 当滚动到最后一张继续往下按时 迅速跳转到第一张 然后继续往下走
			//因为有5张图片 索引号是第一张图片时 向左走 则迅速切换位最后一张图片
			if (num == 0) {
				num = ul.children.length - 1; //最后一张图片的索引号
				ul.style.left = -num * focusWidth;
			}
			num--;
			animate(ul, -num * focusWidth , function() {
				flag = true;
			});
			// 因为小圆圈是跟随着一起变化的 所以在这里也写circle--
			circle--;
			// 当走到最后一张图片时 小圆圈还原从头开始 
			if (circle < 0) {
				circle = ol.children.length - 1;
			}
			circleChange();
		}
	});
//代码优化  左侧按钮和右侧按钮共同调用
	function circleChange() {
		//排他思想 清除其他样式之后  利用for循环
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		}
		ol.children[circle].className = 'current';
	};
	//7.设置轮播图自动播放功能
	var timer = setInterval(function() {
		//手动调用定时器
		arrow_r.click();
	} , 2000);

	// 获取表单用户名得到的参数
	 
	
});

