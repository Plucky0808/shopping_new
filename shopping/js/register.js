window.addEventListener('load', function(){
    var user = document.querySelector('#user');
    //  用户登录框
    var phone = document.querySelector('#phone');
    //  手机模块
    var psd = document.querySelector('#psd');
    // 输入密码
    var psd2 = document.querySelector('#psd2');
    var spans = document.querySelectorAll('span');
    // 确认密码
    // 用户登录模块start---------------  1.鼠标光标定到用户框时 显示请输入用户名
    var myp = document.querySelectorAll('p');
    var user_p = myp[0];
    user.addEventListener('focus', function () {
        user_p.style.display = 'block';
        user_p.style.color = '#00aeec';
        user_p.innerHTML = '请输入用户名,长度为6-12位字符推荐使用中文';
    })
    //  2.光标离开时 如果未输入内容则显示用户名不能为空
    user.addEventListener('blur', function () {
        var reg = /^[\w\u4e00-\u9fa5]{6,12}$/;  //正则表达式
        if (this.value == '') {
            user_p.innerHTML = '<i class="error_icon"></i> 用户名不能为空';
            user_p.style.color = '#C81623'; 
        }else if (!reg.test(user.value)) {
            user_p.innerHTML = '<i class="error_icon"></i> 长度不符合要求或存在非法字符';
            user_p.style.color = '#C81623'; 
        }else {
            user_p.innerHTML = '<i class="success_icon"></i> 正确';
            user_p.style.color = '#40b83f'; 
        }
    })
    // 用户登录模块end---------------

    // 3.手机号模块start  同理
    var phone_p = myp[1];
    phone.addEventListener('focus', function () {
        phone_p.style.display = 'block';
        phone_p.style.color = '#00aeec';
        phone_p.innerHTML = '请输入手机号';
    })
    //  光标离开时 如果未输入内容则手机号码不能为空
    phone.addEventListener('blur', function () {
        var reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
        if (this.value == '') {
            phone_p.innerHTML = '<i class="error_icon"></i>手机号码不能为空';
            phone_p.style.color = '#C81623';
        } else if(!reg.test(phone.value)) {
            phone_p.innerHTML = '<i class="error_icon"></i> 请输入正确手机号';
            phone_p.style.color = '#C81623';
        }else {
            phone_p.innerHTML = '<i class="success_icon"></i> 正确';
            phone_p.style.color = '#40b83f'; 
        }
    })
    // 4.手机号模块end 

    // 5.密码输入框start------
    var psd_p = myp[2];
    psd.addEventListener('focus', function () {
        psd_p.style.display = 'block';
        psd_p.style.color = '#00aeec';
        psd_p.innerHTML = '请输入8-12位密码';
    })
    //  光标离开时 如果未输入内容则密码不能为空 长度要介于8-12位之间 反之则错误
    psd.addEventListener('blur', function(){
        var value = this.value;
        if(value == '') {
            psd_p.innerHTML = '<i class="error_icon"></i>密码不能为空';
            psd_p.style.color = '#C81623'; 
        } 
    })
    // 验证密码强度
    psd.addEventListener('change', function () {
        var value = this.value;
        pwd(value);
        if(value == '') { 
        clearOther();
        }
    })

    // 6.密码输入框end--------

    //7.密码确认start----------
    var psd2_p = myp[3];
    psd2.addEventListener('focus', function () {
        psd2_p.style.display = 'block';
        psd2_p.style.color = '#00aeec';
        psd2_p.innerHTML = '请输入密码';
    })
    //  光标离开时 如果未输入内容则密码不能为空
    psd2.addEventListener('blur', function () {
        if (this.value == '') {
            psd2_p.innerHTML = '<i class="error_icon"></i>密码不能为空';
            psd2_p.style.color = '#C81623';
        }else if (this.value !== psd.value) {
            psd2_p.innerHTML = '<i class="error_icon"></i>密码输入不一致，请重新输入';
            psd2_p.style.color = '#C81623';
        }else {
            psd2_p.innerHTML = '<i class="success_icon"></i> 正确';
            psd2_p.style.color = '#40b83f'; 
        }
        
    })
    //8.密码确认end---------

    // 跨页面传递参数 
  

    //  验证密码强度函数
    function pwd (value){
        if(/^[a-zA-Z0-9]{8,12}$/.test(value)){
            //判断条件为是否为中级
               if(/[A-Z]/.test(value)&&/[a-z]/.test(value)&&/\d/.test(value)) {
                   //强
                   clearOther();
                   spans[2].classList.add('active')
               }else if (/^[A-Z]+$/.test(value)|| /^[a-z]+$/.test(value)||/^\d+$/.test(value)) {
                   //弱
                   clearOther();
                   spans[0].classList.add('active');
               }else{
                   //中
                   clearOther();
                   spans[1].classList.add('active');
               } 
               psd_p.innerHTML = '<i class="success_icon"></i> 正确';
               psd_p.style.color = '#40b83f';
          }
          else {
            psd_p.innerHTML = '<i class="error_icon"></i> 密码不合规范或为空';
            psd_p.style.color = '#C81623';
          } 
      }
      //排他思想清除样式
      function clearOther() {
        for(var i =0; i < spans.length; i++) {
           spans[i].classList.remove('active');
           }
       }

   
})

 
 
