(function() {
	function leftButtonClick(){
		var leftUl = document.getElementById("left_link"),
			oLi = leftUl.children;

		for (var i = 0; i<oLi.length; i++ ) {
			oLi[i].onclick = (function(i){
				return function(){
					getXHR(i);
				}
			})(i);
		}

	}

	function createXHR(){
		if ( typeof XMLHttpRequest != "undefined" ) {
			return new XMLHttpRequest();
		} else if ( typeof ActiveXobject != "undefined" ) {
			if ( typeof arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
					i,len;
				for ( i=0,len=versions.length; i<len; i++) {
					try {
						new ActiveXobject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch (ex) {}
				}
				return new ActiveXobject(arguments.callee.activeXString);
			}
		}  else {
			throw new Error("No XHR objct avilable.");
		}
	}
			

	function getXHR(i){
		var xhr = createXHR();
		xhr.onreadystatechange = function(){
			if ( xhr.readyState == 4) {
				if ( (xhr.status>=200 && xhr.status <300) || xhr.status == 304) {
					var content = xhr.responseText;
					showPic(eval(content),i);
				}
			}
			
		}
		xhr.open("get","http://127.0.0.1:8080/work/showPic/json/anmal.json",true);
		xhr.send(null);
	}

	function showPic(content,i){		
		var rightBox = document.getElementById("right_content"),
			title = document.createElement("h1"),
			img = document.createElement("img"),
			text = document.createElement("p");
		rightBox.innerHTML = "";
		rightBox.appendChild(title);
		rightBox.appendChild(img);
		rightBox.appendChild(text);
		title.innerHTML = content[i].name;
		img.setAttribute("src", content[i].pic);
		text.innerHTML = content[i].dec;
	}

	EventUtil.addHandler(window,"load",leftButtonClick);

})();