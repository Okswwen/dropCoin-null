$(document).ready(function(){

	var timer=setInterval(countDown,1000);//1s执行一次
		timeOut=2*60;//设置coin出来的时间
		wait=60;//60s后，auto隐藏

	//
	function countDown(){
		if(timeOut<61&&(timeOut>0)){
			$("#coin").show();
			timeOut--;
			wait--;
			$("#cutNum1").html(wait);
			if(wait==0){
				wait=60;
			}
			displayDiv();
		}else{
			$("#coin").hide();
			timeOut--;
		}
		if(timeOut==0){
			timeOut=2*60;
		}
	}
	//鼠标悬挂上面时，stop，离开后，继续move
	$("#coin").hover(function(){
		clearInterval(timer);
		$(this).stop(true);
	},function(){
		timer=setInterval(countDown,1000);
	});

	//鼠标点击时，立马消失
	$("#coin").click(function(){
		$("#coin").hide("fast");
		timeOut=2*60;
		wait=60;
	});
	
	//coin执行的动画
	function displayDiv(){
		var randomNum1  =Math.floor(Math.random()*700)+50;//随机数的生成
			randomNum1_1=Math.floor(Math.random()*300)+20;
			randomNum2  =Math.floor(Math.random()*300)+50;
			randomNum2_1=Math.floor(Math.random()*700)+20;
		$("#coin").delay(0).animate({top: randomNum2+'px',
									 left:randomNum2_1+'px'},3500).delay(0)
 					     .animate({  left:randomNum1+'px',
	 	 					     	 top:randomNum1_1+'px'},3000).delay(0);
	}


});