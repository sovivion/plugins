/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:tianji new header with crossdomain
 * developed at : 2013/7/16 18:22
 * Copyright 2013. All rights reserved by tianji frontend team.
 */

(function (){
    var hostname = window.location.hostname;
    var config = {
        domain: hostname.substring(hostname.indexOf('.') + 1),
        crossDomainFrameUrl: 'http://www.wml.com/crossdomain/crossdomain.html',
        crossDomainFrameId: 'crossdomain-iframe'
    };
    var thisDomain = hostname.match(/[a-z]+/)[0];
    var ridDomain = config.crossDomainFrameUrl.match(/http:\/\/([a-z]+)\./)[1];
    var $tjHeader = $;
    var crossDom;
    //设置Domain
    document.domain = config.domain;
    if (thisDomain != ridDomain){
        var frame = document.createElement('iframe'),
            frameQuery;
        frame.src = config.crossDomainFrameUrl;
        frame.id = config.crossDomainFrameId;
        frame.style.display = 'none';
        document.body.appendChild(frame);
        frame.onload = function (){
            $tjHeader = document.getElementById(config.crossDomainFrameId).contentWindow.$;
        }
    }
    $('#btn').click(function (){
        $tjHeader.get('http://www.wml.com/test/%E6%B5%8B%E8%AF%95.html', function (data){
            alert(data);
        });
    });
})();