window.addEventListener('load', function(){
    // 1.首先获取元素 鼠标经过图片时遮挡层以及大图标显示
     var previous_img = document.querySelector(".previous_img")
      var mask = document.querySelector('.mask');
      var bg = document.querySelector('.bg1_bg');

      previous_img.addEventListener('mouseover' , function(){
        mask.style.display = 'block';
        bg.style.display = 'block';

      })  
      previous_img.addEventListener('mouseout' , function(){
        mask.style.display = 'none';
        bg.style.display = 'none';
        
      })
      // 2.鼠标移动的时候黄色遮罩层跟着走   以后编程先养成写思路的习惯再写代码 解决问题思路一条条罗列出来
      // 2.1首先获取鼠标在盒子内部的坐标 鼠标网页中的坐标 - 盒子的偏移量
        previous_img.addEventListener('mousemove', function(e){
          var x = e.pageX - this.offsetLeft;
          var y = e.pageY - this.offsetTop;
          // 2.2 将遮罩层向上偏移一半  向左偏移一半 就会使鼠标在中间 将鼠标的坐标赋值给遮罩层就会实现移动
          var maskX = x - mask.offsetWidth / 2 ;
          var maskY = y - mask.offsetHeight / 2 ;
          var maskMax = previous_img.offsetWidth - mask.offsetWidth;
          // 2.3限制遮罩层的移动范围  当超过范围时 遮罩层移动的宽度 ：小图片盒子宽度 - 遮挡层盒子宽度  如果小于0 就是0
          if(maskX <= 0) {
            maskX = 0;
          }else if(maskX >= maskMax) {
            maskX = maskMax;
          } 
          if(maskY <= 0) {
            maskY = 0;
          }else if(maskY >= maskMax) {
            maskY = maskMax;
          }
          mask.style.left = maskX + 'px';
          mask.style.top = maskY + 'px';
        
          // 3遮罩层移动时大图片也跟着走 
        // 3.1大图片移动距离bigX/Y = （遮挡层移动距离:maskX/Y  * 大图片最大移动距离:bigMax ） / 遮挡层最大移动距离:maskMax
            var bigImg = document.querySelector('.bigImg');
            var bigMax = bigImg.offsetWidth - bg.offsetWidth; 
            var bigX = maskX * bigMax / maskMax ;  //大图片x轴最大移动距离
            var bigY = maskY * bigMax / maskMax ;  //大图片Y轴最大移动距离
            bigImg.style.left = -bigX + 'px';
            bigImg.style.top = -bigY + 'px';
        } )
        
     
})
