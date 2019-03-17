class Goods{
	constructor(options){
		this.cont = options.cont;
		this.url = options.url;
		this.load();
		this.addEvent();
	}
	load(){
		var that = this;
		var url_goods = location.search.split("&")[1];
		var url_id1 = location.search.split("=")[1];
		var url_id = url_id1.split("&")[0];
		console.log(url_id)
		$.ajax({
			type: "POST",
			url: this.url,
			data: {goods:"同仁堂 清咽丸",_id:url_id},
			// dataType: "json",
			async:false,
			success: function(res){
				if(res.error == 1){
					alert(res.msg)
				}else{
					that.res = res;
					that.display();
				}
			}
		});
		// ajaxPost(this.url,{goods:"同仁堂 清咽丸",_id:url_id}).then(function(res){
		// 	//2、解析并保存数据
		// console.log(res)
		// 	that.res = JSON.parse(res);
		// 	//3、准备渲染页面
		// 	console.log(that.res)
		// 	that.display();
		// })
	}
	display(){
		var str = "";
		this.res.forEach(function(value){
			str += `<div class="route">
						<a href="index.html">药房网商城</a>
						<span>></span>
						<b>${value.goods}</b>
					</div>
					<div class="mdetail clear">
						<div class="m_left">
							<div class="big">
								<img src="${value.src}"/>
								<span></span>
								<p></p>
							</div>
							<div class="b_big">
								<img src="${value.src}"/>
							</div>
							<ul class="small clear">
								<li><img src="${value.src1}"/></li>
								<li><img src="${value.src2}"/></li>
								<li><img src="${value.src3}"/></li>
								<li><img src="${value.src4}"/></li>
								<li><img src="${value.src5}"/></li>
							</ul>
						</div>
						<div class="m_right">
							<h4>${value.goods}</h4>
							<ul>
								<li>
									<div class="mr_l">
										<b>通用名：</b>
										<span>${value.goods.substr(4)}</span>
									</div>
									<div class="mr_r">
										<b>商品品牌：</b>
										<span>${value.goods.substring(0,3)}</span>
									</div>
								</li>
								<li>
									<div class="mr_l">
										<b>生产企业：</b>
										<span>${value.company}</span>
									</div>
								</li>
								<li class="lsjg">
									<div class="mr_l">
										<b>零售价格：</b>
										<span>${value.price}</span>
									</div>
									<div class="mr_r">
										<b>运费</b>
										<span>${value.freight}</span>
									</div>
								</li>
								<li class="require_num">
									<div class="mr_l clear">
										<b>需求数量：</b>
										<a href="javascript:void(0)" class="reduce">-</a>
										<input type="text" id="num" class="num" value="1" />
										<a href="javascript:void(0)" class="increase">+</a>
									</div>
									<div class="mr_r">
										<b>库存：</b>
										<span>${value.stock}</span>
									</div>
								</li>
								<li class="order" index="${value._id}" price="${value.price} ">
									<a href="#" class="a1">直接购买</a>
									<a href="javascript:void(0);" class="a2">加入清单</a>
								</li>
							</ul>
						</div>
					</div>`;
		})
		this.cont.innerHTML = str;
	}
	addEvent(){
		var that = this;
		this.cont.addEventListener("click",function(eve){
			var e = eve || window.event;
			var target = e.target || e.srcElement;
			if(target.className == "a2"){
				//5、拿到当前点击商品的货号和价格
				that.id = target.parentNode.getAttribute("index");
				that.price = target.parentNode.getAttribute("price");
				//6、准备存cookie
				that.setGoods();
			}
		})
	}
	setGoods(){
//		6-1.先读cookie,以确定是否是第一次存储
		this.goods = getCookie("goods")==="" ? [] : JSON.parse(getCookie("goods"));
//		6-2.判断-如果是第一次存,arr长度小于1;
		if(this.goods.length < 1){
			//第一次，直接存，存货号和数量
			
			this.goods.push({
				id:this.id,
				num:parseInt($("#num").val()),
				price:this.price.substr(1)
			})
		}else{
			var onOff = true;
			// console.log(this.price.substr(1))
			for(var i=0;i<this.goods.length;i++){
				if(this.goods[i].id === this.id){
					this.goods[i].num+=parseInt($("#num").val());
					onOff = false;
				}
			}
			if(onOff){
				this.goods.push({
					id:this.id,
					num:1,
					price:this.price.substr(1)
				})
			}
		}
		setCookie("goods",JSON.stringify(this.goods));
	}
}
new Goods({
	cont:document.getElementById("main"),
	url:"/api/detail"
})
