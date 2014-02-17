/*
 * author : wumingli
 * author email : wumingli@tianji.com
 * with jquery-1.7.2
 * for : form validator
 * developed at : 2013/6/28 10:06:45
 * Copyright 2013. All rights reserved.
 */
/*
 待增加功能：
 1.日期类验证

*/

(function ($){
    'use strict';
    var oResults = {};
    var pluginCfg = {};
    //rules
    var rules = {
        required: {
            regex: 'none',
            alertText: '请输入',
            alertText2: '不能为空',
            alertTextSelect: '请选择',
            fnValidation: function (element, need, name, type){
                var len = 0,
                    text1 = this.alertText,
                    text2 = '',
                    oResult = {};
                if (type == 'checkbox' || type == 'radio' || type == 'select' || type == 'div'){
                    if (((type == 'checkbox' || type == 'radio') && element.parent().find('[name=' + element.attr('name') + ']:checked').size() < 1) || (type == 'select' && element.find(':selected').text().indexOf('请选择') != -1) || (type == 'div' && !element.parent().find('input:hidden').val())){
                        oResult['msg'] = '请选择' + name;
                        oResult['result'] = false;
                    }
                    else {
                        oResult['result'] = true;
                    }
                } else {
                    oResult['msg'] = text1 + name;// + this.alertText2;
                    oResult['result'] = !($.trim(element.val()) == '' && need);
                }
                return oResult;
            }
        },
        minSize: {
            regex: 'none',
            alertText: '至少',
            alertText2: '个字符',
            fnValidation: function (element, mLen, name, type){
                var len = 0,
                    text1 = this.alertText,
                    text2 = this.alertText2,
                    oResult = {};
                len = element.val().length;
                if (type == 'checkbox' || type == 'radio'){
                    len = element.parent().find('[name=' + element.attr('name') + ']:checked').size();
                    text1 = '至少选择';
                    text2 = '项';
                } else if(type == 'select'){
                    if (element.find(':selected').text().indexOf('请选择') != -1){
                        len = 0;
                    } else {
                        len = mLen;
                    }
                    text1 = '至少选择';
                    text2 = '项';
                } else {
                    len = element.val().length;
                }
                if (len < mLen){
                    oResult['msg'] = name + text1 + mLen + text2;
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        maxSize: {
            regex: 'none',
            alertText: '最多',
            alertText2: '个字符',
            fnValidation: function (element, mLen, name){
                var len = 0,
                    text1 = '',
                    text2 = '',
                    oResult = {};
                if (element.attr('type') == 'checkbox'){
                    len = element.parent().find('[name=' + element.attr('name') + ']:checked').size();
                    text1 = '最多选择';
                    text2 = '项';
                } else {
                    len = element.val().length;
                    text1 = this.alertText;
                    text2 = this.alertText2;
                }
                if (len > mLen){
                    element.attr('checked',false);
                    oResult['msg'] = name + text1 + mLen + text2;
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        min: {
            regex: /\d+/,
            alertText: '最小值为',
            alertText2: '不是正整数',
            fnValidation: function (element, min, name){
                var oResult = {};
                if ($.trim(element.val()) != ''){
                    if (rules.isNotNum(element.val())){
                        oResult['msg'] = name + this.alertText2;
                    } else if (parseInt(element.val()) < min){
                        oResult['msg'] = name + this.alertText + min;
                    }
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        max: {
            regex: /\d+/,
            alertText: '最大值为',
            alertText2: '不是正整数',
            fnValidation: function (element, max, name){
                var oResult = {};
                if ($.trim(element.val()) != ''){
                    if (rules.isNotNum(element.val())){
                       oResult['msg'] = name + this.alertText2;
                    } else if (parseInt(element.val()) > max){
                         oResult['msg'] = name + this.alertText + max;
                    }
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        email: {
            regex: /^\s*[a-zA-Z0-9]+([\._\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            fnValidation: function (element, text, name){
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))){
                    oResult['msg'] = name + this.alertText2;
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        phone: {
            regex: /(^((\+86)|(86))?-?([12]\d|(0\d{2,3}))-?(\d{7}|\d{8})-?\d{1,4}$)|(^([^0]\d{6,7})$)/,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            alertText3: '，正确格式为：(+86)01058951128/(+86)0543(-)1234567(8)(-)(1~4位分机号)',
            fnValidation: function (element, text, name){
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))){
                    oResult['msg'] = name + this.alertText2 + this.alertText3;
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        mobilePhone: {
            regex: /^((\+86)|(86))?-?1\d{10}$/,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            alertText3: '，正确格式为：(+86)13800138000',
            fnValidation: function (element, text, name){
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))){
                    oResult['msg'] = name + this.alertText2 + this.alertText3;
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        isNotNum: function (val){
            return isNaN(val) || !/^[^0]\d*$/.test(val);
        },
        compare: {
            alertText: '的值与',
            alertText2: '不一致',
            fnValidation: function (element, text, name){
                var oResult = {};
                if (element.val() != '' && element.val() != $('#' + text + ',[name=' + text +']').val()){
                    oResult['msg'] = name + this.alertText + eval('(' + $('#' + text).attr(pluginCfg.btnData) + ')').name + this.alertText2;
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        chinese: {
            regex: /^\s*[\u4E00-\u9FA5]+\s*$/,
            alertText: '请输入正确的',
            alertText2: '只能为汉字',
            fnValidation: function (element, text, name){
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))){
                    oResult['msg'] = name + this.alertText2;
                    oResult['result'] = false;
                }
                else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        }
    };
    //数据检查
    function checkData(element, pluginCfg){
        var elmOffset = element.offset();
        var type = element.attr('type');
        var checkingArray = [],
            initArray = [],
            left = 0,
            top = 0,
            cssClass = '',
            i,
            len,
            ltData,
            cfg;
        var fstNode;
        element.parent().find('.' + pluginCfg.errorMsgConClass).remove();
        if (type == 'checkbox' || type == 'radio'){
            //element.parent().find('.' + pluginCfg.errorMsgConClass).remove();
            fstNode = element.parent().find('[name=' + element.attr('name')+']:eq(0)');
            cfg = eval('(' + fstNode.attr(pluginCfg.btnData) + ')');
            elmOffset = fstNode.offset();
        } else {
            //element.next('.' + pluginCfg.errorMsgConClass).remove();
            cfg = eval('(' + element.attr(pluginCfg.btnData) + ')');
        }

        checkingArray = cfg.checking;
        initArray = cfg.init;
        cssClass = cfg.cssClass || '';
        if (element.is('select')){
            type = 'select';
        } else if (element.is('div')){
            type = 'div';
        }

        if(cfg['leftTop']){
            ltData = cfg['leftTop'].split(/[, ;:]+/);
            left = elmOffset.left + parseInt(ltData[0]);
            top = elmOffset.top + parseInt(ltData[1]);
        } else {
            left = elmOffset.left + element.width() + 15;
            top = elmOffset.top + 5;
        }
        if (!cfg.checking || !cfg.init || cfg.checking.length != cfg.init.length){
            alert('"' + element.attr(pluginCfg.btnData) + '" \n数据不匹配，请检查');
        }
        else {
            for (i = 0, len = checkingArray.length; i < len; i++){
                var oGetRule = rules[checkingArray[i]]['fnValidation'](element, initArray[i], cfg.name, type);
                var res = oGetRule && oGetRule['result'];
                oResults[checkingArray[i] + cfg.name] = res;
                if (oGetRule && !res){
                    element.parent().find('.' + pluginCfg.errorMsgConClass).length == 0 && element.parent().append('<' + pluginCfg.nodeName + ' class="' + pluginCfg.errorMsgConClass + ' ' + cssClass + '">' + oGetRule['msg'] + '</' + pluginCfg.nodeName + '>');
                    break;
                }
            }
        }
    }
    //方法触发
    function triggerMethod($obj, method, cfg){
        $obj.bind(method,function (){
            checkData($obj, cfg);
        });
    }
    $.fn.formValidator = function (config){
        var opt = {
                btnData: 'validation-config',
                triggerMethod: 'blur',
                formCssClass: 'valForm',
                errorMsgConClass: 'val_error',
                nodeName: 'span'
            },
            $this = $(this),
            $form = $this;
        pluginCfg = $.extend(opt, config);
        $this.attr({
            'class': pluginCfg.formCssClass
        });
        $form.on(pluginCfg.triggerMethod, function (){
            var canSub = true;
            $this.find('[' + pluginCfg.btnData + ']').each(function (){
                var $this = $(this);
                checkData($(this), pluginCfg);
                if ($(this).is('input') || $(this).is('select')){
                    if ($(this).is('[type="checkbox"]') || $(this).is('[type="radio"]')){
                        $(this).parent().find('input:checkbox,input:radio').each(function (){
                            triggerMethod($(this), 'click', pluginCfg);
                        });
                    } else if ($(this).is('select')){
                        triggerMethod($(this), 'change', pluginCfg);
                    } else {
                        triggerMethod($(this), 'blur', pluginCfg);
                    }
                } else if ($(this).is('div')){
                    $(document).on('click', function (){
                        checkData($this, pluginCfg);
                    });
                }
            });
            for (var k in oResults){
                if (!oResults[k]){
                    canSub = false;
                }
            }
            if(canSub && pluginCfg.callback){
                pluginCfg.callback();
            }
            return false;
        });
    }
})(jQuery);