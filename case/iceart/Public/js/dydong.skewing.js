/*
*	by dong
*	http://www.dydong.com 
*/
function skewing(){
	var o={};
	return o={
		data:{
			"element":"", //偏移对象
			"x":0, //偏移X坐标
			"y":0,	//偏移Y坐标
			"scale":1,  //偏移比例
			"direc":1,	//移动的方向
			
			"window_width":0,	//屏幕宽度
			"window_x":0,	//屏幕中心X轴
		},
		init:function(data){
			$.extend(this.data,data);
			
			this.data["window_width"]=$(document).width();
			this.data["window_x"]=this.data["window_width"]/2;
			
			$(document).mousemove(o.move);
		},
		move:function(e){
			//console.log(e.pageX+","+e.pageY);
			
			o.data["x"]=(e.pageX-o.data["window_x"])*o.data["scale"]*o.data["direc"];
			$(o.data["element"]).css({
				"transform":"translateX("+o.data["x"]+"px)",
			});
		}
		
		
		
	};
};

















