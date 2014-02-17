<#if globalData.userId=='' || globalData.userId=='undefined'>
	<@c.import url='http://image.tianji.com/tjs/header2013/html/header_unlogin.html?v=' charEncoding="UTF-8"/>
<#else>
<#if rc.getLocale() =='en_US'>
	<@c.import url='http://image.tianji.com/tjs/header2013/html/header_en.html?v=' charEncoding="UTF-8"/>
	<#else>
	<@c.import url='http://image.tianji.com/tjs/header2013/html/header.html?v=' charEncoding="UTF-8"/>
	</#if>
</#if>