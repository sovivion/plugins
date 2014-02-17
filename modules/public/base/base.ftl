<@compress single_line=false>
<#assign c=JspTaglibs["http://java.sun.com/jstl/core"]>
<#assign globalData = navigationDataService.getNavigationData()/>

<#import "/spring.ftl" as spring />

<#assign tck ={"index":{"title":"找工作_精英招聘_天际网","keywords":"天际网,找工作,精英招聘,网络招聘,社交网络招聘,白领,求职,招聘","description":"精英招聘依托于中国最大的职业社交网站天际网,利用社交网络招聘,将招聘信息通过人际网络传递至1400万目标人群,通过职场动态多维度考量候选人,为聘用提供依据。"},"position":{"title":"公司名+“招聘”+职位名_天际网","keywords":"公司名+“招聘”+职位名,公司名,职位名,天际网,找工作,精英招聘,网络招聘,社交网络招聘,白领,求职,招聘","description":"公司名+“通过天际网招聘”+职位名+“，职位描述：”+截取职位详细前80个字"},"positions":{"title":"招聘者+“发布的”+公司名+“招聘信息”_天际网","keywords":"公司名+“的招聘信息”,公司名,天际网,找工作,精英招聘,网络招聘,社交网络招聘,白领,求职,招聘","description":"公司名+“认证雇员”+招聘者姓名+“，通过天际网发布”+公司名+“的职位信息，通过天际网了解，”+公司名+“最新职位要求及薪资待遇情况。”"},"posApplyBasic":{"title":"创建简历_天际网"},"posApplyGuide":{"title":"完善简历基本信息_天际网"},"applyResumePreview":{"title":"投递简历_天际网"},"applySuccess":{"title":"投递成功_天际网"},"intention":{"title":"我的职业意向_天际网"},"applyReply":{"title":"我的投递反馈_天际网"},"bookmark":{"title":"我的职位收藏_天际网"},"resumeManagement":{"title":"我的简历管理_天际网"},"importGuide":{"title":"创建简历_天际网"},"resumeBasic":{"title":"完善简历基本信息_天际网"}} />

<#assign tckcv={"welcome":{"title":"欢迎使用招聘服务_精英招聘_天际网","keywords":"天际网,找工作,精英招聘,网络招聘,社交网络招聘,白领,求职,招聘","description":"企业、个人免费无限量发布职位，招聘信息即刻传递至天际网1400万求职者。天际网为国内知名职业社交网站，汇聚1400万职场精英，拓展你的职业人脉，带给你无限的职业发展空间。"},"positionAdd":{"title":"尝试发布一个职位_精英招聘_天际网"},"identifyCheck":{"title":"确认招聘身份_精英招聘_天际网"},"emailCheck":{"title":"招聘身份验证_精英招聘_天际网"},"positionPublish":{"title":"发布新职位_精英招聘_天际网"},"positionUpdate":{"title":"编辑职位_精英招聘_天际网"},"positions":{"title":"我的职位管理_精英招聘_天际网"},"index":{"title":"全部简历_精英招聘_天际网"},"unread":{"title":"未读简历_精英招聘_天际网"},"forwards":{"title":"转发给我的简历_精英招聘_天际网"},"deleted":{"title":"删除的简历_精英招聘_天际网"},"previous":{"title":"往期简历_精英招聘_天际网"}} />

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	
	<@block name ="title-meta"/>
	
	<link rel="shortcut icon" type="image/x-icon" href="http://image.tianji.com/tjs/recruiting/images/tianji.ico" />
	<link rel="stylesheet" type="text/css" href="http://image.tianji.com/tjs/styles/base.css" />
	<script type="text/javascript" src="http://image.tianji.com/tjs/gallery/jquery-1.7.2.min.js"></script>
	<@block name="head"/>
</head>
<body>
	<#include 'header.ftl'/>
	<@block name="body"/>
	<div id="footer_bg"><#include 'footer.ftl'/></div>
	<@block name="extra"></@block>
</body>
</html>
</@compress>
