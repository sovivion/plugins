/*
 * Created with Sublime Text 2.
 * User: jason.wang
 * Date: 2013-06-25
 * Time: 14:06:44
 * Contact: wangzhiwei@tianji.com
 */

(function($){
	$.fn.msIndustryPlugin = function(options)
	{
	
		var defaults = {
			type:'default',
			check:'checkbox',
			maxCount:5,
			column:6,
			comData:[],
			init:[],
			name:'defaultCode',
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
							    "<div class='txt-box-tip'>请选择行业</div>"+
							"</div>"+
							"<input type='hidden' class='ms_checkInput' value='' name='"+msPick.name+"' />"+
						"</div>";

		$(this).append($(strInput));

		msPick.structure ="";

		msPick.allData = {};
		
		msPick.listData = {};

		msPick.DataMap = {};

		msPick.id="";

		switch(msPick.type)
		{
			
			case "industry":
			msPick.tabName = "常用行业";
			msPick.tabNameChoice = "行业选择";		
			break;
			
			case "certificate":
			msPick.tabName = "常用证书";
			msPick.tabNameChoice = "证书选择";
			break;

			case "skill":
			msPick.tabName = "常用技能";
			msPick.tabNameChoice = "技能选择";
			
			break;
		}

		msPick.id = "msPickDefault"+parseInt(Math.random()*1000000);
		msPick.structure ="<div class='ms-pick' id='"+msPick.id+"'>"+
							"<div class='ms-pick-nei'>"+
							    "<div class='w-h-tab-component'>"+
							        "<ul class='h-tab clearfix'>"+
							            "<li class='tab-menu-component'>"+msPick.tabNameChoice+"</li>"+
							        "</ul>"+
							    	"<a class='close-component' href='javascript:;'>删除</a>"+
							    "</div>"+
							    "<div class='c-tab'>"+
							    "<div class='tab-con-component tab-con-width' style='display:none'>"+
							            "<div class='otherAll'>"+
							            "</div>"+
							        "</div>"+
							    "</div>"+
						    "</div>"+
						    "<iframe border='0' frameborder='0' style='position: absolute; z-index: -1; left: 0px; top: 0px; width:100%; height:100%'></iframe>"+
						"</div>";

		msPick.allData = msPick.allDataMap.MapOne;
		msPick.DataMap = msPick.allDataMap.MapTwo;
		_.each(msPick.allDataMap.MapTwo,function(obj){
			_.each(obj,function(value,key){
				//console.log(key+","+value);
				msPick.listData[key] = value;
			})
		})




		$("body").append($(msPick.structure));
			
		var $this = $(this);

		/**
		 * [行业中给code获取name]
		 * @param  {[type:string]} code [description:传入的code]
		 * @return {[type:string]}      [description:返回对应的name]
		 */
		msPick.getName = function(code)
		{
			var name = "";
			switch(code.length)
			{
				case 3:
					name = msPick.DataMap[code.substring(0,1)][code];
					break;
				case 4:
					name = msPick.DataMap[code.substring(0,2)][code];
					break;		
			}
			return name;
		}

		msPublic(msPick,$this);

		return this;
	}

	
})(jQuery)