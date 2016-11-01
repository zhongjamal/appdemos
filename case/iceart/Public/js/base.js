var base={
	/*urlhref*/
	urlhref:function(data){
		data.time=data.time||500;
		var top=parseInt($(data.element).offset().top);
		var headerTop=parseInt($(".header").css("height"));
		top=top-headerTop;
		$('html,body').animate({scrollTop:top},data.time);		 
	},
	/*animateClassAdd  */
	anClasAdd:function(e,keyframes,stime,dtime,an,status){
		//animation:mContentIn .8s  ease-in-out 0s  both;
		var status=status||"both",
			an=an||"ease-in-out";
		e.css({
			"animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
			"-moz-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
			"-webkit-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status,
			"-o-animation":keyframes+" "+stime+" "+an+" "+dtime+" "+status
		});
	},
	/*bool img status*/
	imgLoad:function(img, callback) {
		var timer = setInterval(function() {
			if (img.complete) {
				callback(img)
				clearInterval(timer)
			}
		}, 50)
	},
	/*auto height*/
	tableHeightBool:function(parent,child){
		$(parent).find(child).css("height","auto");
		$(parent).each(function(index, element) {
			var maxheight=$(parent+":eq("+index+")").find(child+":eq(0)").height();
			$(parent+":eq("+index+")").find(child).each(function(index1, element1) {
				if($(parent+":eq("+index+")").find(child+":eq("+index1+")").height()>maxheight)
					maxheight=$(parent+":eq("+index+")").find(child+":eq("+index1+")").height();
			});
			$(parent+":eq("+index+")").find(child).css("height",maxheight+"px");
		});
	},
	loading_img:function(element,callback){
		/*scroll*/
		var imgBool=[],
			imgBool1=[],
			timer;
		$("img,"+element).each(function(index, element) {
			var img=new Image();
			if($(element).attr("src"))img.src=$(element).attr("src"); else img.src=$(element).attr("load-image-url");
			
			imgBool[index]=false;
			imgBool1[index]=true;
			base.imgLoad(img, function() {
				imgBool[index]=true;
			});
		});
		
		timer = setInterval(function() {
			if (imgBool1.toString()==imgBool.toString()) {
				callback();
				clearInterval(timer);
			}
		}, 50);	
	}
}

$(function(){
	var navIndex=$(".header .nav li").index($(".header .nav li.on"));
	navTopAn(navIndex);
	$(".header .nav li").mouseover(function(){
		var navIndex=$(".header .nav li").index($(this));
		navTopAn(navIndex);
	}).mouseleave(function(){
		var navIndex=$(".header .nav li").index($(".header .nav li.on"));
		navTopAn(navIndex);
		
	});
});

function navTopAn(index){
	var navW=$(".header .nav li:eq("+index+")").width();
	var leftW=0;
	for(var i=index-1;i>=0;i--){
		var margin_right=parseInt($(".header .nav li:eq("+i+")").css("margin-right")),
			width=parseInt($(".header .nav li:eq("+i+")").width());
		leftW=leftW+width+margin_right;
	}
	$(".header .nav .nav-bg").css({
		"width":navW,
		"display":"block",
		"left":leftW
	});
}
document.onkeydown=function(){
	if(event.ctrlKey){return false;}
}

$(".cooperate img").mouseover(function(){
	var imageSrc=$(this).attr("src");
	if(imageSrc.indexOf("On.png")>0){}else{
		imageSrc=imageSrc.replace(".png","On.png");
	}
	$(this).attr("src",imageSrc);
}).mouseleave(function(){
	var imageSrc=$(this).attr("src");
	if(imageSrc.indexOf("On.png")>0){
		imageSrc=imageSrc.replace("On.png",".png");
	}else{}
	$(this).attr("src",imageSrc);
});







var host1=window.location.host;
var host2=document.domain;










