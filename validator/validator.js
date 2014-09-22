(function($){
	var rules = {
			requires: {
				errorMessage: "不能为空",
				validateFn: function(){
					var resultBox = {};
				}
			}
		}

	//数据检查
	function checkData(){

	}

	$.fn.validation = function(option){
		var defaultTip = {}
		var op = $.extend(defaultTip, option||{});
		this.each(function(){
			var arr = [];
			var $thisForm = $(this);
			$thisForm.on("submit", function(){
				$thisForm.find("input").each(function(){
					var $thisInput = $(this);
					$thisInput.attr("validata-config");
					console.log($thisInput.attr("validata-config"));
				});
				return false;
			});
		});
	}
})(jQuery);