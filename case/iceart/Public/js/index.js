

$(function(){
	$(".main .main-child2 .content .child").mouseover(function(){
		var index=$(".main .main-child2 .content .child").index($(this));
		setTimeout(function(index1){
			if(index==index1){
				$(".main .main-child2 .content .child").not($(".main .main-child2 .content .child:eq("+index1+")")).removeClass("in");
				$(".main .main-child2 .content .child:eq("+index1+")").addClass("in");
				$(".main .main-child2 .child-bg").not($(".main .main-child2 .child-bg:eq("+index1+")")).css("z-index","inherit").addClass("out").removeClass("in");
				$(".main .main-child2 .child-bg:eq("+index1+")").removeClass("out").addClass("in").css("z-index",1);
			}
		},100,index);
	});


});

