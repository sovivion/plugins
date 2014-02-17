<#macro grid id='' class='grid'>
<#if class!=''></#if>
	<div <#if id!=''>id="${id}" </#if>class="${class}">
		<#nested/>
	</div>	
</#macro>
<#macro mainCol>
	<div class="mainCol">
		<div class="mainCol-inner">
			<#nested/>
		</div>
	</div>
</#macro>
<#macro subCol>
	<div class="subCol">
		<#nested/>
	</div>
</#macro>
<#macro extraCol>
	<div class="extraCol">
		<#nested/>
	</div>	
</#macro>
