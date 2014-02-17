/*
 * Created with Sublime Text 2.
 * User: jason.wang
 * Date: 2013-06-26
 * Time: 16:26:22
 * Contact: wangzhiwei@tianji.com
 */

(function($){
	$.fn.msJobPlugin = function(options)
	{
	
		var defaults = {
			type:'job',
			check:'checkbox',
			maxCount:5,
			column:6,
			comData:[],
			init:[],
			name:'jobCode',
			style:{
				"foldHeadWidth":"78px",
				"msCbComponent":"88px",
				"msOkWidth":"150px"
			},
			align:"left"
		};
		var msPick = $.extend(defaults, options);

		var strInput = "<div class='ms-btn-component ms-btn-canhover'></div>"+
						"<div class='txt-box-com-W'>"+
							"<div class='txt-box-component'>"+
							    "<div class='txt-box-tip'>请选择职能</div>"+
							"</div>"+
						"</div>"+
						"<input type='hidden' class='ms_checkInput' value='' name='"+msPick.name+"' />";

		$(this).append($(strInput));

		msPick.structure ="";

		msPick.allData = {};
		
		msPick.listData = {};
		
		msPick.id="";

		switch(msPick.type)
		{
			case 'job':
			msPick.id = "msPickJob"+parseInt(Math.random()*1000000);
			msPick.tabName = "常用职能";
			msPick.structure ="<div class='ms-pick' id='"+msPick.id+"'>"+
								"<div class='ms-pick-nei'>"+
								    "<div class='w-h-tab-component'>"+
								        "<ul class='h-tab clearfix'>"+
								            "<li class='tab-menu-component'>职能选择</li>"+
								        "</ul>"+
								    	"<a class='close-component' href='javascript:;'>删除</a>"+
								    "</div>"+
								    "<div class='c-tab'>"+
								    	"<div class='tab-con-component tab-con-width' style='width:555px;display:none'>"+
								            "<div class='otherAll' style='height:200px; overflow-y:auto;'>"+
								            "</div>"+
								        "</div>"+
								    "</div>"+
							    "</div>"+
							    "<iframe border='0' frameborder='0' style='position: absolute; z-index: -1; left: 0px; top: 0px; width:100%; height:100%'></iframe>"+
							"</div>";
			
			
			msPick.listData = msPick.allData = msPick.allDataMap;
			
			break;
		
		}


		$("body").append($(msPick.structure));
		

		
		var $this = $(this);

		msPublic(msPick,$this);

		return this;
	}

})(jQuery)