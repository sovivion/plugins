/**
 * JS自定义滚动条
 * 原作者：http://www.cnblogs.com/zjfree
 * Modified By jinglin1@leju.com 
 */
var jsScrollPane = new(function() {
    this.currentScroll;
    this.isMouseDown;
    this.init = function(el, height) {
        var obj = el;
        if(obj.scrollBar) {
            obj.scrollBar.parentNode.removeChild(obj.scrollBar);
            delete obj.scrollBar;
            delete obj.scrollBarWidth;
            delete obj.scrollBarIndex;
            obj.style.height = 'auto';
        }
        obj.style.height = height + 'px';
        obj.style.overflow = 'hidden';
        obj.style.display = 'block';
        //当内容未超出现在高度时，不添加滚动条    
        if(!obj || obj.scrollHeight <= obj.clientHeight || obj.clientHeight == 0) {
            return false;
        }
        obj.scrollBarWidth = 9;
        obj.style.overflow = 'hidden';
        obj.scrollBar = document.createElement('div');
        obj.parentNode.appendChild(obj.scrollBar);
        obj.scrollBarIndex = document.createElement('div');
        obj.scrollBar.appendChild(obj.scrollBarIndex);
        obj.scrollBar.style.position = 'absolute';
        obj.scrollBarIndex.style.position = 'absolute';
        obj.scrollBar.className = 'scroll_bar';
        obj.scrollBarIndex.className = 'scr_btn';
        obj.scrollBarIndex.scrollDiv = obj;
        obj.scrollBarIndex.scrollDiv.myScrollPageY = 0;
        obj.scrollBarIndex.scrollDiv.myScrollY = 0;
        scrollResetSize(obj);
        obj.style.display = '';
        //拖动滚动条滚动
        obj.scrollBarIndex.onmousedown = function(e){
            e = e || event;
            jsScrollPane.isMouseDown = true;
            jsScrollPane.currentScroll = this.scrollDiv;
            this.scrollDiv.myScrollPageY = e.clientY;
            this.scrollDiv.myScrollY = this.scrollDiv.scrollTop;
            document.body.onselectstart = function(){return false};
            return false;
        }
        document.documentElement.onmousemove = function(e){
            e = e || event;
            if(jsScrollPane.isMouseDown && jsScrollPane.currentScroll) {
                var obj = jsScrollPane.currentScroll;
                var per = (obj.scrollHeight - obj.clientHeight) / (obj.clientHeight - 10 - obj.scrollBarHeight);
                obj.scrollTop = obj.myScrollY - (obj.myScrollPageY - e.clientY) * per;
                setScrollPosition(obj);
            }
        }
        document.documentElement.onmouseup = function() {
            jsScrollPane.isMouseDown = false;
            jsScrollPane.currentScroll = null;
            document.body.onselectstart = function(){return true};
        }
    }
    //计算滚动条位置
    function scrollResetSize(o) {
        var x=0, y=0;
        var p = o;
        while(p) {
            x += p.offsetLeft;
            y += p.offsetTop;
            p = p.offsetParent;
        }
        var borderTop = parseInt(o.style.borderTopWidth||0);
        var borderBottom = parseInt(o.style.borderBottomWidth||0);
        o.scrollBar.style.width = o.scrollBarWidth + 'px';
        o.scrollBar.style.height = o.clientHeight - 10 + 'px';
        o.scrollBar.style.bottom = '5px';
        o.scrollBar.style.right = '5px';
        o.scrollBarIndex.style.width = o.scrollBarWidth + 'px';
        
        o.scrollBarHeight = 43;
        o.scrollBarIndex.style.height = 43 + 'px';
        o.scrollBarIndex.style.left = '0px';
        setScrollPosition(o);
    }
    function setScrollPosition(o) {
        o.scrollBarIndex.style.top = (o.clientHeight - 10 - o.scrollBarHeight) * o.scrollTop / (o.scrollHeight - o.clientHeight) + 'px';
    }
})();