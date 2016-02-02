var format1="yyyyMMdd";
var format2="yyyyMMddhh";

Date.prototype.Format = function(fmt) 
{ 
  var o = { 
    "M+" : this.getMonth()+1,     
    "d+" : this.getDate(),          
    "h+" : this.getHours(),        
    "m+" : this.getMinutes(),        
    "s+" : this.getSeconds(),      
    "q+" : Math.floor((this.getMonth()+3)/3), 
    "S"  : this.getMilliseconds()        
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

Date.prototype.getWeek = function() {
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);


}

function getCheckDay(){
	var now=new Date();

  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var week=dayNames[now.getDay()];
  console.log(dayNames[now.getDay()]);
	if(week=='Monday'){
		now.setDate(now.getDate()-3);
	}else{
		now.setDate(now.getDate()-1);
	}
	return now;
}

function AuthenticatedUserURL(){
	var fStartDate=getCheckDay().Format(format1);
	var endDate=getCheckDay();
	endDate.setDate(endDate.getDate()+1);
	var fEndDate=endDate.Format(format1);
	return "http://cat.ctripcorp.com/cat/r/e?op=history&domain=cat&date="+fStartDate+"&ip=All&reportType=day&type=AuthenticatedUser&startDate="+fStartDate+"&endDate="+fEndDate;
}

function CatLastProblemErrorsURL(){
	var fNow=new Date().Format(format2);
	return "http://cat.ctripcorp.com/cat/r/p?date="+fNow+"&ip=All&step=-1&op=view&domain=cat&ip=All&urlThreshold=1000&sqlThreshold=100&serviceThreshold=50&cacheThreshold=10&callThreshold=50";
}

function StateMissURL(){
	var fStartDate=getCheckDay().Format(format1);
	return "http://cat.ctripcorp.com/cat/r/state?op=history&domain=cat&ip=All&date="+fStartDate+"&reportType=";
}

function StateLastHoutMissURL(){
	var fNow=new Date().Format(format2);
	return "http://cat.ctripcorp.com/cat/r/state?date="+fNow+"&ip=All&step=-1&domain=cat&ip=All&show=true";
}

function Home(){
	return "http://cat.ctripcorp.com/cat/r";
}

function UploadDumpURL(){
	var fNow=new Date().Format(format2);
	return "http://cat.ctripcorp.com/cat/r/t?date="+fNow+"&ip=All&step=-1&ip=All&queryname=&domain=cat&type=System";
}

function crossReportURL(){
	var fStartDate=getCheckDay().Format(format1);
	return "http://cat.ctripcorp.com/cat/r/t?op=history&domain=All&ip=All&date="+fStartDate+"&reportType=";
}

function dbURL(){
  return "http://mysqltools.ops.ctripcorp.com/dbmgmt/dbcapacitymonitor/";
}

function open_win(){
    var links=[{name:'auth',url:AuthenticatedUserURL()},
    {name:'error',url:CatLastProblemErrorsURL()},
    {name:'missday',url:StateMissURL()},
    {name:'misshour',url:StateLastHoutMissURL()},
    {name:'home',url:Home()},
    {name:'dump',url:UploadDumpURL()},
    {name:'crossreport',url:crossReportURL()},
    {name:'db',url:dbURL()}];
    for (var i = links.length - 1; i >= 0; i--) {
    	console.log(links[i].url);
        //var p=window.open(links[i].url,'_blank');
        chrome.runtime.sendMessage({type:links[i].url});
	}
}

document.addEventListener('DOMContentLoaded', function() {
	open_win();
	//document.getElementById("open_check_list").addEventListener("click",open_win);
});



