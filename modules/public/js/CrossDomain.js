/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:tianji new header with crossdomain
 * developed at : 2013/7/16 18:22
 * Copyright 2013. All rights reserved by tianji frontend team.
 */
(function (){
    var hostname = window.location.hostname;
    function CrossDomain(cfg){
        cfg = cfg || {};
        var _frameUrl =  cfg.frameUrl || 'http://www.wml.com/crossdomain/crossdomain.html';
        var _frameId = cfg.frameId || 'crossdomain-iframe';
        console.log(_frameUrl.match(/[a-z]+/g));
        var config = {
            frameUrl: _frameUrl,
            frameId: _frameId,
            domain: hostname.substring(hostname.indexOf('.') + 1),
            thisDomain: hostname.match(/[a-z]+/)[0],
            ridDomain: _frameUrl.match(/[a-z]+/g)[1]
        };
        var frame;
        window.frameJQuery = $;
        //扩展，暂时不用
        if (cfg){
            for (var name in cfg){
                config[name] = cfg[name];
            }
        }
        //设置Domain
        document.domain = config.domain;
        if (config.thisDomain != config.ridDomain){
            frame = document.createElement('iframe');
            frame.src = config.frameUrl;
            frame.id = config.frameId;
            frame.style.display = 'none';
            document.body.appendChild(frame);
            frame.onload = function (){
                window.frameJQuery = document.getElementById(config.frameId).contentWindow.$;
            }
        }
    }
    window.CrossDomain = CrossDomain;
})();