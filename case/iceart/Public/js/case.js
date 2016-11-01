

/*scroll*/
$(function(){
	var muns_bool=false,
		initTop =0;
	$(window).scroll(function(){
		var scrollTop =$(this).scrollTop(),
			ducmentHeight=$(document).height()/2,
			windowHeight=$(document).height()/2;
		/*header*/
		
		if(scrollTop > initTop){$(".header").addClass("header-out");} else {$(".header").removeClass("header-out");}
		initTop = scrollTop;
		
		if(scrollTop>=ducmentHeight)
			$(".fixed").fadeIn(500);
		else
			$(".fixed").fadeOut(500);
		
	});	
	/*main-nav*/
	var lastindex=-1;
	$(".main .main-nav li").click(function(){
		var index=$(this).attr("class");
		if(lastindex==index){
			lastindex=-1;
			$(".main .main-content .child").each(function(index, element) {
				$(element).stop(false,true).fadeIn(500);
			});
		}else{
			lastindex=index;
			$(".main .main-nav li").removeClass("on");
			$(this).addClass("on");
			var index2=$(".main .main-nav li").index($(this));
			casenavTopAn(index2);
			if(index2==0){
				$(".main .main-content .child").each(function(index, element) {
					$(element).stop(false,true).fadeIn(500);
				});
				return;
			}
			$(".main .main-content .child").not($(".main .main-content ."+index)).each(function(index, element) {
				//var dtime=index*0.2;
				//base.anClasAdd($(element),"main-child-leave","1s",dtime+"s","cubic-bezier(0, 0, 0.71, 1.17)","both");
				$(element).stop(false,true).hide();
			});
			$(".main .main-content ."+index).each(function(index, element) {
				$(element).stop(false,true).fadeIn(500);
			});
		}
		
	});	

});

function casenavTopAn(index){
	
	$(".main .main-nav .nav-bg").css({
		"display":"block",
		"left":index*106+"px"
	});
}


var muns_bool=false;
function muns_func(){
	if(muns_bool==false){
		
		muns_bool=true;
		var val=[
			parseInt($(".banner-muns .mun1 .mun-title .m").html()),
			parseInt($(".banner-muns .mun2 .mun-title .m").html()),
			parseInt($(".banner-muns .mun3 .mun-title .m").html())
		],
		bool=[false,false,false],
		space=[
			parseInt(1),
			parseInt(1),
			parseInt(1)
		],
		mun=[0,0,0],
		interval=[];
		interval=[
			setInterval(function(){
				if(mun[0]>=val[0]){$(".banner-muns .mun1 .mun-title .m").html(val[0]);clearInterval(interval[0]);bool[0]=true;muns_bool=all_bool(bool[0],bool[1],bool[2]);}
				else $(".banner-muns .mun1 .mun-title .m").html(mun[0]);
				mun[0]+=space[0];
			},10),
			setInterval(function(){
				if(mun[1]>=val[1]){$(".banner-muns .mun2 .mun-title .m").html(val[1]);clearInterval(interval[1]);bool[1]=true;muns_bool=all_bool(bool[0],bool[1],bool[2]);}
				else $(".banner-muns .mun2 .mun-title .m").html(mun[1]);
				mun[1]+=space[1];
			},60),
			setInterval(function(){
				if(mun[2]>=val[2]){$(".banner-muns .mun3 .mun-title .m").html(val[2]);clearInterval(interval[2]);bool[2]=true;muns_bool=all_bool(bool[0],bool[1],bool[2]);}
				else $(".banner-muns .mun3 .mun-title .m").html(mun[2]);
				mun[2]+=space[2];
			},120)
		];
		$(".banner-muns .mun1 .mun-title .m").html("0");
		$(".banner-muns .mun2 .mun-title .m").html("0");
		$(".banner-muns .mun3 .mun-title .m").html("0");
	
		function all_bool(b1,b2,b3){if(b1&&b2&&b3)return true;}
	
	}
	
}
var mainScroll=new keepScroll();
mainScroll.init({
	"element_name":[
		".banner-muns",".main .main-content .child",".cooperate",".footer"
	],
	"in_func":[muns_func]
});

/*banner*/
var banner=new change();
	banner.position=function(){
		change().position.call(this);
		if(this.data["position_style"]=="banner"){
			$(this.data["element"]).not($(this.data["element"]+":eq("+this.data["index"]+")")).addClass("left-in")
			$(this.data["element"]+":eq("+this.data["index"]+")").addClass("in");
			
			$(this.data["element2"]).not($(this.data["element2"]+":eq("+this.data["index"]+")")).addClass("left-in")
			$(this.data["element2"]+":eq("+this.data["index"]+")").addClass("in");
			
			$(this.data["element3"]).not($(this.data["element3"]+":eq("+this.data["index"]+")")).addClass("bg-left-in")
			$(this.data["element3"]+":eq("+this.data["index"]+")").addClass("in");
		}
	}
	banner.todo=function(data){
		var bool=change().todo.call(this,data);
		if(!bool)return false;
		if(this.data["position_style"]=="banner"){
			var direc=-1;
			if(data["direc"]=="-")direc=1;
			$(this.data["element"]).not($(this.data["element"]+":eq("+this.data["index"]+")")).removeClass("in").addClass("left-out");
			$(this.data["element"]+":eq("+this.data["index"]+")").addClass("in").removeClass("left-in");
			
			$(this.data["element2"]).not($(this.data["element2"]+":eq("+this.data["index"]+")")).removeClass("in").addClass("left-out");
			$(this.data["element2"]+":eq("+this.data["index"]+")").addClass("in").removeClass("left-in");
			
			$(this.data["element3"]).not($(this.data["element3"]+":eq("+this.data["index"]+")")).removeClass("in").addClass("bg-left-out").css("z-index","1");
			$(this.data["element3"]+":eq("+this.data["index"]+")").addClass("in").removeClass("bg-left-in").css("z-index","2");
			setTimeout(function(index){
				$(banner.data["element"]).not($(banner.data["element"]+":eq("+index+")")).removeClass("left-out").addClass("left-in");
				$(banner.data["element2"]).not($(banner.data["element2"]+":eq("+index+")")).removeClass("left-out").addClass("left-in");
				$(banner.data["element3"]).not($(banner.data["element3"]+":eq("+index+")")).removeClass("bg-left-out").addClass("bg-left-in");
			},600,this.data["index"]);
			setTimeout(function(){banner.data["todo_bool"]=false;},1200);
		}
	}
	banner.init({
		"element_move":".banner-imgs2",
		"element":".banner-imgs2 .content",
		"element_move2":".banner-titles2",
		"element2":".banner-titles2 .content",
		"element_move3":"banner-bg",
		"element3":".banner-bg .bg",
		"position_style":"banner",
		"autoplay_time":6000,
		"autoplay":true
	});