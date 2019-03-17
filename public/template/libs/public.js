//日期格式化
function createDate(){
	var d = new Date()
	var y = d.getFullYear()
	var m = d.getMonth()
	var mydate = d.getDate()
	var day = d.getDay()
	var h = d.getHours()
	var mts = d.getMinutes()
	var s = d.getSeconds()
	switch(day){
		case 0:day = "星期日";break;
		case 1:day = "星期一";break;
		case 2:day = "星期二";break;
		case 3:day = "星期三";break;
		case 4:day = "星期四";break;
		case 5:day = "星期五";break;
		case 6:day = "星期六";break;
	}
	return  y + "年"+ createZero(m+1) +"月"+ createZero(mydate) +"日 "+ day +" "+ createZero(h) +":"+ createZero(mts) +":"+createZero(s);
}
//补零
function createZero(n){
	if(n<10 || n.length<2){
		return "0"+n
	}else{
		return n
	}
}
// 计算两个日期之间的差值
function myGetDate(date1,date2){
	var d1 = new Date(date1);
	// 默认参数的处理：传了两个参数，就是两个固定日期的差值，传了一个参数，就是指定日期距离当前日期的差值
	if(date2){
		var d2 = new Date(date2);
	}else{
		var d2 = new Date();
		date2 = "当前时间";
	}
	console.log(d2)
	// 先获取时间戳，再计算差值，得到是两个日期之间相差的毫秒数
	// var sum = Math.abs(d1.getTime() - d2.getTime());
	// 直接将两个日期对象，进行计算，得到两个时期之间相差的毫秒数
	var sum = Math.abs(d1 - d2);
	// 根据毫秒数计算天，时，分
	var day = parseInt(sum/1000/60/60/24);
	var h = parseInt(sum/1000/60/60) - day*24;
	var m = parseInt(sum/1000/60) - day*24*60 - h*60;
	return date1 + "距离" + date2 + "隔了" + day + "天" + h + "小时" + m + "分钟";
}

// 随机颜色
function randomColor(){
	var r = Math.round(Math.random()*255).toString(16);
	var g = Math.round(Math.random()*255).toString(16);
	var b = Math.round(Math.random()*255).toString(16);
	return "#"+createZero(r)+createZero(g)+createZero(b);
}

// 获取样式
function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr]
	}else{
		return getComputedStyle(ele,false)[attr]
	}
}

// 阻止事件冒泡的兼容
function stopBubble(e){
	if(e.stopPropagation){
		e.stopPropagation();        //正常浏览器
	}else{
		e.cancelBubble = true;      //IE
	}
}

// 阻止默认事件的兼容
function stopDefault(e){
	if(e.preventDefault){
		e.preventDefault()
	}else{
		e.returnValue = false;
	}
}
// 事件监听式绑定事件
function addEvent(ele,type,callback){
	if(ele.addEventListener){
		ele.addEventListener(type,callback)
	}else{
		ele.attachEvent("on"+type,callback)
	}
}

// 删除事件监听式绑定的事件
function removeEvent(ele,type,callback){
	if(ele.removeEventListener){
		ele.removeEventListener(type,callback)
	}else{
		ele.detachEvent("on"+type,callback)
	}
}



