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
            var flag = true; 
            var $popBox = $('<div class="pop_company"></div>').css({'position':'absolute','z-index':'9999'}); 
            var $mask = $('<iframe class="hiddenpop" frameborder="0"></iframe>');
            var IE6 = !-[1,]&&!window.XMLHttpRequest;
            if($popLocaton.length == 0){
                $popLocaton = $(this);
            }
            if(op.jsonp) {
                param.jsonp = op.jsonp;
                param.dataType = 'jsonp';
            }               
            $seachInput.bind("keyup",getResult).bind("input",getResult);
            $seachInput.bind("click",function(e){
                e.stopPropagation();
            });     
            //获得联想词弹框请求函数
            function getResult(e){ 
                console.log("aaa");
                var fbdkeyCode = e.keyCode;
                var inputVlue = $seachInput.val();
                if(fbdkeyCode !== 38 && fbdkeyCode !== 40 && fbdkeyCode !==13){                                          
                    if(op.isCheck == true){
                        return false;
                    }
                    var strLen = inputVlue.length;
                    if(strLen > op.maxinputLen){
                        inputVlue = $seachInput.val(inputVlue.substring(0,op.maxinputLen));
                    }
                    if (inputVlue) {
                        if(inputVlue.replace(/\s*/g, '') !== '' || !op.validate) {
                            var param = {
                                type: op.type,
                                dataType: op.dataType,
                                url: op.api,
                                data: op.data,
                                success: parseResult
                            }
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
                    }
                }else {
                    if(inputVlue){
                        if($popBox){
                            keyFun(e,$popBox);
                        }
                    }                    
                }
                //}
            };
            //请求成功拼接内容
            function parseResult(result){  
                             
                var currentText = $seachInput.val();
                var html = "";
                html += "<ul>";                   
                if(result && result.items) {
                    var company = result.items;                
                    var len = company.length < op.maxresultNum ? company.length : op.maxresultNum;
                    var currStr = " class='current'";
                    for (var i = 0; i < len; i++) {
                        var item = company[i];
                        html += '<li' + currStr + ' key="'+item.name+'" title="'+item.name+'" >'+item.name+'</li>';
                        currStr = '';
                    }; 
                }
                if(op.isCreatecorp){
                    html +=　"</ul>";
                }else {
                    html += '<li class="last"><a target="_blank" href="/corps/create/one?new_corp_name='+currentText+'">添加名为“'+currentText+'”的新公司</a></li></ul>';
                }
                popBox(html,$popBox);                               
            }
            //弹出层添加并渲染
            function popBox(html,box){
                if(op.popWidth) {
                box.css('width', op.popWidth + 'px');
                }
                box.appendTo("body"); 
                box.html("");
                box.append(html).css({
                    top: ($popLocaton.offset().top + $popLocaton.outerHeight())-op.popLocatonTop,
                    left: ($popLocaton.offset().left)-op.popLocatonLeft
                }).show();
                if(IE6){ 
                    box.after($mask);
                    var mask_h = $popBox.height();
                    var mask_w = $popBox.width();
                    mask_h = mask_h?mask_h-2:0;
                    mask_w = mask_w?mask_w-2:0;
                    $mask.height(mask_h);
                    $mask.width(mask_w);
                    $mask.css({
                        top: ($popLocaton.offset().top + $popLocaton.outerHeight())-op.popLocatonTop,
                        left: ($popLocaton.offset().left)-op.popLocatonLeft,
                        'position': 'absolute',
                        'background-color': '#fff'
                    }).show();
                }
                $(".company_other",box).css("width",op.popWidth-81+"px");                
                box.on("mouseenter", 'li', function(){
                    var $li = $(this).not(".last");
                    $li.addClass("current");
                    $li.siblings().removeClass("current");
                });
                //联想词弹框绑定鼠标点击事件
                //console.log($(".pop_company ul li"));

                box.on("click", 'li', function(event){
                    event.stopPropagation();
                    event.preventDefault();
                    var companyName = $(this).attr('key');
                    $seachInput.val(companyName);
                    box.hide();
                    if(IE6){
                        $mask.hide();
                    } 
                                       
                });

            }
            //键盘事件函数
            function keyFun(e,box) {
                e.preventDefault();
                var keyNum = e.keyCode;
                var $currentLi = $(".current", box); 
                var currentHtml = $currentLi.attr('key'); 
                if(keyNum === 38) {
                        var $prevLi = $(".current",box).prev();
                        var prevHtml = $prevLi.attr('key');
                        if($prevLi.length){
                            $currentLi.removeClass("current");
                            $prevLi.addClass("current");
                            $seachInput.val(prevHtml);
                        }
                        return false;     
                } else if(keyNum === 40) {
                    var $nextLi = $(".current",box).next();
                    var nextHtml = $nextLi.attr('key');
                    console.log(nextHtml);
                    var $lastLi = $
                    if($nextLi.hasClass("last") ){
                        $seachInput.val(currentHtml);  
                    } else if($nextLi.length){
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
                    box.hide();
                    if(IE6){
                        $mask.hide();
                    }
                    //$(this).blur();
                    return false;
                };
            };
            $(document).bind("click",function(e){
                if($popBox){
                    $popBox.hide();
                    if(IE6){
                        $mask.hide();
                    }
                }
            });
/*            $seachInput.bind("blur",function(){
                if($popBox){
                    $popBox.hide();
                    if(IE6){
                        $mask.hide();
                    }
                }
            });*/
        });
    }
})(jQuery);
$(function() {   
var $ac = $(".j_autocomplete"); 
$ac.each(function(){
    $(this).closest("form").keydown(function(e){
            if(e.keyCode === 13){
                return false;
            }       
    });
    $(this).autoComplete({
            api: $(this).attr('request_url'),
            type: $(this).attr('request_method'),
            maxinputLen: $(this).attr('max_input_num'),
            maxresultNum: $(this).attr('request_num'),
            validate: $(this).attr('is_validate'),
            popWidth: $(this).attr('popwidth'),
            popLocatonLeft: $(this).attr('poplocatonleft'),
            popLocatonTop:　$(this).attr('poplocatontop'),
            isCheck: $(this).attr('is_check'),
            isCreatecorp: $(this).attr('is_createcorp')        
    });
});
    /*var $ac = $(".j_autocomplete");
        $ac.closest("form").keydown(function(e){
            if(e.keyCode === 13){
                return false;
            }
        });
        $ac.autoComplete({
            api: $ac.attr('request_url'),
            type: $ac.attr('request_method'),
            maxinputLen: $ac.attr('max_input_num'),
            maxresultNum: $ac.attr('request_num'),
            validate: $ac.attr('is_validate'),
            popWidth: $ac.attr('popwidth'),
            popLocatonLeft: $ac.attr('poplocatonleft'),
            popLocatonTop:　$ac.attr('poplocatontop'),
            isCheck: $ac.attr('is_check'),
            isCreatecorp: $ac.attr('is_createcorp')
        });   
     var $school = $(".school_j_autocomplete");
        $school.closest("form").keydown(function(e){
            if(e.keyCode === 13){
                return false;
            }
        });
        $school.autoComplete({
            api: $school.attr('request_url'),
            type: $school.attr('request_method'),
            maxinputLen: $school.attr('max_input_num'),
            maxresultNum: $school.attr('request_num'),
            validate: $school.attr('is_validate'),
            popWidth: $school.attr('popwidth'),
            popLocatonLeft: $school.attr('poplocatonleft'),
            popLocatonTop:　$school.attr('poplocatontop'),
            isCheck: $school.attr('is_check'),
            isCreatecorp: $school.attr('is_createcorp')
        }); */
});