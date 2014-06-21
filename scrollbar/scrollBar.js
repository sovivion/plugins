(function(){
	function loadDocument(){
		var toolBar = document.getElementById("drag_bar"),
			toolBarParent = toolBar.parentNode,
			winHeight = conHeight = conTop = startTop = endTop = barPer = 0;
		if (document.compatMode == "CSS1Compat") {
			winHeight = document.documentElement.clientHeight;
		} else {
			winHeight = document.body.clientHeight;
		}	

		//设置自定义滚动轴高度
		conHeight = document.getElementById("wrap").scrollHeight;
		
		var per = winHeight/conHeight;
		if (per < 1) {
			toolBar.style.height = (per * winHeight) + "px";
		}


		//滚轮事件
		function handleMouseWheel(event){
			event = EventUtil.getEvent(event);
			var delta = EventUtil.getWheelDelta(event);
			document.documentElement.scrollTop -= delta;
			document.body.scrollTop -= delta;	
			barPer = document.documentElement.scrollTop / conHeight || document.body.scrollTop /conHeight;
			toolBar.style.top = (barPer * (toolBarParent.clientHeight)) + "px";
		}
		
		//鼠标事件
		function handleMouseClick(event){
			conTop = 1;	
			startTop = event.clientY;
			toolBar.style.top = endTop + "px";	
		}
		function handleMouseMove(event){
			if (conTop == 1) {
				toolBar.style.top = event.clientY - (startTop - endTop)  + "px";
				barPer = parseInt(toolBar.style.top)/winHeight;
				document.documentElement.scrollTop = barPer * conHeight;
				document.body.scrollTop = barPer * conHeight;
				if (parseInt(toolBar.style.top) < 0 || parseInt(toolBar.style.top) == 0){
					toolBar.style.top = 0 + "px";
				}
				if (parseInt(toolBar.style.top) >= (winHeight - toolBar.clientHeight)){
					toolBar.style.top = (winHeight - toolBar.clientHeight) + "px";
				}
			}
		}
		function handleMouseUp(event){
			conTop = 0;
			endTop = parseInt(toolBar.style.top);
		}


		EventUtil.addHandler(document, "mousewheel", handleMouseWheel);
		EventUtil.addHandler(document, "DOMMouseScroll", handleMouseWheel);	

		EventUtil.addHandler(toolBar, "mousedown",handleMouseClick);
		EventUtil.addHandler(document, "mousemove",handleMouseMove);
		EventUtil.addHandler(document, "mouseup",handleMouseUp);
	}

	EventUtil.addHandler(window,"load",loadDocument);
})();




