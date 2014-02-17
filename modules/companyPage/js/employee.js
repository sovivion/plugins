/*
 * author: wumingli
 * author email: wumingli@tianji.com
 * for: tianji employee analyse
 * developed at : 2013/8/15 17:00
 * Copyright 2013. All rights reserved.
 */
$(function (){
    //多种情况的映射关系
    var avatarMaps = {
        '1': {
            items: ['em2'],
            itemPos: [{
                left: 18,
                top: 90
            }],
            itemArrPos: [{
                left: 178,
                top: 90
            }]
        },
        '2': {
            items: ['em2', 'em5'],
            itemPos: [{
                left: 18,
                top: 90
            },{
                left: 705,
                top: 90
            }],
            itemArrPos: [{
                left: 178,
                top: 90
            },{
                left: 535,
                top: 100
            }]
        },
        '3': {
            items: ['em2', 'em3', 'em5'],
            itemPos: [{
                left: 18,
                top: 80
            },{
                left: 135,
                top: 140
            },{
                left: 705,
                top: 90
            }],
            itemArrPos: [{
                left: 175,
                top: 85
            },{
                left: 300,
                top: 130
            },{
                left: 530,
                top: 100
            }]
        },
        '4': {
            items: ['em2', 'em3', 'em5', 'em6'],
            itemPos: [{
                left: 18,
                top: 85
            },{
                left: 175,
                top: 175
            },{
                left: 705,
                top: 85
            },{
                left: 780,
                top: 170
            }],
            itemArrPos: [{
                left: 170,
                top: 90
            },{
                left: 320,
                top: 165
            },{
                left: 530,
                top: 90
            },{
                left: 490,
                top: 170
            }]
        },
        '5': {
            items: ['em1', 'em3', 'em4', 'em5', 'em6'],
            itemPos: [{
                left: 145,
                top: 40
            },{
                left: 160,
                top: 170
            },{
                left: 775,
                top: 30
            },{
                left: 695,
                top: 105
            },{
                left: 765,
                top: 175
            }],
            itemArrPos: [{
                left: 305,
                top: 55
            },{
                left: 325,
                top: 160
            },{
                left: 520,
                top: 45
            },{
                left: 525,
                top: 120
            },{
                left: 475,
                top: 165
            }]
        },
        '6': {
            items: ['em1', 'em2', 'em3', 'em4', 'em5', 'em6'],
            itemPos: [{
                left: 145,
                top: 40
            },{
                left: 18,
                top: 125
            },{
                left: 160,
                top: 170
            },{
                left: 775,
                top: 30
            },{
                left: 700,
                top: 105
            },{
                left: 785,
                top: 175
            }],
            itemArrPos: [{
                left: 305,
                top: 45
            },{
                left: 180,
                top: 120
            },{
                left: 345,
                top: 170
            },{
                left: 520,
                top: 45
            },{
                left: 525,
                top: 120
            },{
                left: 495,
                top: 170
            }]
        }
    }
    //IE6半透明
    if ($.browser.msie && $.browser.version == 6.0){
        DD_belatedPNG.fix('.avatarCon span');
    }
    //定时器
    var countTimer = null,
        counter = 0;
    countTimer = setInterval(function (){
        if (counter == 100){
            clearInterval(countTimer);
        }
        $('.loadingGif span').text(counter++);
    }, 10);
    //头像运动函数
    function avatarMove(obj, pos, arrPos, num){
        setTimeout(function(){
            $('.analyseCon .em_' + obj).css(arrPos);
            $('.' + obj).fadeIn(600).animate(pos, 600, function (){
                $(this).find('dd').fadeIn();
                $('[data-for="' + obj + '"]').fadeIn();
            });
            $('.auther_icon').tipsy({gravity: 's'});
            $('.em_a .avatarCon img.secondray').css('opacity', 0.3);
        }, 600*num);
    }
    //延迟1秒钟
    setTimeout(function (){
        $.getJSON('../js/data.json?' + Math.random(),function (data){
            var datas = data['data'],
                len = datas.length,
                mapList = avatarMaps[len],
                i = 0,
                j = 0;
            $('.loadingGif').fadeOut(function (){
                $('.analyseCon h3').fadeOut(function (){
                    $(this).addClass('hideText').fadeIn();
                });
            });
            while (j < len){
                var newImg = document.createElement('img');
                newImg.src = datas[j]['avatar'];
                if (datas[j]['childData']){
                    var newImg2 = document.createElement('img');
                    newImg2.src = datas[j]['childData']['avatar'];
                }
                j++;
            }
            while (i < len){
                var renmaiHtml = '',
                    btnHtml = '',
                    ydHtml = '',
                    renmaiNum = '1',
                    renmaiIcon = '<em title="1度人脉"></em>',
                    headline = datas[i]['headline'];
                if (datas[i]['isFriend'] === 'true'){
                    btnHtml = '<input type="button" class="sendMsg" data="' + datas[i]['id'] + '" user_name="' + datas[i]['name'] + '" title="发私信" />';
                } else {
                    btnHtml = '<input type="button" data-friend-id="' + datas[i]['id'] + '" class="addFriends" title="加为好友" />';
                }
                if (datas[i]['childData'] && datas[i]['ydIcon'] && datas[i]['ydIcon'] == 2){
                    renmaiHtml = '<div class="avatarCon"><img src="' + datas[i]['childData']['avatar'] + '" class="secondray" /><div class="grayBg"></div><a href="http://www.tianji.com/p/' + datas[i]['childData']['id'] + '" target="_blank" class="auther_icon" title="' + datas[i]['childData']['name'] + '"><span></span></a></div>';
                    renmaiIcon = '<em title="2度人脉" class="renmai2"></em>';
                } else if (datas[i]['ydIcon'] == 3){
                    renmaiHtml = '<div class="avatarCon"><img src="../images/morethan2.jpg" /><div class="grayBg"></div><a href="javascript:void(0);" class="auther_icon" title="二度以上人脉连接"><span></span></a></div>';
                    renmaiIcon = '';
                }
                headline = headline.length > 6 ? headline.substring(0, 6) + '...' : headline;
                $('.analyseCon').append('<div class="emItem ' + mapList['items'][i] + '"><dl><dt class="avatarCon "><img src="' + datas[i]['avatar'] + '" /><a href="http://www.tianji.com/p/' + datas[i]['id']+'" title="' + datas[i]['name'] + '" target="_blank"><span></span></a></dt><dd><strong><a href="http://www.tianji.com/p/' + datas[i]['id']+'" title="' + datas[i]['name'] + '" target="_blank">' + datas[i]['name'] + '</a>' + renmaiIcon + '</strong><p title="' + datas[i]['headline'] + '">' + datas[i]['status'] + '，' + headline+'</p>' + btnHtml + '</dd></dl></div><div class="em_a em_' + mapList['items'][i] + '" data-for="' + mapList['items'][i] + '">' + renmaiHtml + '</div>');

                avatarMove(mapList['items'][i], mapList['itemPos'][i], mapList['itemArrPos'][i], i);
                i++;
            }
            if (len == 1){
                setTimeout(function(){
                    $('<div class="lessRenmai"><a href="http://www.tianji.com/contacts/pymk" target="_blank" title="人脉有点少，立刻扩展你的人脉关系">人脉有点少</a></div>').appendTo('.analyseCon').fadeIn();
                    $('.analyseCon').animate({height: 200});
                }, 1200);
            } else if (len == 2){
                setTimeout(function(){
                    $('.analyseCon').animate({height: 200});
                }, 1800);
            } else if (len == 3){
                setTimeout(function(){
                    $('.analyseCon').animate({height: 220});
                }, 2400);
            }
        });
    }, 1000);
    //显示、隐藏加好友、发私信按钮
    $('.analyseCon').on('mouseover', '.emItem .avatarCon,.emItem dl dd', function (){
        $(this).find('input').css('visibility', 'visible');
    });
    $('.analyseCon').on('mouseout', '.emItem .avatarCon,.emItem dl dd', function (){
        $(this).find('input').css('visibility', 'hidden');
    });
    $('.analyseCon').on('mouseover', '.emItem dl dd input', function (){
        $(this).addClass('hover');
    });
    $('.analyseCon').on('mouseout', '.emItem dl dd input', function (){
        $(this).removeClass('hover');
    });
    //发私信
    $('.analyseCon').on('mouseover', '.emItem dl dd input.sendMsg', function (){
        $(this).addClass('sendMsgHover');
        $(this).attr('id', 'j_message2_send_button');
    });
    $('.analyseCon').on('mouseout', '.emItem dl dd input.sendMsg', function (){
        $(this).removeClass('sendMsgHover');
        $(this).removeAttr('id');
    });
    //二度人脉头像滑过
    $('.analyseCon').on('mouseover', '.em_a .avatarCon', function (){
        $(this).find('img.secondray').stop().animate({
            opacity: 1
        });
    });
    $('').on('mouseout', '.em_a .avatarCon', function (){
        $(this).find('img.secondray').stop().animate({
            opacity: 0.3
        });
    });
    //加好友
    $(".analyseCon").on('click', '.emItem dl dd input.addFriends', function() {
        var $this = $(this);
        var uid = $(this).attr('data-friend-id');
        $.ajax({
            url: 'http://www.tianji.com/ajax/mini_add_friend/' + uid + '?source=companypage',
            success: function() {
                setTimeout(function (){
                    $this.attr('title','好友请求已发送');
                    $this.addClass('sent');
                }, 500);
            }
        });
    });
});