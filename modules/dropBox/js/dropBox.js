/*
 * author:武明礼
 * email:wumingli@tianji.com
 * for:tianji drop box plugin
 * developed at :2013/5/16 21:17
 * not by seajs
 * rewrite at : 2013/6/27 17:24
 * Copyright 2013. All rights reserved.
 */
(function($){
    var curBox = '';
    var initZindex = 10000;
    var dropBoxStyle = '<style type="text/css">.wml-p-data-wrap{width:280px;height:37px;border:1px solid #e6e6e6;background-color:#fff;text-align:left;position:relative;zoom:1;font-size:12px;-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;-webkit-box-shadow:#e9e9e9 0 0 3px;-moz-box-shadow:#e9e9e9 0 0 3px;box-shadow:#e9e9e9 0 0 3px}.wml-p-data-wrap .dropBox{position:absolute;top:30px;left:-1px;width:400px;border:1px solid #ccc;background:#fff;z-index:999}.wml-p-data-wrap .dropBox em.close{color:#f30;position:absolute;right:10px;top:8px;font:700 14px/15px Arial normal;cursor:pointer}.wml-p-data-wrap .dftTxt{border:0;background:0;outline:0;height:37px;line-height:37px;margin-left:10px;cursor:default;color:#999}.dropList li em.selected{display:block;width:11px;height:6px;background:url(http://image.tianji.com/tjs/dropBox/images/dropIcons.png) -5px -31px no-repeat;position:absolute;right:10px;top:10px;_background:url(../images/dropicons.gif) -5px -31px no-repeat;overflow:hidden}.wml-p-data-wrap em.dropArr{background:url(http://image.tianji.com/tjs/msPickMap/images/newRebtn.gif) no-repeat;position:absolute;width:32px;height:31px;cursor:pointer;right:4px;top:3px}.dropList{position:absolute;background-color:#f9f9f9;border:1px solid;border-color:#e6e6e6;z-index:9999;overflow:hidden;-webkit-box-shadow:#e9e9e9 0 0 3px;-moz-box-shadow:#e9e9e9 0 0 3px;box-shadow:#e9e9e9 0 0 3px}.dropList li{height:30px;line-height:30px;padding-left:10px;font-size:12px;position:relative;padding-right:20px;overflow:hidden;cursor:pointer}.dropList li.even{background-color:#fefefe}.dropList li em.selected{background-position:-5px -56px;height:8px;right:10px}.dropList li:hover,.dropList li.cur{background-color:#ececec;color:#000}.dropList li.disabled{cursor:not-allowed;color:#aaa}.data-sub-error{background-color:#ffb9b9;-webkit-animation:flash 1s .2s ease both;-moz-animation:flash 1s .2s ease both}@-webkit-keyframes flash{25%,50%,100%{opacity:1}25%,75%{opacity:0}}@-webkit-keyframes flash{25%,50%,100%{opacity:1}25%,75%{opacity:0}}@-moz-keyframes flash{25%,50%,100%{opacity:1}25%,75%{opacity:0}}.subCon{clear:both}.subCon input{width:80px;height:30px}</style>';
    $('head').append(dropBoxStyle);

    $.fn.dropBox = function (options){
        var config = {
            dataName: 'sex',
            //dataBase: '../js/boxData.json',
            clearCache: false,
            version: '1.0.1-dev',
            method: 'click',
            required: false,
            cssClass: 'wml-p-data-wrap',
            dropListClass: 'dropList'
        };
        var sel = $.extend(config, options);
        var $this = $(this),
            rqUrl = '',
            isLinkage = sel.linkage && sel.linkageType;
        if (sel['css']){
            $this.css(sel['css']);
        }
        if (!$this.hasClass('wml-p-data-wrap')){
            $this.addClass('wml-p-data-wrap');
        }

        //读取数据字典中的Title，若初始化时有默认值，则默认选择
        var reqStr = '',
            init = [],
            dftVal = '',
            dftHidVal = '',
            dataName = '',
            hidInputName = '',
            textShow = '',
            boxData = {};
        if ('customData' in sel){
            boxData = sel['customData'];
        } else {
            boxData = TJ_box_data;
        }

        dataName = sel['dataName'];
        hidInputName = sel['name'] || sel['dataName'];
        textShow = sel['text'] || boxData[dataName]['title'];

        //是否必选项，若是，添加data-required属性为true
        reqStr = sel.required ? 'data-required="true"' : '';

        //是否传入默认值
        dftHidVal = '';
        if (typeof boxData[dataName] == 'undefined'){
            dftVal = 'dataName出错，请检查';
            $this.addClass('dataName_error data-sub-error');
        }
        else {
            dftVal = '请选择' + textShow;
            if ('initCode' in sel){
                var dv = getdataNameByCode(boxData[dataName]['data'], sel['initCode']);
                if (dv != ''){
                    dftVal = dv;
                    dftHidVal = sel['initCode'];
                }
            }
        }
        //操作DOM            
        dataName = isLinkage ? dataName + '_' + sel.linkageType : dataName;
        $this.html('<span class="dftTxt">' + dftVal + '</span><input type="hidden" name="' + hidInputName + '" value="' + dftHidVal + '" /><em class="dropArr"></em>');
        //$this.html('<input type="text" readonly="readonly" value="' + dftVal + '" class="dftTxt" ' + reqStr + 
        //        ' style="width:' + ($this.width() - 20) + 'px;" /><input type="hidden" name="' + hidInputName + '" value="' + dftHidVal + '" /><em class="dropArr"></em>');
        //触发方式
        $(this).on('click', function (event){
            event = event || window.event;
            event.stopPropagation();
            if (!$this.hasClass('dataName_error')){
                format($(this));
            }
        });
        //取Code对应的dataName
        function getdataNameByCode(data, code){
            var i,len;
            if (data.length == 0){
                return '';
            } else {
                for (var i=0,len=data.length; i<len; i++){
                    if (data[i]["code"] == code){
                        return data[i]['name'];
                    }
                }
            }
            return '';
        }
        //格式化输出
        function format($this){
            var html = '',rd = '';
            var data = null,
                sType = sel.type,
                classStr = '',
                text = '',
                boxData = {};
            curBox = $this.attr('id');
            $('.' + sel['dropListClass']).hide();
            //自定义
            if ('customData' in sel){
                boxData = sel['customData'];
            } else {
                boxData = TJ_box_data;
            }
            data = boxData[sel.dataName]['data'];
            text = sel['text'] || boxData[sel.dataName]['title'];
            html += '<ul>';
            html += '<li data-code="" class="cur">请选择' + text + '</li>';
            for(var i=0 ;i<data.length ;i++ ){
                classStr = i % 2 == 0 ? 'class="even"' : '';
                var isSelected = !!sel['initCode'];
                html += '<li data-code="'+data[i]['code']+ '" ' + classStr + '>' + data[i]['name']
                        + (isSelected && sel['initCode'] == data[i]['code'] ? '<em class="selected"></em>' : '')+'</li>';
            }
            //是否相关，如薪资范围
            if (isLinkage){
                if (sel.linkageType == 'from'){
                    html += '<li data-code="" class="facetoface">面议</li>';
                } else {
                    html += '<li data-code="" class="facetoface">以上</li>';
                }
            }
            html += '</ul>';
            //创建新节点
            var conNode = $('<div />');
            var thisOffset = $this.position();
            var boxId = $this.attr('id') + '_dropBox';
            $this.css({
                'zIndex': initZindex++,
                'zoom': 1
            });
            if ($('#' + boxId).length == 0){
                //添加属性
                conNode.attr({
                    'class': sel['dropListClass'],
                    'id': boxId,
                    'data-for': $this.attr('id')
                });
                //添加样式，动态控制下拉列表位置
                conNode.css({
                    left: -1,//thisOffset.left,
                    top: $this.outerHeight() - 2,//thisOffset.top + $this.outerHeight(),
                    width: $this.width()
                });
                //添加节点
                conNode.html(html);
                $this.append(conNode);
                //选择事件
                $('#' + boxId).on('click', 'li', function (e){
                    e = e || window.event;
                    e.stopPropagation();
                    if ($(this).hasClass('disabled')){
                        return false;
                    }
                    $this.find('.dftTxt').text($(this).text());
                    $this.find('input:hidden').val($(this).attr('data-code'));
                    //标识选中状态
                    if($(this).text().indexOf('请选择') == -1){
                        $(this).append('<em class="selected"></em>').siblings().find('em.selected').remove();
                        //$('#'+conNode.attr('data-for')).removeClass('data-sub-error');
                    } else {
                        $(this).siblings().find('em.selected').remove();
                    }
                    //相关数据，选择了开始数据
                    if (sel.linkageType == 'from'){
                        if ($(this).text() == '面议'){
                            $(sel.linkage).hide().prev('span').hide();
                        } else {
                            $(sel.linkage).show().prev('span').show();
                            $(sel.linkage).find('.dftTxt').text('以上');
                            //$(sel.linkage).removeClass('data-sub-error');
                        }
                    }
                    //隐藏其他下拉列表
                    //$('.' + sel['dropListClass']).hide();
                    //执行回调函数
                    if ('callback' in sel){
                        sel['callback']();
                    }

                    //
                    $(document).trigger('click');
                });
            }
            else {
                $('#' + boxId).is(':visible') ? $('#' + boxId).hide() : $('#' + boxId).show();
            }
            if (sel.linkageType == 'to' && $this.find('.dftTxt').text() == '以上'){
                $('#' + boxId + ' ul li em').remove();
                $('#' + boxId).find('li:contains("以上")').append('<em class="selected"></em>');
            }
            //相关联数据处理
            var $linkage = $(sel.linkage);
            if (isLinkage && $linkage.length != 0){
                $('#' + boxId + ' li').removeClass('disabled');
                if (sel.linkageType == 'from'){
                    $('#' + boxId + ' li:not(:contains("请选择")):not(:contains("面议"))').each(function (){
                        var linkageVal = parseInt($linkage.find('.dftTxt').text()),
                            thisVal = parseInt($(this).text());
                        if (!isNaN(linkageVal)){
                            if (thisVal > linkageVal){
                                $(this).addClass('disabled');
                            } else {
                                $(this).removeClass('disabled');
                            }
                        }
                    });
                } else {
                    $('#' + boxId + ' li:not(:contains("请选择")):not(:contains("以上"))').each(function (){
                        var linkageVal = parseInt($linkage.find('.dftTxt').text()),
                            thisVal = parseInt($(this).text());
                        if (!isNaN(linkageVal)){
                            if (thisVal < linkageVal){
                                $(this).addClass('disabled');
                            } else {
                                $(this).removeClass('disabled');
                            }
                        } 
                    });
                }
            }
        }
        //失去焦点关闭下拉列表
        $(document).click(function (){
            $('.' + sel['dropListClass']).hide();
        });
        return this;
    };
    //通过Code查找name
    $('[data-dropbox-code]').each(function (){
        $(this).text(findDropBoxData($(this).attr('data-dropbox-code'), $(this).attr('data-dropbox-name')));
    });
    function findDropBoxData(code, dataName){
        if (TJ_box_data[dataName] != undefined){
            var data = TJ_box_data[dataName]['data'];
            for (var i=0; i<data.length; i++){
                if (data[i]['code'] === code){
                    return data[i]['name'];
                }
            }
        }
        return '获取name出错，请检查code';
    }
})(jQuery);