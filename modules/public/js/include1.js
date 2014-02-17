/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for: include path
 * developed at : 2013/6/28
 * Copyright 2013. All rights reserved.
 */
window.include = function (path){
    path = path.replace(/\s+/g,'');
    if (path.length === 0){
        alert('路径不能为空！');
        return;
    }
    var GetXmlHttpObject = function (){
        var xmlHttp = null;
        try{
            xmlHttp=new XMLHttpRequest();
        }
        catch (e){
            try {
                xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e){
                xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    };
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null){
        alert('浏览器不支持Http Request！');
        return;
    }
    xmlHttp.onreadystatechange = function (){
        if (xmlHttp.readyState == 4 && xmlHttp.status == '404'){
            alert('页面不存在！');
            return false;
        }
        if (xmlHttp.readyState == 4 || xmlHttp.readyState=="complete"){
            var aScripts = document.getElementsByTagName('script');
            var thisScript = null;
            var newNode = document.createElement('div');
            newNode.innerHTML = xmlHttp.responseText;
            newNode.style.display = 'none';
            for (var i = 0; i < aScripts.length; i++){
                if (aScripts[i].innerHTML != '' && aScripts[i].innerHTML.indexOf(path) != -1){
                    thisScript = aScripts[i];
                }
            }
            thisScript.parentNode.insertBefore(newNode, thisScript);
            setTimeout(function (){
                newNode.style.display = 'block';
            }, 100);
        }
    }
    xmlHttp.open('GET', path, true);
    xmlHttp.send(null);
}