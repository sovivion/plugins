(function($){

	$.fn.opacityDiv = function(options)
	{
		var defaults={
			outId:"hiddenDiv",
			inId:"hiddenDiv_",
			zIndex:10000,
			alpha:75,
			background:"#000",
			callback: null 
		};

		var opacity = $.extend({},defaults,options);
		var str = "<div id='"+opacity.outId+"' style='position: absolute; z-index:"+opacity.zIndex+"; left: 0px; top: 0px; zoom: 1; width:100%; height:100%;'><div id='"+opacity.inId+"' style='position:absolute; z-index:"+(opacity.zIndex+1)+"; width:100%; height:100%;left:0;top:0;opacity:"+(opacity.alpha/100)+";filter:alpha(opacity="+opacity.alpha+");background:"+opacity.background+"'></div><iframe frameborder='0' border='0' style='width:100%;height:100%;position:absolute; z-index:"+opacity.zIndex+"; left:0;top:0;filter:Alpha(opacity=0);'></iframe></div>";

		$("body").append($(str));
		$(window).load(function(){

			var height = $(document).height();
			var width = $(document.body).width();
			$("#"+opacity.outId).css({"height":height,"width":width});
			$("#"+opacity.inId).css({"height":height,"width":width});
		})
		


		$(window).resize(function(){

			var width = $(document.body).width();
			var height = $(document).height();
			$("#"+opacity.outId).css({"height":height,"width":width});
			$("#"+opacity.inId).css({"height":height,"width":width});

		})
		$(window).resize();
		
	}
	
	

})(jQuery)

