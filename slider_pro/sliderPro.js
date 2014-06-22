(function(){
		function loadDocument(){
			var sliderBox = document.getElementById("content"),
				srcAdr = [];
				
			//外框垂直居中
			var wrapBox = sliderBox.parentNode,
				wrapW = wrapBox.clientWidth,
				wrapH = wrapBox.clientHeight,
				sliderBoxLeft = (wrapW - sliderBox.clientWidth)/2,
				sliderBoxtop = (wrapH - sliderBox.clientHeight)/2;
			sliderBox.style.left = sliderBoxLeft + "px";
			sliderBox.style.top = sliderBoxtop + "px";

			var sliderBoxWidth = sliderBox.clientWidth,
				sliderBoxHeight = sliderBox.clientHeight;
			var per = sliderBoxWidth / sliderBoxHeight;

			//预加载前三张
			var oUl = sliderBox.children[0];
				oLi = oUl.children;
				oUl.style.position = "absolute";
				oUl.style.left = 0 + "px";

			for(var i = 0; i<oLi.length; i++) {
				var image = oLi[i].children[0];
				EventUtil.addHandler(image, "load", setPic(image));
				if(i < 3) {
					loadImage(image);
					oLi[0].setAttribute("class","curr");
				}
			}
			//图片加载
			function loadImage(arg){
				var asrc = arg.getAttribute("asrc");
				arg.setAttribute("src", asrc); 
			}
			//图片等比绽放
			function setPic(arg){
				return function(){
					var w = arg.width;
					var h = arg.height;
					var marginTop;
					var marginLeft;

					if(w / h > per) {
						if(w > sliderBoxWidth) {
							h = sliderBoxWidth / w * h;
							w = sliderBoxWidth;
						}
					} else {
						if(h < sliderBoxHeight) {
							w = sliderBoxHeight / h * w;
							h = sliderBoxHeight;
						}
					}

					marginLeft = (sliderBoxWidth - w) / 2;
					marginTop = (sliderBoxHeight - h) / 2;

					arg.style.width = w + 'px';
					arg.style.height = h + 'px';
					arg.style.marginTop = marginTop + 'px';
					arg.style.marginLeft = marginLeft + 'px';
				}	
					
			}

			//轮播效果
			var prev = document.getElementById("prev"),
				next = document.getElementById("next");

			EventUtil.addHandler(prev, "click", slider("prev"));
			EventUtil.addHandler(next, "click", slider("next"));

			function slider(arg){
				return function(){
					oUl.style.position = "absolute";
					if(arg == "next"){						
						for (var k=0; k<oLi.length; k++) {
							if (oLi[k].getAttribute("class") == "curr" && oLi[k] != oUl.children[oLi.length - 1]) {
								oUl.style.left = (parseInt(oUl.style.left)-600) + "px";
								oLi[k].setAttribute("class", "");
								oLi[k+1].setAttribute("class", "curr");
								if((k+3)<oLi.length){
									var image = oLi[k+3].children[0];
									loadImage(image);
								}								
								break;
							}
						}
					}
					if(arg == "prev"){						
						for (var k=0; k<oLi.length; k++) {
							if (oLi[k].getAttribute("class") == "curr" && oLi[k] != oUl.children[0]) {
								oUl.style.left = (parseInt(oUl.style.left) + 600) + "px";
								oLi[k].setAttribute("class", "");
								oLi[k-1].setAttribute("class", "curr");
								break;
							}
						}
					}
				}				
			}

		//旋转木马
		function carousel(){

		}
			
		}
		EventUtil.addHandler(window, "load", loadDocument)
})();




