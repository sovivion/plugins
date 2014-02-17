(function(){
    $.fn.autoComplete = function(option){
        var defaultTip = {
            requestDelay: 360,                              //延迟请求时间设置
            maxinputLen: 40,                                //输入框字符限制设置
            maxresultNum: 5,                                //显示条数设置
            api: "http://search.tianji.com/company/autocomplete",                        //接口设置
            name: "companyName",                            //参数名字设置
            type: "post",                                   //请求方式设置
            jsonp: '',                                      //是否为jsonp
            data: {
                "start": 0,
                "rows": 5
            },                                              //参数设置
            //defaultText: "请输入名称",                     //默认提示文字
            dataType: "json",                               //请求数据格式设置
            validate: true,
            popWidth: 0,
            popLocatonTop: 0,
            popLocatonLeft: 0,
            isCheck: false,
            isCreatecorp: false
        }
        var op = $.extend(defaultTip,option||{});     
        this.each(function(index){
            var $seachInput = $(this);
            var $popLocaton = $(".popLocaton_tj_f");
            var requestTimer = null; 
            var $popBox = $('<div class="pop_company"></div>').css('position','absolute');
            var $mask = $('<iframe class="hiddenpop" frameborder="0"></iframe>');
            var param = {
                type: op.type,
                dataType: op.dataType,
                url: op.api,
                data: op.data,
                success: parseResult
            }
            var lastQ = '';
            var flag = true;
            if($popLocaton.length == 0){
                $popLocaton = $(this);
            }
            if(op.jsonp) {
                param.jsonp = op.jsonp;
                param.dataType = 'jsonp';
            }         
            $popBox.appendTo("body").hide(); 
            $popBox.after($mask);      
/*            if(!$seachInput.val()) {
                $seachInput.val(op.defaultText)
            }*/
            if(op.popWidth) {
                $popBox.css('width', op.popWidth + 'px');
            }
            $seachInput.bind("focus",clickRewrite).bind('blur', function() {
                if(flag) {
                    $popBox.hide();
                    $mask.hide();
                }
/*                if(!$seachInput.val()) {
                    $seachInput.val(op.defaultText).css('color', '#888');
                }*/
            }).bind("keyup",getResult).bind("input",getResult);
            $popBox.on("mouseover", function() {
                flag = false;
            });
            $popBox.on("mouseout", function() {
                flag = true;
            });
            $popBox.on("mouseenter", 'li', function(){
                var $li = $(this).not(".last");
                $li.addClass("current");
                $li.siblings().removeClass("current");
            });
            //联想词弹框绑定鼠标点击事件
            $popBox.on('click', 'li', function(){
                var companyName = $(this).attr('key');
                $seachInput.val(companyName);
                $popBox.hide();
                $mask.hide();
            });
            function clickRewrite(e) {
                getResult(e);
/*                if($seachInput.val() === op.defaultText) {
                    $seachInput.val('');
                } else {
                    $seachInput.css('color', '#000')
                    
                    getResult(e);
                }*/
            }
            //获得联想词弹框请求函数，并监听上下铵键
            function getResult(e){
                if(op.isCheck){
                    return false;
                }
/*                if($seachInput.val() === op.defaultText) {
                    $seachInput.css('color', '#888');
                } else {*/
                    var inputVlue = $seachInput.val();
                    var strLen = inputVlue.length;
                    var keyNum = e.keyCode;
                    var $currentLi = $(".current", $popBox); 
                    var currentHtml = $currentLi.attr('key');
                    if(strLen > op.maxinputLen){
                        inputVlue = $seachInput.val(inputVlue.substring(0,op.maxinputLen));
                    }
                    if(keyNum === 38) {
                        var $prevLi = $(".current").prev();
                        var prevHtml = $prevLi.attr('key');
                        if($prevLi.length){
                            $currentLi.removeClass("current");
                            $prevLi.addClass("current");
                            $seachInput.val(prevHtml);
                        }
                        return false;     
                    } else if(keyNum === 40) {
                        var $nextLi = $(".current").next();
                        var nextHtml = $nextLi.attr('key');
                        if($nextLi.hasClass("last")){
                            $seachInput.val(currentHtml);   
                        } else{
                            $currentLi.removeClass("current");
                            $nextLi.addClass("current");
                            $seachInput.val(nextHtml);
                        }
                        return false;
                    } else if(keyNum === 13){
                        if(currentHtml){
                            $seachInput.val(currentHtml);
                        } else{
                            $seachInput.val(inputVlue);
                        }
                        
                        $popBox.hide();
                        $mask.hide();
                        //$(this).blur();
                        return false;
                    };
                    if (inputVlue) {
                        if(lastQ == inputVlue) {
                            $popBox.show();
                            $mask.show();
                        } else if(inputVlue.replace(/\s*/g, '') !== '' || !op.validate) {
                            if(requestTimer){
                                clearTimeout(requestTimer);
                            };
                            requestTimer = setTimeout(function(){   
                                op.data[op.name] = inputVlue;
                                $.ajax(param);
                            },op.requestDelay);
                        }    
                    } else {
                        clearTimeout(requestTimer);
                        $popBox.hide();
                        $mask.hide();
                    }
                //}
            };
            //获得联想词弹框具体内容函数
            function parseResult(result){    //请求结果回调函数 
                $popBox.html("");            
                var currentText = $seachInput.val();
                var html = "";
                lastQ = currentText;
                html += "<ul>";                   
                if(result && result.items) {
                    var company = result.items;                
                    var len = company.length < op.maxresultNum ? company.length : op.maxresultNum;
                    var currStr = ' class="current"';
                    for (var i = 0; i < len; i++) {
                        var item = company[i];
                        html += '<li' + currStr + ' key='+item.name+'><div class="company_link"><span class="company_logo"><img src="'+item.logoFileName+'"></span><div class="company_other"><div class="company_call" title='+item.name+'>'+item.name+'</div><div class="company_count"><span>雇员：'+item.followerCount+'</span><span class="ml30">关注：'+item.staffCount+'</span></div></div></div></li>'; 
                        currStr = '';
                    }; 
                    //html += '<li class="last"><a target="_blank" href="/corps/create/one?new_corp_name='+currentText+'">添加名为“'+currentText+'”的新公司</a></li></ul>';                    
                }
                if(op.isCreatecorp){
                    html +=　"</ul>";
                }else {
                    html += '<li class="last"><a target="_blank" href="/corps/create/one?new_corp_name='+currentText+'">添加名为“'+currentText+'”的新公司</a></li></ul>';
                }
                $popBox.append(html).css({
                    top: ($popLocaton.offset().top + $popLocaton.outerHeight())-op.popLocatonTop,
                    left: ($popLocaton.offset().left)-op.popLocatonLeft
                }).show();
                $(".company_other",$popBox).css("width",op.popWidth-81+"px");
                $mask.height($popBox.outerHeight());
                $mask.width($popBox.outerWidth());
                $mask.css({
                    top: ($popLocaton.offset().top + $popLocaton.outerHeight())-op.popLocatonTop,
                    left: ($popLocaton.offset().left)-op.popLocatonLeft,
                    'position': 'absolute',
                    'background-color': '#fff'
                }).show(); 
            }
        });
    }
})(jQuery);
$(function() {
    var $ac = $(".j_autocomplete");
    $ac.autoComplete({
        api: $ac.attr('request_url'),
        type: $ac.attr('request_method'),
        maxinputLen: $ac.attr('max_input_num'),
        maxresultNum: $ac.attr('request_num'),
        //defaultText: $ac.attr('placeholder'),
        validate: $ac.attr('is_validate'),
        popWidth: $ac.attr('popwidth'),
        popLocatonLeft: $ac.attr('poplocatonleft'),
        popLocatonTop:　$ac.attr('poplocatontop'),
        isCheck: $ac.attr('is_check'),
        isCreatecorp: $ac.attr('is_createcorp')
    });
});