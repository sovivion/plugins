$(function(){
	var $outBox = $(".slider_box"),
		$picBox = $outBox.find(".picBox"),
		$navBox = $outBox.find(".navBox"),
		$lBtn = $outBox.find(".prev_btn"),
		$rBtn = $outBox.find(".next_btn"),
		$pLi = $picBox.children(),
		$nLi = $navBox.children(),		
		clen = $nLi.length,
		timer = null,
		circle = true,
		pindex = cindex = 0,
		timeInterval = 3000;

	//init	

	for(var m=0; m<2; m++){
		$($pLi[m]).clone().appendTo($picBox);
	};
	var plen = $(".picBox").children().length,
		w = $picBox.width(),
		W = w * plen;
	$picBox.width(W);
	
	//basic function

	function basicPlay(index){
		$nLi.removeClass("curr");
		$($nLi[index]).addClass("curr");
		$pLi.removeClass("curr");
		$($pLi[index]).addClass("curr");

		$picBox.animate({"left": "-" + index * w}, "slow");
	}

	//circle function 

	function circlePlay(pindex, cindex){
		$nLi.removeClass("curr");
		$($nLi[cindex]).addClass("curr");
		$picBox.animate({"left": "-" + pindex * w}, "500");				
	}

	
	//auto animate
	timer = setTimeout(autoPlay, timeInterval);
	function autoPlay(){
		if($pLi.size()<=1)
		{
           return false;
		}
		pindex++;
		cindex++;
		if( pindex == plen){
			$picBox.css({"left": "-" + w + "px"});
			pindex = 2;
		}
		if( cindex == clen){
			cindex = 0;
		}

		if(circle == true){
			circlePlay(pindex, cindex);
		}else {
			basicPlay(index);
		}	

		timer = setTimeout(autoPlay, timeInterval);
	}
	//nav mouseclick function 	
	$outBox.mouseover(function(){
		clearTimeout(timer);
	});
	$nLi.click(function(){
		if($pLi.size()<=1)
		{
           return false;
		}
		cindex = pindex = $(this).index();
		circlePlay(pindex, cindex);
	});
	$outBox.mouseout(function(){
		timer = setTimeout(autoPlay, timeInterval);
	});

	//prev function 
	$lBtn.click(function(){
		if($pLi.size()<=1)
		{
           return false;
		}
		if( pindex == 0){
			$picBox.css({"left": "-" + w * clen + "px"});
			pindex = clen;
		}
		if( cindex == 0){
			cindex = clen;
		}
		cindex--;
		pindex--;
		circlePlay(pindex, cindex);
	});

	$rBtn.click(function(){
		if($pLi.size()<=1)
		{
           return false;
		}
		cindex++;
		pindex++;
		if( pindex == plen){
			$picBox.css({"left": "-" + w + "px"});
			pindex = 2;
		}
		if( cindex == clen){
			cindex = 0;
		}		
		circlePlay(pindex, cindex);
	});
});