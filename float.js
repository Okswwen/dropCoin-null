// JavaScript Document
function switch1(dis_id)
{var disp = $("div[did='d_"+dis_id+"']").css("display");
 
  if (disp =="none")  
      {
	  		$("div[did*=d_]").hide();
			$("div[did='d_"+dis_id+"']").css("display","block");
	    }
  else  $("div[did='d_"+dis_id+"']").css("display","block");
}
function ConLength(str,num)
	{ var str_len=str.length;
	  var str_con;
	  if(str_len>num) str_con=str.substring(0,num)+"......";
	  else str_con = str;
	  document.write(str_con);
	  document.onmousemove =  str;
	}
function showdeptlist(id){
	/*上面的代码是隐藏所有table，相当于重置*/

	var disp = $("table[deptlistid='j"+id+"']").css("display");

      $("table[deptlistid*='j']").hide();
	   $("table[deptlistid='j"+id+"']").show();
	
}
function show(elmnt)
{
document.getElementById(elmnt).style.visibility="visible";
}
function hide(elmnt)
{
document.getElementById(elmnt).style.visibility="hidden";
}
///////////////////////////////////////////////////多个漂浮
 function addEvent(obj,evtType,func,cap){
        cap=cap||false;
        if(obj.addEventListener){
            obj.addEventListener(evtType,func,cap);
	        return true;
        }else if(cap){
            if(document.all){
                obj.setCapture();
            }else{
                document.captureEvents(Event.MOUSEMOVE);
            }
            return true;
        }else if(obj.attachEvent){
            return obj.attachEvent("on" + evtType,func);
        }else{
	        return false;
        }
    }
    function removeEvent(obj,evtType,func,cap){
        cap=cap||false;
	    if(obj.removeEventListener){
		    obj.removeEventListener(evtType,func,cap);
		    return true;
	    }else if(cap){
            if(document.all){
                obj.releaseCapture();
            }else{
                document.releaseEvents(obj.MOUSEMOVE);
            }
            return true;
		}else if(obj.detachEvent){
	        return obj.detachEvent("on" + evtType,func);
	    }else{
		    return false;
        }
    }
    function getPageScroll(){
        var xScroll,yScroll;
	    if (self.pageXOffset) {
		    xScroll = self.pageXOffset;
	    } else if (document.documentElement && document.documentElement.scrollLeft){
		    xScroll = document.documentElement.scrollLeft;
	    } else if (document.body) {
		    xScroll = document.body.scrollLeft;
	    }
	    if (self.pageYOffset) {
		    yScroll = self.pageYOffset;
	    } else if (document.documentElement && document.documentElement.scrollTop){
		    yScroll = document.documentElement.scrollTop;
	    } else if (document.body) {
		    yScroll = document.body.scrollTop;
	    }
	    arrayPageScroll = new Array(xScroll,yScroll);
	    return arrayPageScroll;
    }
    function GetPageSize(){
        var xScroll, yScroll;
        if (window.innerHeight && window.scrollMaxY) {	
            xScroll = document.body.scrollWidth;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight){
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else {
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }
        var windowWidth, windowHeight;
        if (self.innerHeight) {
            windowWidth = self.innerWidth;
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) {
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }	
        if(yScroll < windowHeight){
            pageHeight = windowHeight;
        } else { 
            pageHeight = yScroll;
        }
        if(xScroll < windowWidth){	
            pageWidth = windowWidth;
        } else {
            pageWidth = xScroll;
        }
        arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
        return arrayPageSize;
    }
  
    ////////////////////////////////////////////////////////
    var AdMoveConfig=new Object();
    AdMoveConfig.IsInitialized=false;
    AdMoveConfig.AdCount=0;
    AdMoveConfig.ScrollX=0;
    AdMoveConfig.ScrollY=0;
    AdMoveConfig.MoveWidth=0;
    AdMoveConfig.MoveHeight=0;
    AdMoveConfig.Resize=function(){
        var winsize=GetPageSize();
        AdMoveConfig.MoveWidth=winsize[2];
        AdMoveConfig.MoveHeight=winsize[3];
        AdMoveConfig.Scroll();
    }
    AdMoveConfig.Scroll=function(){
        var winscroll=getPageScroll();
        AdMoveConfig.ScrollX=winscroll[0];
        AdMoveConfig.ScrollY=winscroll[1];
    }
    addEvent(window,"resize",AdMoveConfig.Resize);
    addEvent(window,"scroll",AdMoveConfig.Scroll);
    function AdMove(id,addCloseButton){
        if(!AdMoveConfig.IsInitialized){
            AdMoveConfig.Resize();
            AdMoveConfig.IsInitialized=true;
        }
        AdMoveConfig.AdCount++;
        var obj=document.getElementById(id);
        obj.style.position="absolute";
        var W=AdMoveConfig.MoveWidth-obj.offsetWidth;
        var H=AdMoveConfig.MoveHeight-obj.offsetHeight;
        var x = W*Math.random(),y = H*Math.random();
        var rad=(Math.random()+1)*Math.PI/6;
        var kx=Math.sin(rad),ky=Math.cos(rad);
        var dirx = (Math.random()<0.5?1:-1), diry = (Math.random()<0.5?1:-1);
        var step = 1;
        var interval;
        if(addCloseButton){
            var closebtn=document.createElement("div");
            obj.appendChild(closebtn);
            closebtn.style.position="absolute";
            closebtn.style.top="1px";
            closebtn.style.left=(obj.offsetWidth-28) + "px";
            closebtn.style.width="24px";
            closebtn.style.height="12px";
            closebtn.style.borderStyle="solid";
            closebtn.style.borderWidth="1px";
            closebtn.style.borderColor="#000";
            closebtn.style.backgroundColor="#fff";
            closebtn.style.fontSize="12px";
            closebtn.style.color="#000";
            closebtn.style.cursor="pointer";
            closebtn.innerHTML="关闭";
            closebtn.onclick=function(){
                clearInterval(interval);
                closebtn.onclick=null;
                obj.onmouseover=null;
                obj.onmouseout=null;
                obj.MoveHandler=null;
                AdMoveConfig.AdCount--;
                if(AdMoveConfig.AdCount<=0){
                    removeEvent(window,"resize",AdMoveConfig.Resize);
                    removeEvent(window,"scroll",AdMoveConfig.Scroll);
                    AdMoveConfig.Resize=null;
                    AdMoveConfig.Scroll=null;
                    AdMoveConfig=null;
                }
                obj.removeChild(closebtn);
                obj.style.overflow="hidden";
                setTimeout(function(){CloseIt(obj);},0);
            }
            var movebtn=document.createElement("div");
            obj.appendChild(movebtn);
            movebtn.style.position="absolute";
            movebtn.style.top="1px";
            movebtn.style.left=(obj.offsetWidth-56) + "px";
            movebtn.style.width="24px";
            movebtn.style.height="12px";
            movebtn.style.borderStyle="solid";
            movebtn.style.borderWidth="1px";
            movebtn.style.borderColor="#000";
            movebtn.style.backgroundColor="#fff";
            movebtn.style.fontSize="12px";
            movebtn.style.color="#000";
            movebtn.style.cursor="pointer";
            movebtn.innerHTML="移动";
            function BoxMouseMove(e){
                if(movebtn.moveflag){
                    var mx,my;
                    if(e){
                        mx=e.pageX;
                        my=e.pageY;
                    }else{
                        mx=event.x;
                        my=event.y;
                    }
                    x=mx-movebtn.lastleft;
                    y=my-movebtn.lasttop;
                    movebtn.parentNode.style.left = x + "px";
                    movebtn.parentNode.style.top = y + "px";
                }
            }
            movebtn.onmousemove=function(e){
                BoxMouseMove(e);
            }
            movebtn.onmousedown=function(e){
                var mx,my;
                if(e){
                    mx=e.pageX;
                    my=e.pageY;
                }else{
                    mx=event.x;
                    my=event.y;
                }
                addEvent(movebtn,"mousemove",BoxMouseMove,true);
                movebtn.lastleft=mx-parseInt(movebtn.parentNode.offsetLeft);
                movebtn.lasttop=my-parseInt(movebtn.parentNode.offsetTop);
                movebtn.moveflag=true;
                movebtn.style.cursor="move";
                document.onmousemove=movebtn.onmousemove;
                document.onmouseup=movebtn.onmouseup;
            }
            movebtn.onmouseup=function(){
                movebtn.moveflag=false;
                removeEvent(movebtn,"mousemove",BoxMouseMove,true);
                movebtn.style.cursor="pointer";
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
        obj.MoveHandler=function(){
            obj.style.left = (x + AdMoveConfig.ScrollX) + "px";
            obj.style.top = (y + AdMoveConfig.ScrollY) + "px";
            rad=(Math.random()+1)*Math.PI/6;
            W=AdMoveConfig.MoveWidth-obj.offsetWidth;
            H=AdMoveConfig.MoveHeight-obj.offsetHeight;
            x = x + step*kx*dirx;
            if (x < 0){dirx = 1;x = 0;kx=Math.sin(rad);ky=Math.cos(rad);} 
            if (x > W){dirx = -1;x = W;kx=Math.sin(rad);ky=Math.cos(rad);}
            y = y + step*ky*diry;
            if (y < 0){diry = 1;y = 0;kx=Math.sin(rad);ky=Math.cos(rad);} 
            if (y > H){diry = -1;y = H;kx=Math.sin(rad);ky=Math.cos(rad);}
        }
        this.SetLocation=function(vx,vy){x=vx;y=vy;}
        this.SetDirection=function(vx,vy){dirx=vx;diry=vy;}
        this.Run=function(){
            var delay = 10;
            interval=setInterval(obj.MoveHandler,delay);
            obj.onmouseover=function(){clearInterval(interval);}
            obj.onmouseout=function(){interval=setInterval(obj.MoveHandler, delay);}
        }
    }
    function CloseIt(obj){
        var w=parseInt(obj.style.width);
        var h=parseInt(obj.style.height);
        if(isNaN(w))w=3;
        if(isNaN(h))h=3;
        w-=3;
        h-=3;
        if(w<=0&&h<=0){
            obj.style.display="none";
            return;
        }
        if(w>0){
            obj.style.width=w + "px";
        }
        if(h>0){
            obj.style.height=h + "px";
        }
        setTimeout(function(){CloseIt(obj);},2);
    }
	//-->
	
	
	// JavaScript Document
