class Goods{
	constructor(options){
		this.cont = options.cont;
		this.url = options.url;
		// 1、准备读取数据
		this.load();
		//4、使用事件委托绑定事件
		// this.addEvent();
	}
	load(){
		var that = this;
		this.arr = JSON.parse(getCookie("goods"));
		// $.ajax({
		// 	type: "POST",
		// 	url: that.url,
		// 	data: {goods:"同仁堂 清咽丸",_id:value.id},
		// 	dataType: "json",
		// 	success: function(res){
		// 		that.res = res;
		// 		console.log(that.res)
		// 	}
		// });
		this.display()
	}
	display(){
		var str="";
		var obj=[];
		var that = this;
		this.arr.forEach(function(value,index){
			console.log(value,index)

			// for(var i=0;i<obj.length;i++){
			// 	$.ajax({
			// 		type: "POST",
			// 		url: that.url,
			// 		data: {goods:"同仁堂 清咽丸",_id:obj[i].id},
			// 		dataType: "json",
			// 		success: function(res){
			// 			that.res = res;
			// 			console.log(that.res)
			// 		}
			// 	});
			// }
			str += `<li class="infor">
						<i class="icons i1"></i>
						<a href="detail.html" class="g_img"><img src="${value.src1}"/></a>
						<p>${value.goods}</p>
						<s class="s1">￥</s>
						<b class="each_1">${value.price}</b>
						<a href="javascript:void(0)" class="reduce">-</a>
						<input type="text" id="num" class="num" value="${value.num}" disabled/>
						<a href="javascript:void(0)" class="increase">+</a>
						<b class="total_1">${parseInt(value.price)*value.num}</b>
						<span class="del">删除</span>
					</li>`;
		});

		this.cont.innerHTML = str;
	}
// 	addEvent(){
// 		var that = this;
// 		this.cont.addEventListener("click",function(eve){
// 			var e = eve || window.event;
// 			var target = e.target || e.srcElement;
// 			if(target.className == "increase"){
// 				//5、拿到当前点击商品的货号
// 				that.id = target.parentNode.getAttribute("index");
// 				//6、准备存cookie
// 				that.setGoods();
// 			}
// 		})
// 	}
// 	setGoods(){
// //		6-1.先读cookie,以确定是否是第一次存储
// 		this.goods = getCookie("goods")==="" ? [] : JSON.parse(getCookie("goods"));
// //		6-2.判断-如果是第一次存,arr长度小于1;
// 		if(this.goods.length < 1){
// 			//第一次，直接存，存货号和数量
// 			this.goods.push({
// 				id:this.id,
// 				num:parseInt($("#num").val())
// 			})
// 		}else{
// 			var onOff = true;
// 			for(var i=0;i<this.goods.length;i++){
// 				if(this.goods[i].id === this.id){
// 					this.goods[i].num+=parseInt($("#num").val());
// 					onOff = false;
// 				}
// 			}
// 			if(onOff){
// 				this.goods.push({
// 					id:this.id,
// 					num:1
// 				})
// 			}
// 		}
// 		setCookie("goods",JSON.stringify(this.goods));
// 	}
}
new Goods({
	cont:document.querySelector(".goods_list"),
	url:"/api/detail"
})
