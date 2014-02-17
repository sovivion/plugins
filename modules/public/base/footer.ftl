<#if !(globalData.locale)??>
	<#assign globalData={
		"locale":"zh_CN"
	}/>
</#if>
<#assign ftnav={
	"zh_CN":[{
		"text":"关于天际",
		"url":"http://s.tianji.com/html/about.html"
	},	{
		"text":"联系方式",
		"url":"http://s.tianji.com/html/contact.html"
	},	{
		"text":"合作伙伴",
		"url":"http://s.tianji.com/html/link.html" 
	},	{
		"text":"手机客户端",
		"url":"http://m.tianji.com?ga_from=footer" 
	},	{
		"text":"天际Blog",
		"url":"http://blog.tianji.com"
	},	{
		"text":"招贤纳士",
		"url":"http://s.tianji.com/html/job.html" 
	},	{
		"text":"服务条款",
		"url":"http://s.tianji.com/html/term.html"
	},	{
		"text":"隐私政策",
		"url":"http://s.tianji.com/html/privacy.html"
	},	{
		"text":"问题建议",
		"url":"http://www.tianji.com/Report"
	}],
	"en_US":[{
		"text":"About Tianji",
		"url":"http://www.tianji.com/help/zh-gb/about2.htm"
	},	{
		"text":"Privacy",
		"url":"http://www.tianji.com/help/en/privacy_en.htm"
	},	{
		"text":"Feedback",
		"url":"http://www.tianji.com/Report"
	},	{
		"text":"Viadeo.com",
		"url":"http://www.viadeo.com/"
	}]
}/>
<#assign copyRight={
	"zh_CN":"北京盈科时代信息技术有限公司",
	"en_US":"Beijing Yingkeshidai Information Technology Co. Ltd."
}/>

<div id="footer">
	<div class="footer-nav">
		<ul class="ft-nav-list">
			<#list ftnav[globalData.locale] as item>
			<li class="ft-nav-item"><a href="${item.url}" target="_blank" class="ft-nav-link" title="${item.text}">${item.text}</a>|</li>
			</#list>
		</ul>
	</div>
	<p class="copyright">Copyright&nbsp;©&nbsp;2004-2012&nbsp;${copyRight[globalData.locale]}&nbsp;<a href="http://www.viadeo.com/">Viadeo.com</a><a class="redShield" href="http://www.hd315.gov.cn/beian/view.asp?bianhao=010202005102400013" target="_blank"><img src="http://image.tianji.com/common/img/redShield.png" alt=""/></a></p>
	<p class="icpNumber"><a href="http://www.miibeian.gov.cn" target="_blank">京ICP证050525号</a><span>京公网安备110105002161号</span> </p>
</div>