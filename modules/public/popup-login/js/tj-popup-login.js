/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:popup login of tianji.com
 * developed at : 2013/7/31 10:00
 * base on jquery-1.7.2
 * Copyright 2013. All rights reserved.
 */
$(function (){
    var userLoginInfo = null;
    var isIE6 = ($.browser.msie && $.browser.version == 6.0);
    var lastAccountValue = '';
    var targetLocation = window.location.href;
    var hostname = window.location.hostname;
    var passwordReg = /^\s*[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}\s*$/;
    //GA检测
    function addGaTrackEventNewHeader(ga_category, ga_action, ga_area) {
        if(typeof _gaq == 'undefined'){
            _gaq = [];
        }
        _gaq.push(['_trackEvent', ga_category, ga_action, ga_area]);
    }
    //创建登录框
    //样式表
    window.popupFrameCreate = function(gotoPage){
        var frameHtml = '';
        gotoPage = gotoPage || targetLocation;
        //已经存在
        if ($('#tianji-popup-login').length != 0){
            frameShow();
        }
        //不存在，创建
        else {
            var styleCode = '<style type="text/css">html {height: 100%;}#tianji-popup-login,#tianji-popup-login-outer-shade {width:640px;height:336px;position:fixed;background:#fff;left:50%;top:50%;margin-left:-320px;margin-top:-168px;z-index:9999;_position:absolute;}#tianji-popup-login-outer-shade {width:650px;height:346px;border-radius:5px;background:#000;opacity:0.3;filter:alpha(opacity=30);margin-top:-173px;margin-left:-325px;z-index:9998;}#tianji-popup-login-shade {width:100%;height:100%;position:fixed;background:#000;z-index:9998; opacity:0.45; filter:alpha(opacity=45); _position:absolute;top:0;left:0;}#tianji-popup-login .pop-left,#tianji-popup-login .pop-right {width:425px;height:335px;overflow:hidden;float:left;position:relative;}#tianji-popup-login .pop-left .pop-left-con {position:absolute;left:0;top:0;}#tianji-popup-login .pop-reg,#tianji-popup-login .pop-login {width:385px;float:left;height:315px;padding-left:35px;padding-top:20px;overflow:hidden;}#tianji-popup-login .pop-reg{display:none;}#tianji-popup-login .pop-left-con ul li label,#tianji-popup-login b.close,#tianji-popup-login-btn,#tianji-popup-reg-btn {background:url(http://image.tianji.com/tjs/popup-login/images/pop-up-btns.png) no-repeat;*margin-left:8px;}#tianji-popup-login .pop-left-con{width:255px;height:315px;}#tianji-popup-login .pop-left-con h3 {font:normal 20px/50px "Microsoft Yahei","SimHei";color:#555;}#tianji-popup-login .pop-left-con ul li {height:62px; font-size:12px;color:#d20000;position:relative;*left: -7px;}#tianji-popup-login .pop-left-con ul li input.txt {height:35px;line-height:35px;border:1px solid #ddd;text-indent:8px;width:280px;outline:none;border-radius:3px;color:#999;overflow:hidden;}#tianji-popup-login .pop-left-con ul li input.focus {border-color:#e55942;box-shadow:0 0 3px #ccc;}#tianji-popup-login .pop-left-con ul li span.inputTip {position:absolute;top:12px;left:10px;color:#999;z-index:0;*left:15px;}#tianji-popup-login .pop-left-con ul li label {margin-right:135px;*margin-left: 8px;color:#333;padding-left:20px;background-position:0 -28px;display:inline-block; height:20px;line-height:20px;_background-position:0 -30px;}#tianji-popup-login .pop-left-con ul li label.checked {background-position:0 -66px;}#tianji-popup-login .pop-left-con ul li a {color:#999;text-decoration:none;}#tianji-popup-login .pop-left-con ul li a.fblue {color:#152f9f;}#tianji-popup-login .pop-left-con .error { padding:5px 0 3px 15px;background:url(http://www.tianji.com/images/case1/login/false.jpg) 0 6px no-repeat;*margin-left:10px;}#tianji-popup-login-btn,#tianji-popup-reg-btn {width:126px;height:36px;cursor:pointer;background-position:0 -108px;border:none;vertical-align:middle;}#tianji-popup-reg-btn {background-position:0 -164px;}#tianji-popup-login .pop-right {background:#f8f8f8;width:215px}#tianji-popup-login .pop-right .pop-right-con {font-size:12px; color:#999;text-align:center;padding-top:70px;}#tianji-popup-login .pop-right a.weiboLogin{display:block; margin:15px auto 0; background:url(http://image.tianji.com/tjs/popup-login/images/btn_weibologin.png) no-repeat; width:176px; height:44px;text-indent:-300px;overflow:hidden;}#tianji-popup-login b.close {position:absolute;right:-15px;top:-15px;background-position:8px 8px;background-color:#5f5f5f;border-radius:13px;width:26px;height:26px;text-align:center;cursor:pointer;z-index:9999;display:block; *right:0; *top:0; right:0\0;top:0\0;}:root #tianji-popup-login b.close {right:-15px;top:-15px;}#tianji-popup-login b.close{_right:0;_top:0;} #tianji-popup-login .pop-left-con ul li .h_length{position:absolute; width:43px; height:26px; top:6px; left:234px; text-align:center; color:#fff; line-height:26px; background:#df4949;}</style>';
            $('head').append(styleCode);
            frameHtml += '<div id="tianji-popup-login" data-target="' + gotoPage + '"><div class="pop-left"><div class="pop-left-con"><div class="pop-login"><h3>立即登录</h3><form method="post" action="http://www.tianji.com/index/login" id="tianji-pop-login-form"><ul><li><span class="inputTip">输入登录邮箱/手机号</span><input type="text" place-holder="正确邮箱或者手机号" name="account[email_or_mobile]" class="txt" regtype="email_mobile,notnull" id="tianji-login-email_or_mobile" /></li><li><span class="inputTip">输入登录密码</span><input type="password" place-holder="密码" name="account[password]" class="txt" regtype="notnull" maxlength="16" /></li><li><input type="hidden" name="remember" /><input type="hidden" name="return_to" value="" /><label class="checked">保持登录状态</label> <a href="http://www.tianji.com/account/account_password_backs/new" class="get-back-password" target="_blank" title="找回密码">找回密码</a></li><li><input type="button" id="tianji-popup-login-btn" class="tianji-submit-btn" value="" />　　　　<a href="http://www.tianji.com/join" class="fblue reg-now" target="_blank">没有帐号，立即注册</a></li></ul></form></div><div class="pop-reg"><h3>快速注册天际网</h3><form method="post" action="http://www.tianji.com/account/accounts" id="tianji-pop-reg-form"><ul><li><span class="inputTip">真实姓名</span><input type="text" place-holder="真实姓名" name="account[name_native_display]" class="txt" regType="chinese,notnull" /></li><li><span class="inputTip">邮箱/手机</span><input type="text" place-holder="正确邮箱或者手机号" name="account[email_or_mobile]" class="txt" regtype="email_mobile,notnull" id="tianji-reg-email_or_mobile" /></li><li><span class="inputTip">密码</span><input type="password" place-holder="密码" name="account[password]" class="txt" regtype="notnull" maxlength="16" /></li><li><input type="button" id="tianji-popup-reg-btn" class="tianji-submit-btn" value="" />　　　　<a href="http://www.tianji.com/join" class="fblue login-now" target="_blank">已有帐号，直接登录</a></li></ul><input type="hidden" name="landing_page" value="popup" /><input type="hidden" name="parameters" /><input type="hidden" name="keyword" /><input type="hidden" name="data-target" /></form></div></div></div><div class="pop-right"><div class="pop-right-con"><p>使用社交帐号登录</p><a href="http://www.tianji.com/auth/weibo" class="weiboLogin" title="用新浪微博登录">用新浪微博登录</a></div></div><div style="clear:both;"></div><b class="close" title="关闭"></b></div><div id="tianji-popup-login-outer-shade"></div><div id="tianji-popup-login-shade"><iframe src="about:blank" border="0" frameborder="0" scrolling="no" style="width:100%;height:' + $(document).height() + 'px;background:transparent;"></iframe></div>';
            $('body').append(frameHtml);
            setTimeout(function (){
                if ($('[name="account[email_or_mobile]"]').val() !== ''){
                    $('[name="account[email_or_mobile]"],[name="account[password]"]').val('');
                }
            }, 1000);
            
        }
    }
    //隐藏登录框
    function frameHide(){
        $('#tianji-popup-login,#tianji-popup-login-shade,#tianji-popup-login-outer-shade').remove();
    }
    //显示登录框
    function frameShow(){
        $('#tianji-popup-login,#tianji-popup-login-shade,#tianji-popup-login-outer-shade').show();
    }
    //前端校验
    function regInput(obj, value, msg, type){
        var sRuleMsg = '';
        var bFail = false;
        var oResult = [];
        switch (type){
            case 'notnull':
                if(value !== ''){
                    bFail = true;
                }
                break;
            case 'email_mobile':
                var emailPhoneReg = /^\s*(([a-zA-Z0-9]+([\._\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+)|(\d{11}))\s*$/;
                bFail = emailPhoneReg.test(value);
                break;
            case 'chinese':
                var chineseReg = /^\s*([\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*|[a-zA-Z]{2,20}(\s+[a-zA-Z]{2,20})+)\s*$/;
                var chineseReg1 = /^\s*([\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*|[a-zA-Z][\sa-zA-Z]{3,63})\s*$/;
                bFail = chineseReg.test(value) && chineseReg1.test(value);
                break;
            case 'password':
                bFail = /^\s*[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}\s*$/.test(value);
                break;
        }
        obj.next('div.error').remove();
        if (!bFail){
            if (obj.val() === ''){
                obj.prev('span.inputTip').show();
            }
            if (obj.attr('type') === 'password'){
                if(obj.parents('form').attr('id') === 'tianji-pop-login-form'){
                    obj.after('<div class="error">请输入密码</div>');
                } else {
                    obj.after('<div class="error">请设置6-16位英文字母，数字，符号密码</div>');
                }
                
            } else {
                obj.after('<div class="error">请输入' + msg + '</div>');
            }
        }
    }
    //手机、邮箱
    $('body').on('blur', '#tianji-popup-login input:text,#tianji-popup-login input:password', function (){
        var val = $.trim($(this).val());
        var aReg = $(this).attr('regtype').split(',');
        $(this).nextAll('div.error').remove();
        for (var i=0; i<aReg.length; i++){
            if (aReg[i] === 'notnull' && val !== '') {
                if ($(this).attr('type') === 'password' && !passwordReg.test(val)){
                    if ($(this).parents('form').is('[id="tianji-pop-reg-form"]')){
                        $(this).after('<div class="error">请设置6-16位英文字母，数字，符号密码</div>');
                    } else {
                        $(this).after('<div class="error">密码长度应该在6-16位之间，且为英文、数字或符号</div>');
                    }
                }
                break;
            }
            regInput($(this), val, $(this).attr('place-holder'), aReg[i]);
        }
    });
    //Checkbox
    $('body').on('click', '#tianji-popup-login .pop-left-con label', function (){
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')){
            $(this).prev('input').val('on');
        } else {
            $(this).prev('input').val('');
        }
    });
    //password input box keyup event
    $('body').on('keyup', '#tianji-popup-login .pop-reg input:password', function (e){
        e = e || window.event;
        var $this = $(this);
        $(this).val($(this).val().replace(/\s+/g, ''));
        if ($this.next('span.h_length').length != 0){
            $this.next('span.h_length').remove();
        }
        var showStrengthTips = function() {
            var e = $.trim($this.val()),
            t = $("[strenth-for='" + $this.attr("name") + "']");
            return /^\s*[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}\s*$/.test(e) ? (/^((\d{6,9})|([a-zA-Z]{6,9})|([^\da-zA-Z]{6,9}))$/.test(e) ? t.text("弱") : /^.{6,9}$/.test(e) ? t.text("中") : t.text("强"), t.show(), void 0) : (t.hide(), void 0)
        }
        if ($.trim($this.val()).length > 5){
            $this.after("<span class='h_length' strenth-for='" + $this.attr("name") + "' style='display: none;'></span>");
        }
        showStrengthTips();
    });
    $('body').on('keyup', '#tianji-popup-login input:password', function (e){
        e = e || window.event;
        if (e.keyCode == 13){
            $(this).parents('form').find('.tianji-submit-btn').trigger('click');
        }
    });
    
    //cross domain
    function getUserInfo($$){
        if (!!$$){
            //用户信息
            $$.ajax({
                url: 'http://www.tianji.com/front/nav/user',
                success: function(data){
                    userLoginInfo = data;
                },
                rsync: false
            });
        }
    }
    if ($('#crossdomain-iframe').length === 0){
        var config = {
            domain: hostname.substring(hostname.indexOf('.') + 1),
            crossDomainFrameUrl: 'http://www.tianji.com/crossdomain.html',
            crossDomainFrameId: 'crossdomain-iframe'
        };
        var thisDomain = hostname.match(/[a-z]+/)[0];
        var ridDomain = config.crossDomainFrameUrl.match(/[a-z]+/g)[1];
        var crossDom;
        //set domain
        document.domain = config.domain;
        if (thisDomain != ridDomain){
            var frame = document.createElement('iframe'),
                frameQuery;
            frame.src = config.crossDomainFrameUrl;
            frame.id = config.crossDomainFrameId;
            frame.style.display = 'none';
            document.body.appendChild(frame);
            if (isIE6 && frame.attachEvent){
                frame.attachEvent('onload',  function(){
                    window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$;
                    getUserInfo(__$);
                });
            } else {
                frame.onload = function (){
                    window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$;
                    getUserInfo(__$);
                }
            }
        }
        else {
            getUserInfo($);
        }
    }
    if (!window.__$){
        window.__$ = $;
    }
    //submit button click
    $('body').on('click', '#tianji-popup-login .tianji-submit-btn', function (){
        var $thisForm = $(this).parents('form');
        var $this = $(this);
        var canSubmit = true;
        $thisForm.find('input.txt[name!="account[email_or_mobile]"]').trigger('blur');

        if ($thisForm.find('[name="account[email_or_mobile]"]').next('div.error').length == 0){
            $thisForm.find('[name="account[email_or_mobile]"]').trigger('blur');
        }
        if ($thisForm.find('div.error').length != 0) {
            return false;
        } else {
            if ($(this).is('[id="tianji-popup-login-btn"]')){
                $(this).attr('disabled', true);
                __$.ajax({
                    dataType: "json",
                    type: "post",
                    url: "http://www.tianji.com/index/login",
                    data: {
                        "account[email_or_mobile]": $thisForm.find('[name="account[email_or_mobile]"]').val(), 
                        "account[password]": $thisForm.find('[name="account[password]"]').val()
                    },
                    success: function(result){
                        if (result.status == -1){
                            $thisForm.find('[name="account[password]"]').after('<div class="error">' + result.msg + '</div>');
                            setTimeout(function (){
                                $this.attr('disabled', false);
                            }, 2000);
                        } else {
                            addGaTrackEventNewHeader('Pop_up', 'Login', 'Login');
                            $thisForm.find('input[name="return_to"]').val($('#tianji-popup-login').attr('data-target'));
                            $thisForm.submit();
                        }
                    }
                });
            } else {
                addGaTrackEventNewHeader('Pop_up', 'Register', 'Register');
                $('#tianji-popup-login .pop-reg input[name="parameters"]').val(window.location.search.substring(1));
                $('#tianji-popup-login .pop-reg input[name="data-target"]').val($('#tianji-popup-login').attr('data-target'));
                if ($('meta[name="Keywords"]')){
                    $('#tianji-popup-login .pop-reg input[name="keyword"]').val($('meta[name="Keywords"]').attr('content'));
                }
                $thisForm.submit();
            }
        }
    });
    //input box focus
    $('body').on('focus', '#tianji-popup-login .pop-left-con ul li input.txt', function (){
        $(this).addClass('focus');
        $(this).prev('span.inputTip').hide();
    });
    $('body').on('blur', '#tianji-popup-login .pop-left-con ul li input.txt', function (){
        $(this).removeClass('focus');
    });
    $('body').on('click', '#tianji-popup-login span.inputTip', function (){
        $(this).hide().next('input').focus();
    });
    
    //注册、登录移动
    function frameMove(target1, target2, type){
        $(target1).fadeOut(function (){
            $(target2).show();
        });
        return false;
    }

    //已有帐号立即登录
    $('body').on('click', '#tianji-popup-login .login-now', function (){
        addGaTrackEventNewHeader('Pop_up', 'GoToLogin', 'Register');
        return frameMove('#tianji-popup-login .pop-reg', '#tianji-popup-login .pop-login', 'login');
    });
    //没有帐号，转到注册
    $('body').on('click', '#tianji-popup-login .reg-now', function (){
        addGaTrackEventNewHeader('Pop_up', 'GoToRegister', 'Login');
        return frameMove('#tianji-popup-login .pop-login', '#tianji-popup-login .pop-reg', 'reg');
    });


    $('body').on('click', '#tianji-popup-login b.close', function (){
        frameHide();
    });
    //自动弹出登录框
    $('.popup-login').each(function (){
        if ($(this).attr('data-auto-popup') === 'true'){
            $(this).trigger('click');
            return false;
        }
    });
    //esc hide the box
    $(document).keydown(function (e){
        e = e || window.event;
        if (e.keyCode === 27){
            frameHide();
        }
    });
    //添加事件
    $('body').on('click', '.popup-login', function (){
        __$.ajax({
            url: 'http://www.tianji.com/front/nav/user',
            success: function(data){
                if (!data['error']){
                    window.location.reload();
                }
            },
            rsync: false
        });
        
        if ($(this).attr('data-init') && $(this).attr('data-init') === 'register'){
            popupFrameCreate('http://www.tianji.com/home');
            $('#tianji-popup-login .pop-login').hide();
            $('#tianji-popup-login .pop-reg').show();
            addGaTrackEventNewHeader('notification_bar', 'GoToPopUp', 'Register');
        } else {
            popupFrameCreate($(this).attr('data-target'));
            addGaTrackEventNewHeader('notification_bar', 'GoToPopUp', 'Login');
        }
        if ($(this).attr('data-checked') && $(this).attr('data-checked') === 'false'){
            $('#tianji-popup-login .pop-left-con label').removeClass('checked');
        }
        return false;
    });
    
    //检测帐号是否存在
    $('body').on('blur', 'input:[name="account[email_or_mobile]"]', function (){
        var $this = $(this),
            thisVal = $.trim($(this).val());
        if (thisVal !== '' && $this.next('div.error').length == 0){
            __$.ajax({
                url: 'http://www.tianji.com/validators/account_unique',
                type: 'get',
                data: {
                    email_or_mobile: $this.val()
                },
                statusCode:{
                    200: function (){
                        $('input:[name="account[email_or_mobile]"]').prev('span.inputTip').hide().end().val($this.val()).next('div.error').remove();
                        if ($this.attr('id') === 'tianji-login-email_or_mobile'){
                            if ($this.next('div.error').length !== 0){
                                $this.next('div.error').html('你所输入的帐号不存在，请 <a href="javascript:void(0);" class="fblue reg-now">注册</a>');
                            } else {
                                $this.after('<div class="error">你所输入的帐号不存在，请 <a href="javascript:void(0);" class="fblue reg-now">注册</a></div>');
                            }
                        }
                    },
                    201: function (){
                        $('input:[name="account[email_or_mobile]"]').prev('span.inputTip').hide().end().val($this.val()).next('div.error').remove();
                        if ($this.attr('id') === 'tianji-reg-email_or_mobile'){
                            if ($this.next('div.error').length !== 0){
                                $this.next('div.error').html('该帐号已存在，请更换帐号或 <a href="javascript:void(0);" class="fblue login-now">登录</a>');
                            } else {
                                $this.after('<div class="error">该帐号已存在，请更换帐号或 <a href="javascript:void(0);" class="fblue login-now">登录</a></div>');
                            }
                        }
                    }
                }
            });
        }
    });

    $('body').on('click', '#tianji-popup-login .pop-right a.weiboLogin', function (){
        addGaTrackEventNewHeader('Pop_up','GoToWeiboLogin', 'Weibologin');
    });
});