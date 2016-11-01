/*
*	by dong
*	http://www.dydong.com 
*/
function keepScroll(){
	
	this.data={
		"element":[],	//需要执行效果的对象数组
		"element_name":null,	//需要执行效果的数组
		"element_top_down":[],	//向下滚动时的坐标数组
		"element_top_up":[],	//向上滚动时的坐标数组
		"element_bool":[],	//是否已经加载过效果
		"offse_up":[],	//位置向上偏移
		"offse_down":[],	//位置向下偏移
		"in_func":[],	//显示时执行的方法或者样式
		"out_func":[],	//隐藏时执行的方法或者样式
		"function":{},//执行方法
		"position":0,//若有特殊处理，进行判断
		"mun":null,	//个数
		"inherit":[],//继承其他滚动的对象
	},
	this.init=function(data){
		$.extend(this.data,data);
		//定位
		this.position();
		//绑定滚动
		var oo=this;
		if(document.addEventListener){document.addEventListener('DOMMouseScroll',function(e){oo.to_scroll(e,oo);},false);}//W3C
		window.onmousewheel=document.onmousewheel=function(e){oo.to_scroll(e,oo);};//IE/Opera/Chrome/Safari
	},
	this.position=function(){
		var oo=this;
		//获取所有对象的top
		this.data["window_height"]=documentH=$(window).height();3
		var ii=0;
		$.each(this.data["element_name"],function(i,n){
			
			if($(n).length==1){point_position({"index":ii,"element":n});++ii;}
			else if($(n).length>1){
				$.each($(n),function(i1,n2){
					point_position({"index":ii,"element":n2});
					++ii;
				});
			}
			//设置总数量
			oo.data["mun"]=ii-1;
		});
		
		function point_position(data){
			var h=parseInt($(data.element).height()),
				top=parseInt($(data.element).offset().top);
			
			oo.data["element"][data.index]=$(data.element);
			oo.data["element_bool"][data.index]=true;
			oo.data["element_top_up"][data.index]=top;
			oo.data["element_top_down"][data.index]=top-oo.data["window_height"];
		}
		//console.log(oo);
		$.extend(this.data,oo.data);
	},
	this.to_scroll=function(e,o){
		//console.log(e);
		e=e || window.event;
		
		if(!o.data["position"]){
			var data={};
			data["element_top"]=[];
			var scrollTop=$(document).scrollTop();
			//判断是否有其他滚动
			$.each(o.data["inherit"],function(i,n){
				if(n)n.to_scroll(e);
			});
			//判断方向，决定位置数组
			if(e.wheelDelta>0)//向上
				data["element_top"]=o.data["element_top_down"];
			else if(e.wheelDelta<0)//下
				data["element_top"]=o.data["element_top_down"];
			if(e.detail<0)//向上
				data["element_top"]=o.data["element_top_down"];
			else if(e.detail>0)//下
				data["element_top"]=o.data["element_top_down"];
			//判断位置
			$.each(data["element_top"],function(i,n){
				//判断滚动位置
				var bool=scrollTop>=data["element_top"][i];
				if(i<o.data["mun"])
					bool&=scrollTop<data["element_top"][i+1];
				//通过判断则添加效果
				if(bool){
					var downi=i,upi=i;
					while(upi>=0){
						func_up({"data":o.data,"upi":upi});
						--upi;
					}
					while(downi<o.data["mun"]){
						++downi;
						//func_down({"data":o.data,"downi":downi});
					}
					return false;
				}
				
				
				/*上述时执行方法*/
				function func_up(data){
					
					var in_class=typeof data.data["in_func"][data['upi']]=="string"?data.data["in_func"][data['upi']]:"in",
						out_class=typeof data.data["out_func"][data['upi']]=="string"?data.data["out_func"][data['upi']]:"out",
						in_func=typeof data.data["in_func"][data['upi']]=="function"?data.data["in_func"][data['upi']]:null;
					$(data.data["element"][data['upi']]).addClass(in_class).removeClass(out_class);
					if(in_func)in_func();
				}
				/*下行时执行方法*/
				function func_down(data){
					var in_class=typeof data.data["in_func"][data['downi']]=="string"?data.data["in_func"][data['downi']]:"in",
						out_class=typeof data.data["out_func"][data['downi']]=="string"?data.data["out_func"][data['downi']]:"out",
						out_func=typeof data.data["out_func"][data['downi']]=="function"?data.data["out_func"][data['downi']]:null;
					$(data.data["element"][data['downi']]).addClass(out_class).removeClass(in_class);
					if(out_func)out_func();
				}
			});
		}
			
	}

};
