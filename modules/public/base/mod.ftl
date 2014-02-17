<#setting url_escaping_charset="UTF-8">
<#-- macro module -->
<#macro mod id='' class='' style='' wrap=false>
	<div <#if id!=''>id="${id}" </#if>class="mod<#if class!=''> ${class}</#if>"<#if style!=''> style="${style}" </#if>>
		<#if wrap==true>
			<b class="top"><b class="tl"></b><b class="tr"></b></b>
			<div class="inner">
		</#if>
		<#nested class/>
		<#if wrap==true>
			</div>
			<b class="bottom"><b class="bl"></b><b class="br"></b></b>
		</#if>
	</div>
</#macro>
<#macro hd class=''>
	<div class="hd<#if class!=''> ${class}</#if>">
		<#nested/>
	</div>
</#macro>
<#macro bd class=''>
	<div class="bd<#if class!=''> ${class}</#if>">
		<#nested/>
	</div>
</#macro>
<#macro ft class=''>
	<div class="ft<#if class!=''> ${class}</#if>">
		<#nested/>
	</div>
</#macro>

<#-- macro media -->
<#macro box id='' class='' type='box'>
<div <#if id!=''>id="${id}" </#if>class="${type}<#if class!=''> ${class}</#if>">
	<#nested/>
</div>
</#macro>
<#macro side class="">
	<div class="side<#if class!=''> ${class}</#if>">
		<#nested/>
	</div>
</#macro>
<#macro content class="">
	<div class="content<#if class!=''> ${class}</#if>">
		<#nested/>
	</div>
</#macro>

<#-- macro tabs -->
<#macro tabs id='' class=''>
	<@mod id=id class='${class} tabs'>
		<#nested/>
	</@mod>
</#macro>
<#macro tabControl>
	<ul class="tabControl">
		<#nested/>
	</ul>
</#macro>
<#macro tabContent id='' class=''>
	<ul class="tabContent">
		<#nested/>
	</ul>
</#macro>
<#macro tabItem class="disabled">
	<li class="${class}">
		<#nested/>
	</li>
</#macro>

<#-- pagination -->
<#macro pagination num current requestUri show=7 suffix="" id='' class='' >
<#local mid=(show/2)?ceiling/>
<#local text={
	"zh_CN":{
		"first":"第一页",
		"prev":"上一页",
		"next":"下一页",
		"last":"最后一页"
	},
	"en_US":{
		"first":"First",
		"prev":"Previous",
		"next":"Next",
		"last":"Last"
	}
}/>
<#if (num gt show)>
	<#if current lte mid>
		<#local start=1 end=show/>
	<#elseif current gt mid && num-current gt mid>
		<#local start=current-mid+1 end=current+mid-1/>
	<#else>
		<#local start=num-show+1 end=num/>
	</#if>
<#else>
	<#local start=1 end=num />
</#if>
<#if (num>1)>
	<div <#if id!=''>id="${id}" </#if>class="pagination<#if class!=''> ${class}</#if>">
		<#if current gt 1><a href="${requestUri}1${suffix}" class="first-item">${text[globalData.locale].first}</a><a href="${requestUri}${current-1}${suffix}" class="prev-item">${text[globalData.locale].prev}</a><#else><span class="first-item disabled">${text[globalData.locale].first}</span><span class="prev-item disabled">${text[globalData.locale].prev}</span></#if><#if start gt 1><span>...</span></#if><ol><#list start..end as x><#if x==current><li class="current"><span>${x}</span></li><#else><li><a href="${requestUri}${x}${suffix}">${x}</a></li></#if></#list></ol><#if end lt num><span>...</span></#if><#if current lt num><a href="${requestUri}${current+1}${suffix}" class="next-item">${text[globalData.locale].next}</a><a href="${requestUri}${num}${suffix}" class="last-item">${text[globalData.locale].last}</a><#else><span class="next-item disabled">${text[globalData.locale].next}</span><span class="last-item disabled">${text[globalData.locale].last}</span></#if>
	</div>
</#if>
</#macro>

<#-- bread crumbs-->
<#macro crumbs>
	<div class="crumbs">
		<ul>
			<#list 1..5 as x><#if !x_has_next><li>${x}</li><#else><li class="crumb"><a href="#">${x}</a>&gt;</li></#if></#list>
		</ul>
	</div>
</#macro>

<#-- icon -->
<#macro icon name=''><b class="icon icon-${name}"></b></#macro>
<#macro icon2 name=''><b class="icon2 icon2-${name}"></b></#macro>

<#-- second navigation -->
<#--
	1.<@secnav data=list/>, list["item"].current exists, compatible with macro invocation in previous projects,
	2.<@secnav data=list text="name"/>, data['item'].text=='name'。
-->

<#macro secnav data="" text="">
<#local nested><#nested/></#local>
<div class="channel_nav">
<#if (project=="sr")>
<span class="title icon_job">职位</span>
</#if>
<ul class="nav">
		<#list data as item>
		<#if item.text?matches('[contacts|tjcommon|job].*')>
		<li <#if item.idname??>id="${item.idname}"</#if> class="<#if item.classname??>${item.classname}</#if><#if item_index==0> first</#if>"><a class="<#if item.current??||text==item.text> current</#if>" href="${item.url}" title="<@spring.message item.text/>"><@spring.message item.text/></a></li>
		<#else>
		<li class="secnav-item<#if item.current??||text==item.text> secnav-current</#if>"><a class="secnav-inner" href="${item.url}" title="${item.text}">${item.text}</a></li>
		</#if>
		</#list>

</ul>
	<#if nested?length!=0>
	<div class="secnav-sub">
		<p>${nested}</p>
	</div>
	</#if>

</div>
</#macro>

<#macro secnav_new data="" text="" href="">
<#local nested><#nested/></#local>
	<div class="job-nav bMargin">
		<span class="bl-job-nav"></span>
		<a the-id="entryJudge" class="jobnav-sub" target="_blank" href="http://job.tianji.com/sr/authority/Navi">${href}</a>
		<span class="icon-job-nav"></span>
		<h2 class="job-tiele">职位</h2>
		<ul class="l-job-nav">
			<#list data as item>
			<li <#if item.idname??>id="${item.idname}"</#if> class="li-job-nav<#if item_index==0> first-job-nav</#if>">
				<#if item.current??||text==item.text><span class="arrow"></span></#if>
				<a href="${item.url}" class="<#if item.current??||text==item.text>current</#if>" title="<@spring.message item.text/>"><@spring.message item.text/></a>
			</li>
			</#list>
		</ul>
	</div>
</#macro>

<#macro secnav2 data="" text="">
<#local nested><#nested/></#local>
<div class="secnav">
	<ul class="secnav-list">
		<#list data as item>
		<#if item.text?matches('[contacts|tjcommon|job].*')>
		<li <#if item.idname??>id="${item.idname}"</#if> class="secnav-item<#if item.classname??>${item.classname}</#if><#if item.current??||text==item.text> secnav-current</#if>"><a class="secnav-inner" href="${item.url}" title="<@spring.message item.text/>"><@spring.message item.text/></a></li>
		<#else>
		<li class="secnav-item<#if item.current??||text==item.text> secnav-current</#if>"><a class="secnav-inner" href="${item.url}" title="${item.text}">${item.text}</a></li>
		</#if>
		</#list>
	</ul>
	<#if nested?length!=0>
	<div class="secnav-sub">
		${nested}
	</div>
	</#if>
</div>
</#macro>


<#-- return a substring if the target string's length is greater than a specific value, return the original string otherwise -->
<#function substring string length>
	<#if string?length &gt; length>
		<#local result=string?substring(0,length)+"..."/>
	<#else>
		<#local result=string/>
	</#if>
	<#return result />
</#function>


<#-- show degree icon, depend on the value passed -->
<#macro getDegree num=0>
	<#switch num>
	  <#case 1>
	    <@icon name="1st2"/>
	  <#break>
	  <#case 2>
	    <@icon name="2nd2"/>
	  <#break>
	  <#case 3>
	    <@icon name="3rd2"/>
	</#switch>
</#macro>