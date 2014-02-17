/**
* [getCodeOrName 用来给code找到对应的name,或者给name找到对应的code]
* @type {Object}
*/
var getCodeOrName = {

	/**
	 * 
	 * [给城市名称找到对应的code值]
	 * @param  {[string]} name [传入的城市名称]
	 * @return {[string]}      [城市对应的code]
	 */
	"city":function(name){
		return cityDataMap.MapTwo[name]
	},
	/**
	 * [找job对应的name]
	 * @param  {[string]} code [job 对应的code]
	 * @return {[string]}      [code对应的name]
	 */
	"job":function(code){
		return jobDataMap[code]
	},
	/**
	 * [找行业对应的name]
	 * @param  {[string]} code [industry 对应的code]
	 * @return {[string]}      [code对应的name]
	 */
	"industry":function(code){
		var name=""
		switch(code.length)
		{
			case 3:
				name = industryDataMap.MapTwo[code.substring(0,1)][code];
				break;
			case 4:
				name = industryDataMap.MapTwo[code.substring(0,2)][code];
				break;		
		}
		return name
	}
}

/**
 * [findData 针对城市、行业。给一级的code找到对应二级的code和name]
 * @return{[arr]}
 */
var findData = {
	
	"city":function(code){

		var json = cityDataMap.MapTwo;
		var arr = [];

		for(var i in json)
		{
			if(code == json[i].split("-")[1])
			{
				var _json={"name":i,"code":json[i]};
				arr.push(_json);
			}
		}
		return arr;
	},
	"industry":function(code){

		var json = industryDataMap.MapTwo[code];
		var arr = [];

		for(var i in json)
		{
			var _json={"name":i,"code":json[i]};
			arr.push(_json);
		}
		return arr;
	}
}

$(".industryC").each(function(){

	var code = $(this).attr("code");
	var name = getCodeOrName.industry(code);
	$(this).html(name);

})
$(".jobC").each(function(){

	var code = $(this).attr("code");
	var name = getCodeOrName.job(code);
	$(this).html(name);

})