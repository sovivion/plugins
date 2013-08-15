/**
 * @fileOverview 标签云原生插件
 * @author shimingfeng
 * @create 2013.07.31
 * @version 0.1
 */
;(function() {
    //全局函数
    window.tagCloud = function(id, option) {
        var gvar = {}; 
        var defaultOption = {
            radius: 160,            //球半径
            oval:1,                 //横纵轴比 用于生成椭圆 
            speed: 10,              //旋转速度
            zoom: 0.5,              //透视 缩放度
            gain: 0.3,              //鼠标阻尼 用于减弱鼠标速度
            resis: 0.8,             //惯性系数 用于控制无作用力后持续运动时间
            hover: 0.5,             //停留粘性 用于这是鼠标悬停在可点击标签上的暂时减速
            randomPos: true,        //是否随机定位
            randomColor: true       //是否随机添加颜色
        };
        //事件绑定方法
        var onEvent = (function() {
            if(document.addEventListener) {
                return function(el, name, listener) {
                    el.addEventListener(name, listener);
                }
            } else {
                return function(el, name, listener) {
                    el.attachEvent('on' + name, listener);
                }
            }
        })();
        //类型检测方法
        var isType = function(obj, type) {
			var toString = Object.prototype.toString,
				undefined;
			return(type === "Null" && obj === null) || (type === "Undefined" && obj === undefined) || toString.call(obj).slice(8, -1) === type;
		};
        //深度拷贝方法
        var deepCopy = function(result, source) {
			for(var key in source) {
				var copy = source[key];
				if(result === copy) continue;
				if(isType(copy, "Array")) {
					result[key] = arguments.callee(result[key] || [], copy);
				} else if (isType(copy, "Object")) {
					result[key] = arguments.callee(result[key] || {}, copy);
				} else {
					result[key] = copy;
				}
			}
			return result;
		};
        //全局变量
        gvar.option = deepCopy(defaultOption, option);
        gvar.sphereOver = false;
        gvar.pointOver = false;
        gvar.con = document.getElementById(id);
        gvar.tagList = gvar.con.getElementsByTagName('a');
        gvar.tagLen = gvar.tagList.length;
        gvar.matrix = [];
        gvar.degRad = Math.PI / 180; 
        gvar.mouseX = 0;
        gvar.mouseY = 0;                  
        gvar.alfa = 1;
        gvar.beta = 1;    
        gvar.sinAlfa = 0;
        gvar.cosAlfa = 1;
        gvar.sinBeta = 0;
        gvar.cosBeta = 1;  
        gvar.con.style.position = 'relative';                
        for (i = 0; i < gvar.tagLen; i++) {
            //生成点集
            var point = {};
            point.offsetWidth = gvar.tagList[i].offsetWidth;
            point.offsetHeight = gvar.tagList[i].offsetHeight;
            gvar.matrix.push(point);
            gvar.tagList[i].style.position = 'absolute';
            //绑定标签事件
            onEvent(gvar.tagList[i], 'mouseover', function () {
                gvar.sphereOver = false;
                gvar.pointOver = true;
            });
            onEvent(gvar.tagList[i], 'mouseout', function () {
                gvar.sphereOver = true
                gvar.pointOver = false;
            });
        }
        onEvent(gvar.con, 'mouseover', function() {
            gvar.sphereOver = true;
        });
        onEvent(gvar.con, 'mouseout', function() {
            gvar.sphereOver = false;
        });
        onEvent(gvar.con, 'mousemove', function(e) {
            var event = window.event || e;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            gvar.mouseX = (event.clientX + scrollLeft - (gvar.con.offsetLeft + gvar.con.offsetWidth / 2)) * gvar.option.gain / gvar.option.oval;
            gvar.mouseY = (event.clientY + scrollTop - (gvar.con.offsetTop + gvar.con.offsetHeight / 2)) * gvar.option.gain;
        });
        create(gvar);   
        setInterval(reDraw(gvar), 50);                    
    };
    /**  
     * 创建云
     */
    function create(gvar) {
        var angA = 0;
        var angB = 0;
        var arr = [];
        for (var i = 0; i < gvar.tagLen; i++) {
            arr.push(gvar.tagList[i]);
        }
        // 随机位置
        if(gvar.option.randomPos) {
            arr.sort(function() {
                return Math.random() > 0.5 ? 1 : -1;
            });
        }
        // Z轴排序
        arr.sort(function(pointA, pointB) {
            if (pointA.z > pointB.z) {
                return -1;
            } else if (pointA.z < pointB.z) {
                return 1;
            } else {
                return 0;
            }
        });
        for (var i = 0; i < gvar.tagLen; i++) {
            // 随机颜色
            if(gvar.option.randomColor) {
                switch (i % 4) {
                    case 0:
                        arr[i].style.color = 'red';
                        break;
                    case 1:
                        arr[i].style.color = 'yellow';
                        break;
                    case 2:
                        arr[i].style.color = 'blue';
                        break;
                    default:
                        //arr[i].style.color = 'white';
                        
                }
            }
            //均匀分布
            angA = Math.acos(-1 + (2 * i + 1) / gvar.tagLen);
            angB = Math.sqrt(gvar.tagLen * Math.PI) * angA;
            //x, y, z定位
            gvar.matrix[i].x= gvar.option.radius * Math.cos(angB) * Math.sin(angA);
            gvar.matrix[i].y = gvar.option.radius * Math.sin(angB) * Math.sin(angA);
            gvar.matrix[i].z = gvar.option.radius * Math.cos(angA);
            gvar.matrix[i].persp = 1 + gvar.matrix[i].z * gvar.option.zoom / gvar.option.radius;
            setPoint(gvar, i);
        }
    }
    /**  
     * 重绘云
     */
    function reDraw(gvar) {
        return function() {
            var delAlfa;    //α角增量
            var delBeta;    //β角增量
            if (gvar.sphereOver) {
                delAlfa = (Math.min( Math.max(-gvar.mouseY, -gvar.option.radius), gvar.option.radius) / gvar.option.radius) * gvar.option.speed;
                delBeta = (-Math.min( Math.max(-gvar.mouseX, -gvar.option.radius), gvar.option.radius) / gvar.option.radius ) * gvar.option.speed;
                if(gvar.pointOver) {
                    delAlfa *= 1 - gvar.option.hover;
                    delBeta *= 1 - gvar.option.hover;
                }
            } else {
                delAlfa = gvar.alfa * gvar.option.resis;
                delBeta = gvar.beta * gvar.option.resis;
            }
            gvar.alfa = delAlfa;
            gvar.beta = delBeta;  
            if (Math.abs(delAlfa) > 0.1 || Math.abs(delBeta) > 0.1) {
                delAlfa *= gvar.degRad;
                delBeta *= gvar.degRad;
                gvar.sinAlfa = Math.sin(delAlfa);
                gvar.cosAlfa = Math.cos(delAlfa);
                gvar.sinBeta = Math.sin(delBeta);
                gvar.cosBeta = Math.cos(delBeta);
                for (var i = 0; i < gvar.tagLen; i++) {
                    //坐标转换
                    var arcX = gvar.matrix[i].x;
                    var arcY = gvar.matrix[i].y * gvar.cosAlfa - gvar.matrix[i].z * gvar.sinAlfa;
                    var arcZ = gvar.matrix[i].y * gvar.sinAlfa + gvar.matrix[i].z * gvar.cosAlfa;
                    gvar.matrix[i].x= arcX * gvar.cosBeta + arcZ * gvar.sinBeta;
                    gvar.matrix[i].y = arcY;
                    gvar.matrix[i].z = arcZ * gvar.cosBeta - arcX * gvar.sinBeta;
                    gvar.matrix[i].persp = 1 + gvar.matrix[i].z * gvar.option.zoom / gvar.option.radius;                         
                    setPoint(gvar, i);
                }
            } 
        }
    }             
    /**  
     * 设置点属性
     */
    function setPoint(gvar, index) {
        var el = gvar.tagList[index],
            point = gvar.matrix[index];
        el.style.left = gvar.option.oval * point.x + gvar.con.offsetWidth / 2 - point.offsetWidth / 2 + 'px';
        el.style.top = point.y + gvar.con.offsetHeight / 2 - point.offsetHeight / 2 + 'px';
        el.style.fontSize = Math.ceil(12 * point.persp / 2) + 8 + 'px';
        el.style.filter = "alpha(opacity=" + 100 * point.persp + ")";
        el.style.opacity = point.persp;
        el.style.zIndex = i;    
    }
})(window);