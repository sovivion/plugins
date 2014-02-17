/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for: include path
 * developed at : 2013/6/28
 * Copyright 2013. All rights reserved.
 */
window.include = function (path, posID){
    var posObjIdStr = posID.charAt(0) === '#' ? posID : '#' + posID;
    $.ajax(path, {
        statusCode: {
            404: function (){
                alert('Page not found, please check the path :\n\n"' + path + '"');
            }
        },
        success: function (data){
            $(posObjIdStr).after(data);
        }
    });
}