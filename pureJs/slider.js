/**
 * @fileOverview JS 轮播插件
 * @author shimingfeng
 * @create 2014.3.14
 * @version 0.1
 */
/*(function($) {
    $.fn.tab = function(options) {
        defaultOptions = {
            index: 0,                   //初始标签        
            navClass: 'nav',            //滑签对应类名      
            contentClass: 'content',    //标签内容类名      
            currentClass: 'current',    //当前标签类
            trigger: 'click'            //触发方式, 如mouseover, click
        }
        var op = $.extend(defaultOptions, options || {}); 
        this.each(function() {
            var $tab = $(this)
                ,$nav = $('.' + op.navClass, $tab).children()
                ,$content = $('.' + op.contentClass, $tab).children();
                
            $nav.eq(op.index).addClass(op.currentClass);
            $content.hide().eq(op.index).show();
            
            $nav.each(function(index) {
                var $curNav = $(this);
                var $curContent = $content.eq(index);
                $curNav.bind(op.trigger, function() {
                    $content.hide();
                    $curContent.show();
                    $nav.removeClass(op.currentClass);
                    $curNav.addClass(op.currentClass);
                });
            });                   
        });
    }
})(jQuery);
*/

var $sliderBox = document.getElementById("slider"),
    $imgUl = $sliderBox.getElementsByTagName("ul")[0],
    $sliderImg = $imgUl.getElementsByTagName("li"),
    $sliderNav = $sliderBox.getElementsByTagName("ul")[1].getElementsByTagName("li");
function showPic(){

    for(var i=0,len=$sliderImg.length; i<len; i++){
        $sliderNav[i].onclick = function(index){
            return function(){
                /*  显示与隐藏
                for(var j=0,lens=$sliderImg.length; j<lens; j++){
                    $sliderImg[j].style.display = "none";
                }
                $sliderImg[index].style.display = "block";
                */
                // 位置移动
                var ops = -(index * $sliderBox.offsetWidth);
                var opsnow = parseInt($imgUl.style.left);
                function animateMove(){
                    opsnow -= 49;
                    if(ops < opsnow){
                        $imgUl.style.left = opsnow + "px";
                        setTimeout(animateMove,1000);
                    }
                }

                setTimeout(animateMove, 1000);

            }
        }(i);
    }
}


window.onload = showPic;
