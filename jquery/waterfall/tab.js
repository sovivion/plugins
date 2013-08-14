/**
 * @fileOverview jQuery 滑签插件
 * @author shimingfeng
 * @create 2013.07.31
 * @version 0.1
 */
(function($) {
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