$(function($){
    //body scroll
    var cur = 0,
        oldTime,
        cHeight = 900,
        $outBox = $(".container"),
        len = $outBox.children().length,
        $navBox = $("#menu").find("li"),
        $navA = $navBox.find("a");

    function scrollFunc(event) {
        var e = event || window.event,
            direct = e.wheelDelta || e.detail,
            nowTime = new Date();
  
        if(!oldTime || nowTime - oldTime > 600) {
            Math.abs(direct) < 120 ? direct = -direct : '';
            if(direct < 0) {
                update(cur + 1);
            } else if(direct > 0) {
                update(cur - 1);                    
            }    
            oldTime = nowTime;
        }
    }

    function update(index) {
        index > len - 1 ? index = len - 1 : '';
        index < 0 ? index = 0 : '';
        navUpDate(index);  
        if(index != cur) {
            $outBox.stop().animate({
                top: -cHeight * index
            }, 600);                          
            cur = index;
        }        
    }

    function navUpDate(index){
        $navBox.find("a").removeClass("curr");
        $navBox.eq(index).find("a").addClass("curr");
    }

    $navA.click(function(e){
        e.preventDefault();
        var curIndex = ($(this).parent().attr("data-index"));
        navUpDate(curIndex);
        update(curIndex)
    });
    document.addEventListener ? document.addEventListener('DOMMouseScroll', scrollFunc) : '';//FF
    document.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari

    //ie6 rightbox
    if ($.browser.msie && ($.browser.version == '6.0') && !$.support.style) {    
        $("#menu").css({
            "position": "absolute",
            "right": 40,
            "top": 400
        });
    }

    //slide tab

    var $conFor = $(".container_for"),
        $sUl = $("ul.list"),
        $sLi = $sUl.children(),
        $sNav = $conFor.find("ul.nav"),
        $sNavA = $sNav.children().find("a"),
        $leftBtn = $conFor.find("span.left"),
        $rightBtn = $conFor.find("span.right"),
        $conBox = $conFor.find(".con"),
        LEN = $sLi.length,
        sw = $sLi.width() + 20,
        timer = null;

    $sUl.width(sw * LEN);
    $sNavA.each(function(i){
        var This = $(this);
        This.click(function(e){
            e.preventDefault();            
            basicPlay(i);
        });
    });

    function basicPlay(i){
        btnPlay(i);
        $sNavA.removeClass("curr");
        $($sNavA[i]).addClass("curr");
        $sUl.animate({
            left: -sw * i
        },400);
    } 
    $conBox.mouseenter(function(){
        clearTimeout(timer);
        $rightBtn.show();
        $leftBtn.show();
    }).mouseleave(function(){
        timer = setTimeout(function(){
                $rightBtn.hide();
                $leftBtn.hide();
            }, 1000);
    });
    $rightBtn.mouseenter(function(){
        clearTimeout(timer);
    }).mouseleave(function(){
        timer = setTimeout(function(){
                $rightBtn.hide();
                $leftBtn.hide();
            }, 1000);
    });
    $leftBtn.mouseenter(function(){
        clearTimeout(timer);
    }).mouseleave(function(){
        timer = setTimeout(function(){
                $rightBtn.hide();
                $leftBtn.hide();
            }, 1000);
    });
    function btnPlay(i){
        if(i == LEN - 1) {
            $rightBtn.addClass("right_over");
            $leftBtn.removeClass("left_over");
        }else if(i == 0) {
            $leftBtn.addClass("left_over");
            $rightBtn.removeClass("right_over");
        }else {
            $rightBtn.removeClass("right_over");
            $leftBtn.removeClass("left_over");
        }
    }
    $rightBtn.click(function(){        
        var curIndex = $(".container_for").find(".curr").parent().index();
        curIndex++; 
        curIndex > LEN - 1 ? curIndex = LEN - 1 : ''; 
        basicPlay(curIndex);
        btnPlay(curIndex);                      
    });
    $leftBtn.click(function(){        
        var curIndex = $(".container_for").find(".curr").parent().index();
        curIndex--; 
        curIndex < 0 ? curIndex = 0 : ''; 
        basicPlay(curIndex);
        btnPlay(curIndex);                      
    });

    //selfdefine scroll
    var $scroll = $(".sc_scroll");
    $scroll.each(function(){
        var $barBox = $(this).find(".widget_scrollbar_h"),
            $scrollBar = $barBox.find("em"),
            $conBox = $(this).find(".sc_self_scroll"),
            $content = $(this).find(".sc_self_doc"),
            w = $conBox.height(),
            W = $content.height(),
            per = w / W,
            startY = flag = range = distance = 0;
        if(per < 1) {
            $barBox.height(w);
            $scrollBar.height(per * w);
        }else {
            $barBox.hide();
        }

        $scrollBar.css('top', 0);

        function HandleMouseDown(e){  
            e.stopPropagation();
            e.preventDefault();   
            flag = 1;  
            startY = e.clientY;  
        }
        function HandleMouseUp(e){
            e.stopPropagation();
            e.preventDefault();
            flag = 0;      
        }
        function HandleMouseMove(e){
            e.stopPropagation();
            e.preventDefault();
            range = w - per * w;
            if(flag === 1) {   
     
                distance = e.clientY - startY + parseInt($scrollBar.css('top'));

                if(distance < 0) {

                    distance = 0;

                } else if(distance > range) {

                    distance = range;
                }


                $scrollBar.css("top", distance);
                $content.css("top", - (distance * W / w));

                startY = e.clientY  
            }

            
        }

        $scrollBar.mousedown(HandleMouseDown);
        $(document).mouseup(HandleMouseUp);
        $(document).mousemove(HandleMouseMove);

    });    

});