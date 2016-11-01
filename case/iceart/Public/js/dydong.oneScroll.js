/*
*	by dong
*	http://www.dydong.com 
*/

function indexScroll(){
	var o={};
	return o={
		data:{
			"element_top_down":[],	//向下滚动时的坐标数组
			"element_bool":true,	//是否已经加载过效果
			"mun":null,	//个数
			"index":0,
			"speed":500,
			"settimeout":"",
			
			"btn_function":"",//切换事件方法
			"btn_element":"", //切换按钮父类对象
			"btn_select":"on", //切换按钮选中按钮的CLASS
			"btn":"" //切换按钮HTML
			/*touch */
		},
		init:function(data){
			
			$.each(data,function(i,n){
				o.data[i]=data[i];
			});
			//获取个数
			this.data["mun"]=$(this.data["element"]).length-1;
			//获取所有对象的top
			this.position();
			/*--初始化数据--*/
			//如果在进行滚动，则锁死滚动条
			$('body,html').scrollTop(0);	
			$(".main").css({"height":o.data["window_height"]+"px"});
			$(".main .main-move").css({
				"transition":o.data["speed"]+"ms ease"
			});
			if(document.addEventListener){document.addEventListener('DOMMouseScroll',o.scrollFunc,false);}//W3C
			window.onmousewheel=document.onmousewheel=o.scrollFunc;//IE/Opera/Chrome/Safari
			//移动端
			if(!!this.touch) this.events.slider.addEventListener('touchstart',this.events,false);
			
		},
		position:function(){
			this.data["window_height"]=$(window).height();
			$(this.data["element"]).css({"height":o.data["window_height"]+"px"});
			$(this.data["element"]+":eq("+this.data["index"]+")").addClass("in");
			$.each($(this.data["element"]),function(i,n){
				//var	top=parseInt($(n).offset().top);
				o.data["element_bool"][i]=true;
				o.data["element_top_down"][i]=o.data["window_height"]*i;
			});
			
		},
		//判断设备是否支持touch事件
 		touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
 
	 	//事件
	 	events:{
			startPos:{x:0,y:0},endPos:{x:0,y:0},
	  		slider:document,
	  		handleEvent:function(event){
	   			if(event.type == 'touchstart'){
					this.start(event);
				}else if(event.type == 'touchmove'){
					this.move(event);
				}else if(event.type == 'touchend'){
					this.end(event);
				}
			},
	  
			//滑动开始
			start:function(event){
				//touches数组对象获得屏幕上所有的touch，取第一个touch
				var touch = event.targetTouches[0];
				//取第一个touch的坐标值
				this.startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};
				this.endPos = {x:touch.pageX.x,y:touch.pageY};
				//这个参数判断是垂直滚动还是水平滚动
				isScrolling = 0;
				this.slider.addEventListener('touchmove',this,false);
				this.slider.addEventListener('touchend',this,false);
			},
	  
			//移动
			move:function(event){
				//当屏幕有多个touch或者页面被缩放过，就不执行move操作
				if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
					var touch = event.targetTouches[0];
					this.endPos = {x:touch.pageX - this.startPos.x,y:touch.pageY - this.startPos.y};
					//isScrolling为1时，表示纵向滑动，0为横向滑动
					isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1:0;
					if(isScrolling === 1){
					//阻止触摸事件的默认行为，即阻止滚屏
					event.preventDefault();
				}
			},
	  
			//滑动释放
			end:function(event){
				//滑动的持续时间
				var duration = +new Date - this.startPos.time;
				var i = 0;
				if(Number(duration) > 10){
				if(isScrolling === 1){
					//判断是上移还是下移，当偏移量大于10时执行

					if(this.endPos.y < -10){
						i = 1;
					}else if(this.endPos.y > 10){
						i = 3;
					}
				}else if(isScrolling === 0){
					//判断是左移还是右移，当偏移量大于10时执行
					//console.log(this.endPos);
					if(this.endPos.x > 10){
						i = 2;
					}else if(this.endPos.x < -10){
						i = 4;
					}
				}
				this.callback(i);
				this.startPos = this.endPos = null;
				return false;
				}
	   
				//解绑事件
				this.slider.removeEventListener('touchmove',this,false);
				this.slider.removeEventListener('touchend',this,false);
			},
	  
			//要执行函数
			callback:function(direction){
			   //上右下左1234
			   switch(direction){
					case 1:o.scrollFunc({wheelDelta:-1});break;
					//case 2:alert('右');break;
					case 3:o.scrollFunc({wheelDelta:1});break;
					//case 4:alert('左');break;
					default:break;
			   };
			}
		},
 		
		//滚动执行方法
		scrollFunc:function(e){
			
			e=e || window.event;
			e["direc"]=0;
			
			//判断方向，决定位置数组
			if(e.wheelDelta>0)e["direc"]=0;else if(e.wheelDelta<0)e["direc"]=1;
			if(e.detail<0)e["direc"]=0;else if(e.detail>0)e["direc"]=1;
			
			//判断是否在执行滚动
			if(o.data["element_bool"]){o.data["element_bool"]=false;clearTimeout(o.data["settimeout"]);}else{return;}
			//判断当前序号
			if(!isNaN(e["index"])){this.data["index"]=e["index"];}else{
				if(e["direc"]==0){
					if(o.data["index"]==0){o.scrollFunc_result();return;}else o.data["index"]--;
				}else if(e["direc"]==1){
					if(o.data["index"]==o.data["mun"]){o.scrollFunc_result();return;}else o.data["index"]++;
				}
			}
			$(o.data["element"]).not($(o.data["element"]+":eq("+o.data["index"]+")")).removeClass("in");
			$(o.data["element"]+":eq("+o.data["index"]+")").addClass("in");
			
			$(".main .main-move").css({
				"transform":"translate3d(0px, "+-1*o.data["element_top_down"][o.data["index"]]+"px, 0px)"
			});
			$(".nav-indexs .child").removeClass("on");
			$(".nav-indexs .child:eq("+o.data["index"]+")").addClass("on");
			
			if(o.data["index"]==2)$(".main-index").stop(false,true).hide(); else $(".main-index").stop(false,true).show();
			
			
			//滚动完，执行回调函数
			o.data["settimeout"]=setTimeout(o.scrollFunc_result,o.data["speed"]);
			
				
		},
		scrollFunc_result:function(){
			o.data["element_bool"]=true;
		}
		
		
	};
};