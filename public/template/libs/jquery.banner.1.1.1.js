;(function($){
	"use strict";
	
	$.extend($.fn,{
		banner:function(options){
			this.mLocal = {
				autoPlay: options.autoPlay === false ? false : true,
				delayTime: options.delayTime || 3000,
				moveTime: options.moveTime || 300,
				index:0,
				iPrev:options.items.length-1,
				onOff:false
			}
			var that = this;
			//list
			if(options.list != undefined && options.list.length > 0){
				this.mLocal.onOff = true;
				options.list.eq(0).css("background","#0cb95f");
				
				//在mLocal中封装list移动函数
				this.mLocal.listMove = function(i,type){
					options.items.eq(this.index).css({
						left:0
					}).stop().animate({
						left:-options.items.eq(0).width() * type
					},that.mLocal.moveTime).end().eq(i).css({
						left:options.items.eq(0).width() * type
					}).stop().animate({
						left:0
					},that.mLocal.moveTime)
				}
				//给list添加点击事件
				options.list.on("click",function(){
					if(that.mLocal.index < $(this).index()){
						that.mLocal.listMove($(this).index(),1);
					}
					if(that.mLocal.index > $(this).index()){
						that.mLocal.listMove($(this).index(),-1);
					}
					if(that.mLocal.index == $(this).index()){
						console.log("budong")
					}
					that.mLocal.index = $(this).index();
					
					options.list.css("background","").eq(that.mLocal.index)
					.css("background","#0cb95f")
				})
				
			}
			this.mLocal.autoMove = function(){
				if(that.mLocal.index == options.items.length-1){
					that.mLocal.index = 0;
					that.mLocal.iPrev = options.items.length-1;
				}else{
					that.mLocal.index ++;
					that.mLocal.iPrev = that.mLocal.index - 1;
				}
				that.mLocal.btnMove(-1)
			}
			//在mLocal中封装btn移动函数
			this.mLocal.btnMove = function(type){
				options.items.eq(that.mLocal.iPrev).css({
					left:0
				}).stop().animate({
					left:options.items.eq(0).width() * type
				},that.mLocal.moveTime).end().eq(that.mLocal.index).css({
					left:-options.items.eq(0).width() * type
				}).stop().animate({
					left:0
				},that.mLocal.moveTime)
				if(that.mLocal.onOff == true){
					options.list.css("background","").eq(that.mLocal.index)
					.css("background","#0cb95f")
				}
			}
			
			//btn
			if(options.left != undefined && options.left.length > 0 &&
			options.right != undefined && options.right.length > 0){
				
				
				//给按钮添加点击事件
				options.left.on("click",function(){
					if(that.mLocal.index == 0){
						that.mLocal.index = options.items.length-1
						that.mLocal.iPrev = 0;
					}else{
						that.mLocal.index --;
						that.mLocal.iPrev = that.mLocal.index + 1;
					}
					that.mLocal.btnMove(1)
				})
				options.right.on("click",this.mLocal.autoMove)
			}
			
			//auto
			if(this.mLocal.autoPlay){
				this.mLocal.timer = setInterval(this.mLocal.autoMove,this.mLocal.delayTime)
			}
			this.hover(function(){
				clearInterval(that.mLocal.timer);
				
			},function(){
				that.mLocal.timer = setInterval(that.mLocal.autoMove,that.mLocal.delayTime)
			})
			
		}
		
	})
	
})(jQuery);