/**
 * @fileOverview jQuery 日历插件
 * @author shimingfeng
 * @create 2013.07.31
 * @version 0.1
 */
;(function($) {
    $.fn.datePicker = function(options) {
        var defaultOptions = {
            weekStart: 0,
            Year: new Date().getFullYear(),         //默认年
            Month: new Date().getMonth() + 1,       //默认月
            Day: new Date().getDate(),              //默认天
            today: new Date(),                      //当日
            applyrule: false,                       //过滤规则
            picker: "",                             //日历按钮
            formate: "yyyy-M-d",                    //日期格式
            separate: "-",                           //日期分隔符
            //星期显示文字
            weekName: ['日', '一', '二', '三', '四', '五', '六'],    
            //月份显示文字                 
            monthName: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']         
        };
        var op = $.extend(defaultOptions, options || {}); 
			cp = create();
        $(this).each(function() {
            var obj = $(this).addClass("bbit-dp-input");
            var picker = $(op.picker);
            obj.after(picker);
            picker.click(function(e) {
                var isshow = $(this).attr("isshow");
                var me = $(this);
                if (cp.css("visibility") == "visible") {
                    cp.css(" visibility", "hidden");
                }
                if (isshow == "1") {
                    me.attr("isshow", "0");
                    cp.removeData("ctarget").removeData("cpk").removeData("indata");
                    return false;
                }
                var v = obj.val();
                if (v != "") {
                    v = stringtodate(v);
                }
                if (v == null || v == "") {
                    op.Year = new Date().getFullYear();
                    op.Month = new Date().getMonth() + 1;
                    op.Day = new Date().getDate();
                    v = null
                }
                else {
                    op.Year = v.getFullYear();
                    op.Month =v.getMonth() + 1;
                    op.Day = v.getDate();
                }
                cp.data("ctarget", obj).data("cpk", me).data("indata", v);
                if (op.applyrule && $.isFunction(op.applyrule)) {
                    var rule = op.applyrule.call(obj, obj[0].id);
                    if (rule) {
                        if (rule.startdate) {
                            cp.data("ads", rule.startdate);
                        }
                        else {
                            cp.removeData("ads");
                        }
                        if (rule.enddate) {
                            cp.data("ade", rule.enddate);
                        }
                        else {
                            cp.removeData("ade");
                        }
                    }
                }
                else {
                    cp.removeData("ads").removeData("ade")
                }
                writecb();

                $("#BBIT-DP-T").height(cp.height());
                var t = obj;
                var pos = t.offset();

                var height = t.outerHeight();
                var newpos = { left: pos.left, top: pos.top + height };
                var w = cp.width();
                var h = cp.height();
                var bw = document.documentElement.clientWidth;
                var bh = document.documentElement.clientHeight;
                if ((newpos.left + w) >= bw) {
                    newpos.left = bw - w - 2;
                }
                if ((newpos.top + h) >= bh) {
                    newpos.top = pos.top - h - 2;
                }
                if (newpos.left < 0) {
                    newpos.left = 10;
                }
                if (newpos.top < 0) {
                    newpos.top = 10;
                }
                $("#BBIT-DP-MP").hide();
                newpos.visibility = "visible";
                cp.css(newpos);
                
                $(this).attr("isshow", "1");
                $(document).one("click", function(e) {
                    me.attr("isshow", "0");
                    cp.removeData("ctarget").removeData("cpk").removeData("indata");
                    cp.css("visibility", "hidden");
                });

                return false;
            });
        });
        function create() {
            var cp = $("#BBIT_DP_CONTAINER");
            if (cp.length == 0) {
                var cpHA = [];
                cpHA.push("<div id='BBIT_DP_CONTAINER' class='bbit-dp' style='width:175px;z-index:999;'>");
                if (!-[1,]&&!window.XMLHttpRequest) {
                    cpHA.push('<iframe style="position:absolute;z-index:-1;width:100%;height:205px;top:0;left:0;scrolling:no;" frameborder="0" src="about:blank"></iframe>');
                }
                cpHA.push("<table class='dp-maintable' cellspacing='0' cellpadding='0' style='width:175px;'><tbody><tr><td>");
                cpHA.push("<table class='bbit-dp-top' cellspacing='0'><tr><td class='bbit-dp-top-left'> <a id='BBIT_DP_LEFTBTN'>&nbsp;</a></td><td class='bbit-dp-top-center' align='center'><em><button id='BBIT_DP_YMBTN'></button></em></td><td class='bbit-dp-top-right'><a id='BBIT_DP_RIGHTBTN'>&nbsp;</a></td></tr></table>");
                cpHA.push("</td></tr>");
                cpHA.push("<tr><td>");
                cpHA.push("<table id='BBIT_DP_INNER' class='bbit-dp-inner' cellspacing='0'><thead><tr>");
                for (var i = 0; i < 7; i++) {
                    cpHA.push("<th><span>", op.weekName[i], "</span></th>");
                }
                cpHA.push("</tr></thead>");
                cpHA.push("<tbody></tbody></table>");
                cpHA.push("</td></tr>");
                cpHA.push("<tr><td class='bbit-dp-bottom' align='center'><button id='BBIT-DP-TODAY'>今日</button></td></tr>");
                cpHA.push("</tbody></table>");
                cpHA.push("<div id='BBIT-DP-MP' class='bbit-dp-mp'  style='z-index:auto;'><table id='BBIT-DP-T' style='width: 175px; height: 193px' border='0' cellspacing='0'><tbody>");
                cpHA.push("<tr>");
                cpHA.push("<td class='bbit-dp-mp-month' xmonth='0'><a>", op.monthName[0], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='6'><a>", op.monthName[6], "</a></td><td class='bbit-dp-mp-ybtn' align='middle'><a id='BBIT-DP-MP-PREV' class='bbit-dp-mp-prev'></a></td><td class='bbit-dp-mp-ybtn' align='middle'><a id='BBIT-DP-MP-NEXT' class='bbit-dp-mp-next'></a></td>");
                cpHA.push("</tr>");
                cpHA.push("<tr>");
                cpHA.push("<td class='bbit-dp-mp-month' xmonth='1'><a>", op.monthName[1], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='7'><a>", op.monthName[7], "</a></td><td class='bbit-dp-mp-year'><a></a></td><td class='bbit-dp-mp-year'><a></a></td>");
                cpHA.push("</tr>");
                cpHA.push("<tr>");
                cpHA.push("<td class='bbit-dp-mp-month' xmonth='2'><a>", op.monthName[2], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='8'><a>", op.monthName[8], "</a></td><td class='bbit-dp-mp-year'><a></a></td><td class='bbit-dp-mp-year'><a></a></td>");
                cpHA.push("</tr>");
                cpHA.push("<tr>");
                cpHA.push("<td class='bbit-dp-mp-month' xmonth='3'><a>", op.monthName[3], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='9'><a>", op.monthName[9], "</a></td><td class='bbit-dp-mp-year'><a></a></td><td class='bbit-dp-mp-year'><a></a></td>");
                cpHA.push("</tr>");

                cpHA.push("<tr>");
                cpHA.push("<td class='bbit-dp-mp-month' xmonth='4'><a>", op.monthName[4], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='10'><a>", op.monthName[10], "</a></td><td class='bbit-dp-mp-year'><a></a></td><td class='bbit-dp-mp-year'><a></a></td>");
                cpHA.push("</tr>");

                cpHA.push("<tr>");
                cpHA.push("<td class='bbit-dp-mp-month' xmonth='5'><a>", op.monthName[5], "</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='11'><a>", op.monthName[11], "</a></td><td class='bbit-dp-mp-year'><a></a></td><td class='bbit-dp-mp-year'><a></a></td>");
                cpHA.push("</tr>");
                cpHA.push("<tr class='bbit-dp-mp-btns'>");
                cpHA.push("<td colspan='4'><button id='BBIT-DP-MP-OKBTN' class='bbit-dp-mp-ok'>确认</button><button id='BBIT-DP-MP-CANCELBTN' class='bbit-dp-mp-cancel'>取消</button></td>");
                cpHA.push("</tr>");

                cpHA.push("</tbody></table>");
                cpHA.push("</div>");
                cpHA.push("</div>");

                var s = cpHA.join("");
                $(document.body).append(s);
                cp = $("#BBIT_DP_CONTAINER");
                cp.click(function() {
                    return false;
                });
                initevents();
            }
			return cp;
        }
        function initevents() {
            $("#BBIT-DP-TODAY").click(returntoday);
            $("#BBIT_DP_INNER tbody").click(tbhandler);
            $("#BBIT_DP_LEFTBTN").click(prevm);
            $("#BBIT_DP_RIGHTBTN").click(nextm);
            $("#BBIT_DP_YMBTN").click(showym);
            $("#BBIT-DP-MP").click(mpclick);
            $("#BBIT-DP-MP-PREV").click(mpprevy);
            $("#BBIT-DP-MP-NEXT").click(mpnexty);
            $("#BBIT-DP-MP-OKBTN").click(mpok);
            $("#BBIT-DP-MP-CANCELBTN").click(mpcancel);
        }
        function mpcancel() {
            $("#BBIT-DP-MP").animate({ top: -193 }, { duration: 200, complete: function() { $("#BBIT-DP-MP").hide(); } });
            return false;
        }
        function mpok() {
            op.Year = op.cy;
            op.Month = op.cm + 1;
            op.Day = 1;
            $("#BBIT-DP-MP").animate({ top: -193 }, { duration: 200, complete: function() { $("#BBIT-DP-MP").hide(); } });
            writecb();
            return false;
        }
        function mpprevy() {
            var y = op.ty - 10
            op.ty = y;
            rryear(y);
            return false;
        }
        function mpnexty() {
            var y = op.ty + 10
            op.ty = y;
            rryear(y);
            return false;
        }
        function rryear(y) {
            var s = y - 4;
            var ar = [];
            for (var i = 0; i < 5; i++) {
                ar.push(s + i);
                ar.push(s + i + 5);
            }
            $("#BBIT-DP-MP td.bbit-dp-mp-year").each(function(i) {
                if (op.Year == ar[i]) {
                    $(this).addClass("bbit-dp-mp-sel");
                }
                else {
                    $(this).removeClass("bbit-dp-mp-sel");
                }
                $(this).html("<a>" + ar[i] + "</a>").attr("xyear", ar[i]);
            });
        }
        function mpclick(e) {
            var panel = $(this);
            var et = e.target || e.srcElement;
            var td = getTd(et);
            if (td == null) {
                return false;
            }
            if ($(td).hasClass("bbit-dp-mp-month")) {
                if (!$(td).hasClass("bbit-dp-mp-sel")) {
                    var ctd = panel.find("td.bbit-dp-mp-month.bbit-dp-mp-sel");
                    if (ctd.length > 0) {
                        ctd.removeClass("bbit-dp-mp-sel");
                    }
                    $(td).addClass("bbit-dp-mp-sel")
                    op.cm = parseInt($(td).attr("xmonth"));
                }
            }
            if ($(td).hasClass("bbit-dp-mp-year")) {
                if (!$(td).hasClass("bbit-dp-mp-sel")) {
                    var ctd = panel.find("td.bbit-dp-mp-year.bbit-dp-mp-sel");
                    if (ctd.length > 0) {
                        ctd.removeClass("bbit-dp-mp-sel");
                    }
                    $(td).addClass("bbit-dp-mp-sel")
                    op.cy = parseInt($(td).attr("xyear"));
                }
            }
            return false;
        }
        function showym() {
            var mp = $("#BBIT-DP-MP");
            var y = op.Year;
            op.cy = op.ty = y;
            var m = op.Month - 1;
            op.cm = m;
            var ms = $("#BBIT-DP-MP td.bbit-dp-mp-month");
            for (var i = ms.length - 1; i >= 0; i--) {
                var ch = $(ms[i]).attr("xmonth");
                if (ch == m) {
                    $(ms[i]).addClass("bbit-dp-mp-sel");
                }
                else {
                    $(ms[i]).removeClass("bbit-dp-mp-sel");
                }
            }
            rryear(y);
            mp.css("top", -193).show().animate({ top: 0 }, { duration: 200 });
        }
        function getTd(elm) {
            if (elm.tagName.toUpperCase() == "TD") {
                return elm;
            }
            else if (elm.tagName.toUpperCase() == "BODY") {
                return null;
            }
            else {
                var p = $(elm).parent();
                if (p.length > 0) {
                    if (p[0].tagName.toUpperCase() != "TD") {
                        return getTd(p[0]);
                    }
                    else {
                        return p[0];
                    }
                }
            }
            return null;
        }
        function tbhandler(e) {
            var et = e.target || e.srcElement;
            var td = getTd(et);
            if (td == null) {
                return false;
            }
            var $td = $(td);
            if (!$(td).hasClass("bbit-dp-disabled")) {
                var s = $td.attr("xdate");              
                cp.data("indata",stringtodate(s));
                returndate();
            }
            return false;
        }
        function stringtodate(datestr) {
            var arrs = datestr.split(op.separate);
            var year = parseInt(arrs[0]);
            var month = parseInt(arrs[1]) - 1;
            var day = parseInt(arrs[2]);
            return new Date(year, month, day);
        }
        function prevm() {
            if (op.Month == 1) {
                op.Year--;
                op.Month = 12;
            }
            else {
                op.Month--
            }
            writecb();
            return false;
        }
        function nextm() {
            if (op.Month == 12) {
                op.Year++;
                op.Month = 1;
            }
            else {
                op.Month++
            }
            writecb();
            return false;
        }
        function returntoday() {
            cp.data("indata", new Date());
            returndate();
        }
        function returndate() {
            var ct = cp.data("ctarget");
            var ck = cp.data("cpk");
            var ndate = cp.data("indata")
            var ads = cp.data("ads");
            var ade = cp.data("ade");
            var dis = false;
            if (ads && ndate < ads) {
                dis = true;
            }
            if (ade && ndate > ade) {
                dis = true;
            }
            if (dis) {
                return;
            }
            else {
                ct.val(dateFormat.call(cp.data("indata"), op.formate));
            }
            ck.attr("isshow", "0");
            cp.removeData("ctarget").removeData("cpk").removeData("indata").removeData("ads").removeData("ade");
            cp.css("visibility", "hidden");
            ct = ck = null;
        }
        function writecb() {
            var tb = $("#BBIT_DP_INNER tbody");
            $("#BBIT_DP_YMBTN").html(op.Year + '年 ' + op.monthName[op.Month - 1]);
            var firstdate = new Date(op.Year, op.Month - 1, 1);
            var showmonth = op.Month - 1;
            var startdate = DateAdd("d", -firstdate.getDay(), firstdate);
            var enddate = DateAdd("d", 42, startdate);
            var ads = cp.data("ads");
            var ade = cp.data("ade");
            var bhm = [];
            var tds = dateFormat.call(op.today, op.formate);
            var indata = cp.data("indata");
            var ins = indata != null ? dateFormat.call(indata, op.formate) : "";
            for (var i = 1; i <= 42; i++) {
                if (i % 7 == 1) {
                    bhm.push("<tr>");
                }
                var ndate = DateAdd("d", i - 1, startdate);
                var tdc = [];
                var dis = false;
                if (ads && ndate < ads) {
                    dis = true;
                }
                if (ade && ndate > ade) {
                    dis = true;
                }
                if (ndate.getMonth() < showmonth) {
                    tdc.push("bbit-dp-prevday");
                }
                else if (ndate.getMonth() > showmonth) {
                    tdc.push("bbit-dp-nextday");
                }

                if (dis) {
                    tdc.push("bbit-dp-disabled");
                }
                else {
                    tdc.push("bbit-dp-active");
                }

                var s = dateFormat.call(ndate, op.formate);
                if (s == tds) {
                    tdc.push("bbit-dp-today");
                }
                if (s == ins) {
                    tdc.push("bbit-dp-selected");
                }

                bhm.push("<td class='", tdc.join(" "), "' xdate='", dateFormat.call(ndate, op.formate), "'><a><em><span>", ndate.getDate(), "</span></em></a></td>");
                if (i % 7 == 0) {
                    bhm.push("</tr>");
                }
            }
            tb.html(bhm.join(""));
        }
    };
    function dateFormat(format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "w": "0123456".indexOf(this.getDay()),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return format;
    }
    function DateAdd(interval, number, idate) {
        number = parseInt(number);
        var date;
        if (typeof (idate) == "string") {
            date = idate.split(/\D/);
            eval("var date = new Date(" + date.join(",") + ")");
        }
        if (typeof (idate) == "object") {
            date = new Date(idate.toString());
        }
        switch (interval) {
            case "y": date.setFullYear(date.getFullYear() + number); break;
            case "m": date.setMonth(date.getMonth() + number); break;
            case "d": date.setDate(date.getDate() + number); break;
            case "w": date.setDate(date.getDate() + 7 * number); break;
            case "h": date.setHours(date.getHours() + number); break;
            case "n": date.setMinutes(date.getMinutes() + number); break;
            case "s": date.setSeconds(date.getSeconds() + number); break;
            case "l": date.setMilliseconds(date.getMilliseconds() + number); break;
        }
        return date;
    }
})(jQuery);