/*
 * Created with Sublime Text 2.
 * User: shimingfeng
 * Date: 2014-02-07
 * Time: 14:17:00
 * Contact: shimingfeng@tianji.com
 */
 $(function applicationGuide(){

 	var $applicationBox = $('.application_box'),
 		$applicationBtn = $applicationBox.find('.application_btn_f'),
 		$stepOne = $applicationBox.find('.stepone'),
 		$stepOneAnother = $applicationBox.find('.stepone_another'),
 		$workYes = $stepOne.find(".yes_f"),
 		$workNo = $stepOne.find(".no_f"),
 		$stepTwo = $applicationBox.find('.steptwo'),
 		$stepTwoAnother = $applicationBox.find('.steptwo_another'),
 		$stepOneConfirm = $stepOneAnother.find('.confirm'),
 		$spTwoCon = $stepTwo.find('.confirm'),
 		$spTwoAnCon = $stepTwoAnother.find('.confirm'),
 		$stepThree = $applicationBox.find('.stepthree'),
 		$stepThreeAnother = $applicationBox.find('.stepthree_another'),
 		$eduYes = $stepThree.find('.yes_f'),
 		$eduNo = $stepThree.find('.no_f'),
 		$stepFour = $applicationBox.find('.stepfour')
 		$spFourCon = $stepFour.find('.confirm'),
 		$stepFive = $applicationBox.find('.stepfive'),
 		$spFiveCon = $stepFive.find('.confirm'),
 		$stepSix = $applicationBox.find('.stepsix'),
 		$spThreeAnoCon = $stepThreeAnother.find('.confirm');
 		//$stepFourAnother = applicationBox.find('.stepfour_another');

 	//flag为是否显示申请人才库按钮标志

 	var flag = true;  //需要获取

 	if(flag) {
 		allStart();	
 	} else{
 		
 	}

 	function allStart(){
 		$applicationBtn.show();
 		$applicationBtn.click(function(e){
 			e.preventDefault();
 			stepOne(); 			
 		});
 	};
 	

 	function stepOne(){
 		//判断工作信息是否为空
 		var workInfo = false;//需要获取

 		if(workInfo){
 			$applicationBtn.hide();
 			$stepOne.show();
 			stepTwo(); 			
 		}else{
 			$applicationBtn.hide();
 			$stepOneAnother.show();
 			$stepOneConfirm.click(function(e){
 				e.preventDefault();
 				$stepOneAnother.hide();
 				stepThree();
 			});
 		}
 	}

 	function stepTwo(){
 		//选择是或否
 			$workYes.click(function(e){
 				e.preventDefault();
 				$stepOne.hide();
 				$stepTwo.show();
 				$spTwoCon.click(function(e){
	 				e.preventDefault();
	 				$stepTwo.hide();
	 				stepThree();
 				});
 			});
 			$workNo.click(function(e){
 				e.preventDefault();
 				$stepOne.hide();
 				$stepTwoAnother.show();
 				$spTwoAnCon.click(function(e){
	 				e.preventDefault();
	 				$stepTwoAnother.hide();
	 				stepThree();
 				});
 			});
 	}

 	function stepThree(){
 		//判断教育经历是否为空
 		var educationInfo = false;
 		if(educationInfo){
 			$stepThree.show();
 			$eduYes.click(function(e){
 				e.preventDefault();
 				$stepThree.hide();
 				stepFour();
 			});
 			$eduNo.click(function(e){
 				e.preventDefault();
 				$stepThree.hide();
 				$stepThreeAnother.show();
 				$spThreeAnoCon.click(function(e){
 					e.preventDefault();
 					$stepThreeAnother.hide();
 					stepFive();
 				});
 			});
 		}else{
 			$stepThreeAnother.show();
 			$spThreeAnoCon.click(function(e){
 					e.preventDefault();
 					$stepThreeAnother.hide();
 					stepFive();
 				});
 		}
 	}

 	function stepFour(){
 		$stepFour.show();
 		$spFourCon.click(function(e){
 			e.preventDefault();
 			$stepFour.hide();
 			stepFive();
 		});
 	}

 	function stepFive(){
 		$stepFive.show();
 		$spFiveCon.click(function(e){
 			e.preventDefault();
 			$stepFive.hide();
 			stepSix();
 		});
 	}

 	function stepSix(){
 		var $suc = $stepSix.find('.application_f');
		$suc.show();
 		$stepSix.show();
 	}
 });