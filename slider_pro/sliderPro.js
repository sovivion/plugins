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

			//预加载前三张
			var oUl = sliderBox.children[0];
				oLi = oUl.children;
				oUl.style.position = "absolute";
				oUl.style.left = 0 + "px";
			for(var i = 0; i<3; i++){
				//srcAdr.push(oLi[i].children[0].getAttribute("asrc"));
				//oLi[i].children[0].setAttribute("src",srcAdr[i]);				
				var image = oLi[i].children[0];
				EventUtil.addHandler(window, "load", loadImage(image));
				EventUtil.addHandler(image, "load", setPic(image));
				oLi[0].setAttribute("class","curr");
			}
			//图片加载
			function loadImage(arg){
				var asrc = arg.getAttribute("asrc");
				arg.setAttribute("src", asrc); 
			}
			//图片等比绽放
			function setPic(arg){
				var sliderBoxWidth = sliderBox.clientWidth,
					sliderBoxHeight = sliderBox.clientHeight,
					per = sliderBoxHeight/sliderBoxWidth,
					imageWidth = arg.clientWidth,
					imageHeight = arg.clientHeight,
					newImageWidth = newImageHeight = newPer = 0;
				if (imageWidth > imageHeight) {
					arg.style.width = sliderBoxWidth + "px";
					newPer = parseInt(arg.style.width)/imageWidth;
					arg.style.height = newPer * imageHeight + "px";
					arg.style.marginTop = (sliderBoxHeight - parseInt(arg.style.height))/2 + "px";
				}
				if(imageWidth < imageHeight || imageWidth == imageHeight) {
					arg.style.height = sliderBoxHeight + "px";
					newPer = parseInt(arg.style.height)/imageHeight;
					arg.style.width = newPer*imageWidth + "px";
					arg.style.marginLeft = (sliderBoxWidth - parseInt(arg.style.width))/2 + "px";
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
								var image = oLi[k+3].children[0];
								EventUtil.addHandler(image, "load", loadImage(image));
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
			
		}
		EventUtil.addHandler(window, "load", loadDocument)
})();




