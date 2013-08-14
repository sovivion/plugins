/*
** COLORTABLE
** version:1.1
** Author:Zhaonan
** zhaonan1@leju.com
** Dete 2012.12.06
** 增加参数
** setPos : "top" or "bottom" 对应显示位置
** Dete 2012.12.03
** 支持直接输入色号
** 必要参数,无默认值
** input  : DOM元素
**   tip  : DOM元素
** btons  : DOM元素
**  list  ：DOM元素
** 可选参数
** colors : 颜色数组
** setPos : 对应显示位置
** onSetColor : 颜色改变回调
** onColorError : 颜色非法输入回调
** defaultsColor : 默认开始颜色
**
** Plug-In
** 实例化方式
** $(selector).zColorTable(set)
** selector 可以是任何jQuery所支持的选择器
** 已适应页面DOM结构
** 返回类型 ：Array  封装所有实例化后的对象
** 新增index属性,用于获取在返回数组中的index值
*/
(function($){
    var REGS = {
        color : /((?:^#)(?:(?:[\d|[a-f]|[A-F]]){6}|(?:[\d|[a-f]|[A-F]]){3})$)/img
    }
    var COLORTABLE = function(opt){
        this.opt = opt;
        this.info = {
            color:""
        };
        return this.init();
    }
    COLORTABLE.fn = COLORTABLE.prototype = {
        version:1.1,
        constructor:COLORTABLE,
        init:function(){
            var list = this.opt.list,
                _this = this;
                this.opt.btons.after(this.opt.tip);
                this.opt.tip.append(list);
            $.each(this.opt.colors,function(e){
                var elem = $('<a href="javascript:void(0)"></a>').css('background',this);
                list.append(elem);
            });
            if(this.opt.defaultsColor){
                this.setColor(this.opt.defaultsColor).removeStrError();
            }else if(this.opt.input.attr('value') != ""){
                this.setColor(this.opt.input.attr('value')).removeStrError();
            }
            //定位,隐藏
            this.autoPos(this.opt.setPos).taggleTable();
            //事件绑定
            this.opt.btons.click(function(){
                _this.taggleTable(true);
            });
            this.opt.list.children('a').each(function(e){
                $(this).on("click",_this.list,function(){
                    _this.selectOn(e).taggleTable();
                    _this.opt.onSetColor.call(_this,_this.info.color);
                });
                $(this).hover(function(){
                    _this.changeTip(_this.getColorByIndex(e));
                },function(){
                    _this.changeTip(_this.info.color);
                });
            });
            this.opt.tip.parent().mouseleave(function(){
                _this.taggleTable();
            });
            this.opt.input.blur(function(){
                //验证字符合法性
                var color = $(this).attr('value').match(REGS.color);
                if(color){
                    color = color[0];
                    if(color !== _this.info.color){
                        _this.setColor(color).removeStrError();
                        _this.opt.onSetColor.call(_this,_this.info.color);
                    }
                }else{
                    _this.strError();
                }
            });
        },
        changeTip:function(color){
            this.opt.tip ? $(this.opt.tip).css("background-color",color) : "";
            return this;
        },
        changeInput:function(color){
            this.opt.input ? $(this.opt.input).attr("value",color) : "";
            return this;
        },
        taggleTable:function(show){
            var table = this.opt.list;
            show = !!show;
            show ? table.css("display","block") : table.css("display","none");
            return this;
        },
        setColor:function(color){
            this.changeTip(color).changeInput(color);
            this.info.color = color;
            return this;
        },
        getColor:function(){
            return this.info.color;
        },
        selectOn:function(index){
            var color = this.getColorByIndex(index);
            if(color){
                this.setColor(color).removeStrError();
            }
            return this;
        },
        getColorByIndex:function(index){
            return this.opt.colors[index] ? this.opt.colors[index] : false;
        },
        strError:function(){
            this.opt.input.addClass('errorColor');
            this.opt.onColorError.call(this);
            return this;
        },
        removeStrError:function(){
            this.opt.input.removeClass('errorColor');
            return this;
        },
        autoPos:function(flag){
            if(!!flag){
                flag = flag.toLowerCase();
                flag = flag === "top" ? 
                    "-" + (this.opt.list.outerHeight()) + "px" : 
                    this.opt.btons.outerHeight() + "px";
                this.opt.list.css("top",flag);
            }
            return this;
        }
    }
    //默认配置
    COLORTABLE.defaults = {
        colors:[
            //标准色
            "#c00000","#f00000","#ffc000","#ffff00","#92d050","#00b050","#00b0f0","#0070c0","#002060","#7030a0",
            //附加色
            "#ffffff","#000000","#eeece1","#1f497d","#4f81bd","#c0504d","#9bbb59","#8064a2","#4bacc6","#f79646",
            "#f2f2f2","#7f7f7f","#ddd9c3","#c6d9f0","#dbe5f1","#f2dcdb","#ebf1dd","#e5e0ec","#dbeef3","#fdeada",
            "#d8d8d8","#595959","#c4bd97","#8db3e2","#b8ccce","#e5b9b7","#d7e3bc","#ccc1d9","#b7dde8","#fac08f",
            "#bfbfbf","#3f3f3f","#938953","#548dd4","#95b3d7","#d99694","#c3d69b","#b2a2c7","#92cddc","#fac08f",
            "#a5a5a5","#262626","#494429","#17365d","#366092","#953734","#76923c","#5f497a","#31859b","#e36c09",
            "#7f7f7f","#0c0c0c","#1d1b10","#0f243e","#244061","#632423","#4f6128","#3f3151","#205867","#974806"
        ],
        //设置显示位置
        setPos:"bottom",
        //颜色改变回调，this指向实例,参数为当前颜色色号
        onSetColor:function(e){},
        //非法色号回调,this指向实例
        onColorError:function(){},
        //默认初始颜色,可选,必须为合法色号
        //默认为空加载input value属性中对应颜色
        //如果都没有，就什么都不咋加载
        defaultsColor:""
    }
    //封装插件
    $.fn.zColorTable = function(set){
        //公用配置
        var set = $.extend({},COLORTABLE.defaults,set),
            //用来封装每个实例
            obj = [];
        //适应与论坛布局配置,给 COLORTABLE 类传必要参数
        $(this).each(function(e){
            var opt = {
                input : $(this),
                btons : $(this).next('u'),
                tip : $('<div class="colorshow bgnn"></div>'),
                list : $('<u class="colorshow_box"></u>'),
                index : e
            }
            opt = $.extend({},set,opt);
            obj[e] = new COLORTABLE(opt);
        });
        return obj;
    }
})(jQuery);