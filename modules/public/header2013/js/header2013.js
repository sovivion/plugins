/*
 * author:wanghaiyan,wumingli
 * author email: wanghaiyan@tianji.com;wumingli@tianji.com
 * for:new header of tianji
 * developed at : 2013/7/23 11:29
 * Copyright tianji 2013. All rights reserved.
 */
$(function (){
    //计时器
    var info_timer = null;
    //当前链接地址
    var locLink = window.location.href;
    var isIE6 = ($.browser.msie && $.browser.version == 6.0);
    var isEn = ($('#header .header_menu_two ul.left_menu li:eq(0)').find('a').text() == 'Home');
    var searchValue = '';
    var DD_belatedPNG = DD_belatedPNG || false;
    if(typeof _gaq == 'undefined'){
        _gaq = [];
    }
    //GA检测
    function addGaTrackEventNewHeader(ga_category, ga_action, ga_area) {
        _gaq.push(['_trackEvent', ga_category, ga_action, ga_area]);
    }
    //用户名滑过
    $('.user_name').hover(function(){
        $(this).addClass('font_hui user_bg');
        $(this).find('.arrow-ud').addClass('arrow-ud_hover');
        $(this).find('.user_item').css('display','block');
    },function (){
        $(this).removeClass('font_hui user_bg');
        $(this).find('.arrow-ud').removeClass('arrow-ud_hover');
        $(this).find('.user_item').css('display','none');
    });
    /* 搜索 */
    $(".find_people").focus(function(){
         $(this).addClass('find_bg');
         $(this).parents('.top_search').find('.find_people_button').addClass('find_btn_bg');
         if ($(this)[0].defaultValue == $(this).val()){
            $(this).val('');
         }
    });
    $(".find_people").keyup(function(){
         searchValue = $(this).val();
    });
    $(".find_people").blur(function(){
        $(this).removeClass('find_bg');
        $(this).parents('.top_search').find('.find_people_button').removeClass('find_btn_bg');
        if ($.trim($(this).val()) == ''){
            if (isEn){
                $(this).val('Search');
            } else {
                $(this).val('搜索');
            }
        }
    });
    $('.top_search form').submit(function (){
        $(this).find('.find_people_button').val('');
        if (searchValue === ''){
            $(".find_people").val('');
        }
    });
    //获取string长度
    String.prototype.length2 = function() {
      var cArr = this.match(/[^\x00-\xff]/ig);
      return this.length + (cArr == null ? 0 : cArr.length);
    }
    //原搜索
    window.SearchBox = {
        selectors: {
          root: $(".top_search"),
          input: $(".top_search form :text:first"),
          box: $(".search_list"),
          highlight: $(".search_main li a b")
        },
        keyCode: {
          UP: 38,
          DOWN: 40
        },
        defalutText: "",
        host: "http://search.tianji.com/psearch",
        init: function(){
          this._bind();
          return this;
        },
        _bind: function(){
          this.selectors.input.bind("blur", this._hide).bind("keyup", this._keyup);
          this.selectors.box.bind("click", this._hide);
          this.selectors.box.hover(function(){
            SearchBox.selectors.input.unbind("blur");
          },function(){
            SearchBox.selectors.input.bind("blur", SearchBox._hide);
          });
        },
        _keyup: function(e){
          switch(e.which){
            case 38: 
                SearchBox._up();
                break;
            case 40: 
                SearchBox._down();
                break;
            case 13:
                SearchBox._input();
                this._hide;
                break;
            default:
                SearchBox._input();
                break;
          }
          SearchBox._select();
        },
        _show: function(){
          SearchBox.selectors.box.show();
        },
        _hide: function(){
          SearchBox.selectors.box.hide();
        },
        _up: function(){
          if($(".search_list li.current:last").index(".search_list li")>0){
            $(".search_list li.current").removeClass("current").prev("li").addClass("current");
          }
        },
        _down: function(){
          if($(".search_list li.current:last").index(".search_list li")<3){
            $(".search_list li.current").removeClass("current").next("li").addClass("current");
          }
        },
        _input: function(){
          var str = SearchBox.selectors.input.val();
          SearchBox._resetUrl(encodeURIComponent(str));
          if(str.length == 0){
            SearchBox._hide();
            SearchBox._resetHighlight();
          }else{
            SearchBox._show();
            str = SearchBox._truncate(str, 13);
            SearchBox.selectors.highlight.text(str);
          }
        },
        _select:function(){
          $(".top_search form :hidden[name=header_destination]").val($(".search_list li.current a").attr("data-range"));
        },
        // 截断字符
        _truncate: function(str, len){
          var _omission = "…";
          var _maxLength = len * 2;
          var len2 = str.length2();
          //如果用户输入的内容 字节数小于等于10， 则return 原字符串
          if(len2 <= _maxLength) return str;
          
          // 否则截断字符
          // 截取前5个字符，判断字节数是否等于10，如果小于10则补进下一个字符，直到字节数为10,并添加omission
          var _str = str.substring(0,len);
          var _len2 = _str.length2();
          
          while(_len2 < _maxLength){
            var _tmpStr = str.substring(0,len++);
            _len2 = _tmpStr.length2();
            //判断最后一个字符是中文的情况
            if(_len2 > _maxLength) break;
            _str = _tmpStr;
          }
          return _str+_omission;
        },
        _resetHighlight: function(){
          SearchBox.selectors.highlight.text(SearchBox.defalutText);
        },
        _resetUrl: function(_str){
          $(".search_list ul li a[data-range]").each(function(){
            $(this).attr("href", SearchBox.host+"?header_destination="+$(this).attr("data-range")+"&header_keyword="+_str);
          });
          $(".search_list .use_hign_search a").attr("href", "http://search.tianji.com/psearch?keyword="+_str);
        }
    }
    //初始化搜索
    SearchBox.init();
    
    //标识当前频道
    var urlPath = window.location.pathname;
    var aUrlSplit = urlPath.split('/');
    var sUrlReturn = '';
    var chanel = {
        'home': 0,
        'p': 1,
        'contacts': 2,
        'job': 3,
        'corps': 4,
        'mba': 5
    };
    var isRemoveCur = (aUrlSplit[1] == 'p' && aUrlSplit.length > 2) || locLink.indexOf('m.tianji') > 0 || 
        locLink.indexOf('bbs.tianji') > 0 || locLink.indexOf('search.tianji') > 0;
    var urlIndex = locLink.indexOf('job.tianji') > 0 ? 3 : chanel[aUrlSplit[1]];
    //是否标识当前
    if (isRemoveCur){
        $('.header_menus .left_menu li a').removeClass('current');
    }
    else{
        $('.header_menus .left_menu li').eq(urlIndex).find('a').addClass('current').end().siblings().find('a').removeClass('current');
    }
    //导航滑过
    $('#header .header_menu_two ul.left_menu li a[class!="current"]').hover(function (){
        $(this).addClass('hover');
    },function (){
        $(this).removeClass('hover');
    });
    //登录链接
    $('.user_unlogin_info a:eq(0)').attr('href', $('.user_unlogin_info a:eq(0)').attr('href') + locLink);
    //设置Domain
    var hostname = window.location.hostname;
    var config = {
        crossDomainFrameUrl: 'http://www.tianji.com/crossdomain.html',
        crossDomainFrameId: 'crossdomain-iframe'
    };
    var thisDomain = hostname.match(/[a-z]+/)[0];
    var ridDomain = config.crossDomainFrameUrl.match(/[a-z]+/g)[1];
    var crossDom;
    //登录状态调用
    if ($('.user_unlogin_info').length == 0){
        //语言切换
        var $lanLink = $('.user_info .user_item li:eq(1)').find('a');
        var lanHref = $lanLink.attr('href');
        $lanLink.attr('href', lanHref.substring(0, lanHref.length - 1) + locLink);
        //因跨域页延迟
        setTimeout(function (){
            //封装测试
            function getUserInfo($$){
                if (!!$$){
                    //用户信息
                    $$.get('http://www.tianji.com/front/nav/user?' + Math.random(),function(data){
                        if (data){
                            var uData = data['data'],
                            name = '';
                            if (!uData){
                                return false;
                            } else {
                                name = uData['name'];
                                //英文，取First Name                                            
                                if (/[a-z -_\.]+/i.test(name)){
                                    name = name.split(' ')[0];
                                } else {
                                     name = name.substring(0, 4);
                                }
                                $('#header .header_menu .user_info').fadeIn();
                                $('.user_poster img').attr('src', uData['avatar']);
                                $('.user_name .zi').text(name);
                                $('.user_poster img,.user_name .zi').attr('title',uData['name'] + ', ' + uData['headline']);
                            }
                        }
                    });
                    //初始化数字
                    $$.get('http://www.tianji.com/front/nav/counts?' + Math.random(),function(data) {
                          if(data && data['notices']){
                              var notice_msg = data['notices'];
                          //好友请求
                          if (notice_msg['unread_friend_requests_count'] == 0){
                            $('#contacts_one .span_promit').hide();
                          } else {
                            $('#contacts_one .span_promit').attr('data-num', notice_msg['unread_friend_requests_count']);
                            $('#contacts_one .span_promit').show().text(notice_msg['unread_friend_requests_count'] > 99 ? '99+' : notice_msg['unread_friend_requests_count']);
                            $('#contacts_one .promit_no').hide();
                          }
                          //通知
                          if (notice_msg['unread_notices_count'] == 0){
                            $('look_see2 .span_promit').hide();
                          } else {
                            $('#look_see2 .span_promit').show().text(notice_msg['unread_notices_count'] > 99 ? '99+' : notice_msg['unread_notices_count']);
                          }
                          //私信
                          if (notice_msg['unread_message_topics_count'] == 0){
                            $('#look_see1 .span_promit').hide();
                          } else {
                            $('#look_see1 .span_promit').show().text(notice_msg['unread_message_topics_count'] > 99 ? '99+' : notice_msg['unread_message_topics_count']);
                          }
                        } else {
                            return false;
                        }
                    });
                } else {
                    window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$ || $;
                }
            }
            if (thisDomain != ridDomain){
                document.domain = 'tianji.com';
                var frame = document.createElement('iframe'),
                    frameQuery;
                frame.src = config.crossDomainFrameUrl;
                frame.id = config.crossDomainFrameId;
                frame.style.display = 'none';
                document.body.appendChild(frame);
                if (isIE6 && frame.attachEvent){
                    frame.attachEvent('onload',  function(){
                        window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$;
                        getUserInfo(window.__$);
                    });
                } else {
                    frame.onload = function (){
                        window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$;
                        getUserInfo(window.__$);
                    }
                }
                //加载用于登录的iframe
                var infoIframe = document.createElement('iframe');
                infoIframe.src = 'http://www.tianji.com/front/nav/login';
                infoIframe.style.display = 'none';
                document.body.appendChild(infoIframe);
                if (isIE6 && infoIframe.attachEvent) {
                    infoIframe.attachEvent('onload',  function(){
                        getUserInfo(window.__$);
                    });
                } else {
                    infoIframe.onload = function (){
                        getUserInfo(window.__$);
                    }
                }
            } else {
                window.__$ = $;
                getUserInfo(window.__$);
            }
            var lenMayKnow = 0;
            //可能认识的人，封装
            function personMayKnow(url, type, needData, htmlMethod, callback) {
                htmlMethod = htmlMethod || 'html';
                __$.ajax(url, {
                    'type': type,
                    'data': needData,
                    'success': function (data){
                        var pHtml = '',
                            pDatas = data['data'],
                            pLen = pDatas.length;
                        $('#contacts_one .emails_panel').hide();
                        if (pDatas.length > 0){
                            for (var i=0; i < pLen; i++){
                                var addTxt = isEn ? 'Add' : '加为好友';
                                var sendTxt = isEn ? 'Sent' : '已发送';
                                var headlineTxt =  pDatas[i]['headline'] == null ? '' : pDatas[i]['headline'].substring(0,17);
                                pHtml += '<li data-id="' + pDatas[i]['id'] + '"> <span class="logo1"><a href="http://www.tianji.com/p/'+pDatas[i]['id']+'" target="_blank" class="goToProfile"><img src="' + pDatas[i]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/'+pDatas[i]['id']+'" target="_blank" class="goToProfile">' + pDatas[i]['name'] + '</a> </span> <span class="name1_companies">' + headlineTxt + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="adds_btn">'+addTxt+'</a> <a href="javascript:void(0);" class="adds_btn_yi">'+sendTxt+'</a> </li>';
                            }
                        } else {
                            $('#contacts_one_list .emails_panel').show();
                        }
                        if (htmlMethod == 'html'){
                            $('#people_kone').html(pHtml);
                        } else {
                            $('#people_kone').append(pHtml);
                        }
                        $('#people_kone li:last').css('border-bottom', 'none').siblings().removeAttr('style');
                        !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('update');
                        //$('#people_kone li:last').css('border-bottom','none');
                    }
                });
            }
            //人脉邀请同意、删除函数封装
            function concat($obj, url, type, action){
                __$.ajax({
                    'url': url,
                    'data': {
                        'id': $obj.attr('data-id'),
                        'lastId': $('#new_header li:last').attr('data-id')
                    },
                    'type': type,
                    success:function (data){
                        var returnHtml = '',
                            retData = [];
                        //删除记录
                        function removeObj(html){
                            $obj.slideUp(function (){
                                $(this).remove();
                                if (data['data'].length == 0 && $('#new_header li').length == 0){
                                    $('#contacts_one .promit_no').show();
                                } else {
                                    $('#new_header').append(html);
                                }
                            });
                        }
                        if (data && data['data'].length > 0){
                            retData = data['data'];
                            for (var i=0; i<retData.length; i++){
                                var acpTxt = isEn ? 'Accept' : '同意';
                                var headlineTxt =  retData[i]['headline'] == null ? '' : retData[i]['headline'].substring(0,17);
                                returnHtml += '<li data-id="'+retData[i]['id']+'" data-userID="'+retData[i]['userId']+'"> <span class="logo1"><a href="http://www.tianji.com/p/'+retData[i]['userId']+'" target="_blank" class="goToProfile"><img src="' + retData[i]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/'+retData[i]['userId']+'" target="_blank" class="goToProfile">' + retData[i]['name'] + '</a> </span> <span class="name1_companies">' + headlineTxt + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="agree_btn">'+acpTxt+'</a> </li>\n';
                            }
                        }
                        //同意需要延时删除，不同意直接删除
                        if (action === 'agree'){
                            setTimeout(function (){
                                removeObj(returnHtml);
                            }, 2000);
                        } else if (action === 'delete'){
                            removeObj(returnHtml);
                        } else if (action === 'init'){
                            $('#contacts_one_list .loding_notice').fadeOut(function (){
                                $('#new_header').html(returnHtml);
                                if ($('#new_header').find('li').length == 0){
                                    $('#contacts_one_list .promit_no').show();
                                }
                            });
                        }
                    }
                });
            }
            //更新可能认识的人容器高度
            function updatePersonListHeight($obj){
                $obj.slideUp(function (){
                    $obj.remove();
                    var listLen = $('#people_kone li').length;
                    if (listLen === 0){
                        $('#contacts_one_list .hd_scroll_box').animate({height:145});
                    } else if (listLen === 1){
                        $('#contacts_one_list .hd_scroll_box').animate({height:73});
                        !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('destroy');
                    } else {
                        !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('update');
                    }
                    $('#people_kone li:last').css('border-bottom', 'none');
                });
            }
            //获取新的人脉邀请、可能认识的人
            $('#contacts_one').hover(function(){
                clearTimeout(info_timer);
                $(this).siblings('li').find('.messages_list').hide();
                $('#look_list2').hide();
                $('#contacts_one').addClass('contacts_hover');
                $('#contacts_one_list,#contacts_one_list .hd_scroll_box').show();
                if (!$('#contacts_one').hasClass('contacts_loaded')){
                    //人脉邀请
                    concat($('#people_kone li'), 'http://www.tianji.com/front/nav/contact_requests', 'get', 'init');
                    //可能认识的人
                    personMayKnow('http://www.tianji.com/front/nav/pymk?' + Math.random(), 'get', {count:0,next:4}, 'html');                
                    setTimeout(function (){
                        //可能认识的人滚动加载更多
                        if ($('#people_kone li').length >= 3){
                            !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar({
                                autoHideScrollbar:true,
                                theme:"dark",
                                callbacks:{
                                    onTotalScroll:function(){
                                        personMayKnow('http://www.tianji.com/front/nav/pymk', 'get', {count:$('#people_kone li').length,next: 4}, 'append');
                                    }
                                }
                            });
                        }
                    }, 300);

                }
                !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('update');
                setTimeout(function (){
                    $('#contacts_one_list .loding_notice').hide();
                },1000);
                $('#contacts_one').addClass('contacts_loaded');
            },function (){
                $('#contacts_one').removeClass('contacts_hover');
                info_timer = setTimeout(function (){
                    $('#contacts_one_list').hide();
                }, 500);
            });
            //人脉邀请、可能认识的人【列表】滑过
            $('#new_header,#people_kone').on('mouseover','li', function (){
                $(this).addClass('current');
            });
            $('#new_header,#people_kone').on('mouseout','li', function (){
                $(this).removeClass('current');
            });
            //人脉邀请同意、删除
            $('#new_header').on('click','span.bi_x1, a.agree_btn', function (event){
                var $this = $(this),
                    $thisList = $(this).parent('li');
                var $concatNum = $('#contacts_one .span_promit'),
                    $concatNumOut = $concatNum.attr('data-num');
                event = event || window.event;
                //同意
                if ((event.srcElement || event.target).className == 'agree_btn'){
                    addGaTrackEventNewHeader('notification_bar','AcceptContactrequest','CR');
                    var nameTitleHtml = $thisList.find('.name1_title').html();
                    var dataID = $thisList.attr('data-userID');
                    $thisList.find('.name1_title, .bi_x1, .agree_btn').hide();
                    $thisList.find('.name1_companies').html('<a href="http://www.tianji.com/p/contacts/'+dataID+'" class="goToProfile" target="_blank">查看TA的联系人</a> | <a href="http://www.tianji.com/p/'+dataID+'" class="sendMessage" target="_blank">给TA写信</a>');
                    $thisList.find('.name1_companies').before('<span class="name2_title">'+nameTitleHtml+'</span><span class="name2_companies">已成为你的人脉</span>');
                    concat($thisList, 'http://www.tianji.com/front/nav/accept_cr', 'put', 'agree');
                }
                //删除
                else if((event.srcElement || event.target).className == 'bi_x1') {
                    addGaTrackEventNewHeader('notification_bar','DeleteContactRequest','CR');
                    concat($thisList, 'http://www.tianji.com/front/nav/ignore_cr', 'put', 'delete');
                }
                //数字变化
                if ($concatNum.text() == 1){
                    $concatNum.text('0');
                    $concatNum.fadeOut(2000);
                } else {
                    $concatNum.attr('data-num', $concatNum.attr('data-num') - 1);
                    $concatNumOut = $concatNum.attr('data-num') > 99 ? '99+': $concatNum.attr('data-num');
                    $concatNum.text($concatNumOut);
                }
            });
            //可能认识的人加为好友、删除
            $('#people_kone').on('click', 'li .adds_btn,li .bi_x1', function(event){
                var $this = $(this);
                event = event || window.event;
                //发送
                if ((event.srcElement || event.target).className == 'adds_btn'){
                    addGaTrackEventNewHeader('notification_bar','SendContactRequest','CR');
                    $this.parent('li').find('.bi_x1,.adds_btn').hide()
                                      .end().find('.adds_btn_yi').fadeIn(1000);
                    personMayKnow('http://www.tianji.com/front/nav/apply_pymk', 'post', {id:$(this).parent('li').attr('data-id'), count:$('#people_kone').find('li').length}, 'append');
                    setTimeout(function (){
                        updatePersonListHeight($this.parent('li'));
                    }, 1000);
                }
                //删除
                else if((event.srcElement || event.target).className == 'bi_x1') {
                    addGaTrackEventNewHeader('notification_bar','HiddePYMK','CR');
                    personMayKnow('http://www.tianji.com/front/nav/ignore_pymk', 'delete', {id:$(this).parent('li').attr('data-id'), count:$('#people_kone').find('li').length}, 'append');
                    updatePersonListHeight($this.parent('li'));
                }
            });
            //查看私信
            $('#look_see1').hover(function(){
                clearTimeout(info_timer);
                $(this).siblings('li').find('.messages_list').hide();
                $(this).addClass('message_hover');
                $('#look_list1').show();
                if (!$('#look_see1').hasClass('look_see1_loaded')){
                    __$.get('http://www.tianji.com/front/nav/messages?' + Math.random(), function (data){
                        if (data && data['data'].length > 0){
                            var msgData = data['data'],
                                msgHtml = '',
                                msgLen = msgData.length >=6 ? 6 : msgData.length,
                                i = 0,
                                hasRe = '';
                            $('#look_list1 .no_notice').hide();
                            while(i < msgLen){
                                hasRe = msgData[i]['status'] == 2 ? '<b class="yi_icon"></b>' : '';
                                msgHtml += '<li data-status="' + msgData[i]['status'] + '"> <a href="http://www.tianji.com/messages/' + msgData[i]['topicId'] + '" target="_blank"> <span class="logo1"><img src="' + msgData[i]['avatar'] + '" /></span> <span class="name1_title">' + msgData[i]['name'] + '</span> <span class="times">' + msgData[i]['time'] + '</span> <span class="name1_companies">' + hasRe + msgData[i]['content'].replace(/\[[a-z0-9]+\]/gi,'') + '</span> <span class="bi_x" style="display: none"></span> </a> </li>';
                                i++;
                            }
                            $('#look_list1 .loding_notice').fadeOut(function (){
                                $('#look_list1 .hd_scroll_box').show();
                                $('#new_header_message').html(msgHtml);
                                $('#new_header_message li').filter('[data-status=0]').find('span.name1_companies,span.name1_title').addClass('new_msg');
                                $('#new_header_message li:last').css('border-bottom', 'none');
                            });
                        } else if(data['data'].length == 0){
                            $('#look_list1 .loding_notice').fadeOut(function (){
                                $('#look_list1 .no_notice').show();
                            });
                        }
                    });
                }
                $('#look_see1').addClass('look_see1_loaded');
                setTimeout(function (){
                    $('#look_list1 .loding_notice').hide();
                },1000);
            }, function (){
                $('#look_see1').removeClass('message_hover');
                clearTimeout(info_timer);
                info_timer = setTimeout(function (){
                    $('#look_list1').hide();
                }, 500);
            });
            //通知GA映射
            var noticeMap = {
                visitor: ['notification_bar','GoToRecentVisit', 'Recentvisit'],
                visitors: ['notification_bar','GoToGroup3', 'Groups'],
                notice_0: ['notification_bar','GoToProfile', 'Notice'],
                notice_1: ['notification_bar','GoToGroup1', 'Groups'],
                notice_2: ['notification_bar','GoToGroup2', 'Groups'],
                notice_3: ['notification_bar','GoToEvent', 'Event'],
                notice_4: ['notification_bar','GoToGroup3', 'Groups'],
                notice_5: ['notification_bar','GoToStatus', 'Status'],
                notice_6: ['notification_bar','GoToMyProfile1', 'Verification'],
                notice_7: ['notification_bar','Share', 'Verification'],
                notice_8: ['notification_bar','GoToVerificationConditions1', 'Verification'],
                notice_9: ['notification_bar','GoToProfile', 'Verification'],
                notice_10: ['notification_bar','GoToMyProfile1', 'Skills'],
                notice_11: ['notification_bar','GoToProfile', 'Skills'],
                notice_12: ['notification_bar','GoToMyProfile2', 'Skills'],
                notice_13: ['notification_bar','GoToVerificationConditions2', 'Verification'],
                notice_14: ['notification_bar','GoToVerificationConditions3', 'Verification'],
                notice_15: ['notification_bar','GoToMyProfile2', 'Verification'],
                notice_16: ['notification_bar','GoToVerificationConditions4', 'Verification'],
                notice_17: ['notification_bar','GoToMyProfile', 'InvitePeople'],
                notice_18: ['notification_bar','GoToMyProfile', 'Profile'],
                notice_19: ['notification_bar','GoToVerificationConditions', 'InvitePeople'],
                notice_21: ['notification_bar','GoToProfile', 'RecentVisit'],
                notice_22: ['notification_bar','GoToProfile', 'Verification'],
                notice_23: ['notification_bar','GoToProfile', 'InvitePeople']
            };
            $('#header .header_menu_two ul.right_menu li .messages_list .contacts2_main').on('click', 'li a', function (){
                var notice_type = noticeMap[$(this).attr('data-ga')];
                addGaTrackEventNewHeader(notice_type[0], notice_type[1], notice_type[2]);
            });
            //查看通知
            var countNotice = 0;
            $('#look_see2').hover(function(){
                clearTimeout(info_timer);
                var $this = $(this);
                $(this).siblings('li').find('.messages_list').hide();
                $(this).addClass('tool_hover');
                $('#look_list2').show();
                if (!$(this).hasClass('notices_loaded')){
                   __$.ajax('http://www.tianji.com/front/nav/notices?' + Math.random(), {
                        type: 'get',
                        success: function (data){
                            $this.find('.loding_notice').fadeOut(function (){
                                var nDatas = data['data'],
                                    retHtml = '',
                                    nameStr = '',
                                    classStr = '';
                                for (var i=0; i < nDatas.length; i++){
                                    if (nDatas[i]['names']){
                                        var aNames = nDatas[i]['names'];
                                        var aTempNames = [];
                                        for (var j=0; j < aNames.length; j++){
                                            //英文，取First Name
                                            if (j >= 3){
                                                break;
                                            }
                                            if (/[a-z -_\.]+/i.test(aNames[j])){
                                                aTempNames.push(aNames[j].split(' ')[0]);
                                            } else {
                                                aTempNames.push(aNames[j].substring(0, 4));
                                            }
                                        }
                                        nameStr = aTempNames.join('，') + '等' +aNames.length + '人';
                                    } else {
                                        nameStr = nDatas[i]['name'];
                                    }

                                    nameStr += nDatas[i]['content'] ? ' ' + nDatas[i]['content'] : ' 最近访问了你的档案';
                                    classStr = nDatas[i]['status'] == 0 ? ' class="bg_new"' : '';
                                    retHtml += '<li> <a href="'+nDatas[i]['url']+'" ' + classStr + ' data-ga="'+nDatas[i]['type']+'" target="_blank"> <span class="logo1"><img src="'+nDatas[i]['avatar']+'" /></span> <span class="name1_title">'+nameStr+'</span> <span class="times">' + nDatas[i]['time'] + '</span> </a> </li>';
                                }

                                $('#look_list2 .hd_scroll_box').show();
                                $('#look_list2 .contacts2_main').html(retHtml);
                                //滚动条
                                if ($('#look_list2 .contacts2_main li').length < 6){
                                    $('#look_list2 .hd_scroll_box').height($('#look_list2 .contacts2_main li').length * 73);
                                } else {
                                    $('#look_list2 .hd_scroll_box').height(437);
                                }
                                $('#look_list2 .contacts2_main li:last').css('border-bottom','none');
                                !isIE6 && $('#look_list2 .hd_scroll_box').mCustomScrollbar({
                                    autoHideScrollbar:true,
                                    theme:"dark",
                                    callbacks: {
                                        onTotalScroll:function(){
                                            if ($('#look_list2 .hd_scroll_box').find('.load_more_notice').length == 0){
                                                $('#look_list2 .contacts2_main li:last').removeAttr('style');
                                                $('#look_list2 .contacts2_main').append('<li class="load_more_notice" style="height:20px;padding:10px 0;text-align:center;border-bottom:none;"><a href="http://www.tianji.com/notices" style="padding:0">查看更多通知 &gt;&gt;</a></li>');
                                                $('#look_list2 .hd_scroll_box').mCustomScrollbar('update');
                                            }
                                        }
                                    }
                                });
                                //$(this).hide();
                            });
                        }
                    });
                } else {
                    $this.find('.span_promit').hide();
                    $('#look_see2 .loding_notice').hide();
                    !isIE6 && $('#look_list2 .hd_scroll_box').mCustomScrollbar('update');
                }
                setTimeout(function (){
                    $('#look_see2 .loding_notice').hide();
                    $this.find('.span_promit').fadeOut(1000,function (){
                        $('#look_list2 .contacts2_main li a').removeClass('bg_new');
                    });
                }, 1000);
                $(this).addClass('notices_loaded');
            }, function (){
                $(this).removeClass('tool_hover');
                clearTimeout(info_timer);
                info_timer = setTimeout(function (){
                    $('#look_list2').hide();
                }, 500);
            });
            //添加GA
            $('#new_header, #people_kone').on('click', 'li a.goToProfile', function (){
                addGaTrackEventNewHeader('notification_bar','GoToProfile','CR');
            });
            $('#new_header_message').on('click', 'li a', function (){
                addGaTrackEventNewHeader('notification_bar','ReplyMessage','Message');
            });
            $('#header .header_menu_two ul.right_menu li .wirte_info').on('click', function (){
                addGaTrackEventNewHeader('notification_bar','WriteMessage','Message');
            });
            $('#contacts_one_list .title_renmai:eq(0) a,#contacts_one a:eq(0)').click(function (){
                addGaTrackEventNewHeader('notification_bar','GoToInvite','CR');
            });
            $('#contacts_one .emails_panel a').click(function (){
                addGaTrackEventNewHeader('notification_bar','Import','CR');
            });
            $('#contacts_one_list .border_t a.all_kone').click(function (){
                addGaTrackEventNewHeader('notification_bar','GoToPYMK','CR');
            });
            $('#look_see1 a:eq(0)').on('click', function (){
                addGaTrackEventNewHeader('notification_bar','GoToMessage','Message');
            });
            $('#look_see2 a:eq(0)').on('click', function (){
                addGaTrackEventNewHeader('notification_bar','GoToNotice','Notice');
            });

            //人脉邀请链接： addGaTrackEventNewHeader('notification_bar','GoToInvite','CR');
        }, 800);
    }
    var timerShowSearch = null,
        timerHideSearch = null;
    //显示搜索
    function showSearch(){
        clearTimeout(timerShowSearch);
        clearTimeout(timerHideSearch);
        timerShowSearch = setTimeout(function (){
            $('#header .header_menu').show();
            $('#header .header_menu_bg').height(100);
        }, 500);
    }
    //隐藏搜索
    function hideSearch(){
        clearTimeout(timerShowSearch);
        clearTimeout(timerHideSearch);
        timerHideSearch = setTimeout(function (){
            if ((document.body.scrollTop || document.documentElement.scrollTop) >= 60){
                $('#header .header_menu').hide();
                $('#header .header_menu_bg').height(40);
            }
        }, 500);
    }
    //页面滚动
    $(document).scroll(function (){
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop >= 60){
            $('#header').css({
                position: 'fixed',
                top: 0
            });
            /*$('#container_index').css('paddingTop', '100px');
            $('#container').css('marginTop', '115px');
            $('#bd').css('marginTop', '120px');
            */
            if ($('.pos100').length == 0){
                $('#header').after('<div class="pos100" style="height:100px;"></div>');
            } else {
                $('.pos100').show();
            }
            $('#header .header_menu_bg').height(40);
            $('#header .header_menu').hide();
            $('#header .header_menu_bg').on('mouseover',showSearch);
            $('#header .header_menu_bg').on('mouseout',hideSearch);
        } else {
            $('#header .header_menu').show();
            $('#header').css({
                position: 'relative'
            });
            /*
            $('#container_index').css('paddingTop', '0');
            $('#container').css('marginTop', '15px');
            $('#bd').css('marginTop', '20px');
            */
            $('.pos100').hide();
            $('#header .header_menu_bg').height(100);
            $('#header .header_menu_bg').off('mouseover',showSearch);
            $('#header .header_menu_bg').off('mouseout',hideSearch);
        }
    });
    //阻止默认事件
    $('#header .header_menu_two ul.left_menu li,#header .header_menu_two ul.right_menu').mouseover(function (e){
        e = e || window.event;
        e.stopPropagation();
    });
});