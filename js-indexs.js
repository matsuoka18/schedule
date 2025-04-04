var shcedule = '';
function jump1(){
    location.href = "send.html";
}

function jump2(){
    location.href="schedule.html";
}
function jump3(){
    location.href = "program.html"
}
function start(){
    var url = '//script.google.com/macros/s/AKfycbxoOsQWCOtQPchamjt9hON7x5WFppcw1kjovGNfReLGGBb4ZKfocA1oyltJ9JVxeI69/exec';
    //var url = "http://60.134.235.1";
    fetch(url,{
        'method':"GET",
        'mode':"cors"
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }
    })
    .then(json =>{
        
        console.log(json)
        schedule_check(json);
    })
.catch(err =>{
    console.log(err);
    console.log("ERROR");
    
    document.getElementById("i1").innerHTML = "読込み失敗";
    document.getElementById("i2").innerHTML = "読込み失敗";
    document.getElementById("i3").innerHTML = "読込み失敗";
    document.getElementById("i4").innerHTML = "読込み失敗";
    document.getElementById("i5").innerHTML = "読込み失敗";
})
    start2();
}

var num_past = [];
function schedule_check(json){

    var length = json.length;
    var num = [];
    
    var time = new Date();
    time = time.getDate();
    
    for(var a=0; a<length; a++){
        
      if(parseInt(json[a].date) == time){
        num.push(a);
      }else if(parseInt(json[a].date) < time){
        num_past.push(a);
      }
    }
//今日の予定の処理
    if(num.length == 1){
        document.getElementById("i1").innerHTML = json[num[0]].s_time;
        document.getElementById("i2").innerHTML = json[num[0]].e_time;
        document.getElementById("i3").innerHTML = json[num[0]].theme;
        document.getElementById("i4").innerHTML = json[num[0]].place;
        document.getElementById("i5").innerHTML = "1件のみ";
    }else if(num.length > 1){
        var count = 0;
       setInterval(function(){
            
            

            if(count >= parseInt(num.length)){
                count = 0;
            }else{
                document.getElementById("i1").innerHTML = json[num[count]].s_time;
                document.getElementById("i2").innerHTML = json[num[count]].e_time;
                document.getElementById("i3").innerHTML = json[num[count]].theme;
                document.getElementById("i4").innerHTML = json[num[count]].place;
                document.getElementById("i5").innerHTML = count+1+" / "+num.length;
                count++;
            }
            
        },2000)
    }else if(num.length == 0){
    document.getElementById("i1").innerHTML = "予定なし";
    document.getElementById("i2").innerHTML = "予定なし";
    document.getElementById("i3").innerHTML = "予定なし";
    document.getElementById("i4").innerHTML = "予定なし";
    document.getElementById("i5").innerHTML = "予定なし";
    }

//予定削除の処理
if(num_past.length > 0){
    schedule_delete(json);
}

}
function schedule_delete(json){
    console.log("schedule_delete")
    for(var a of num_past){
var data = [{
    "branch":"delete",
    "s_time":json[a].s_time,
    "e_time":json[a].e_time,
    "theme":json[a].theme,
    "place":json[a].place,
    "date":json[a].date
}];
var params = {
    "method":"post",
    "mode":"no-cors",
    "Content-Type":"application/json",
    "body":JSON.stringify(data)
}
fetch('http://60.134.235.1:1337',params);
//fetch('http://192.168.3.30:1337',params);
console.log("delete");
    }
}
function fin(){
    var s_time1 = document.getElementById("date").value;
    var s_time12 = document.getElementById("time").value;
    //var s_time2 = document.getElementById("date2").value;
    var s_time22 = document.getElementById("time2").value;
    var name = document.getElementById("name").value;
    var place = document.getElementById("place").value;
    var d1 = s_time1.lastIndexOf("-",s_time1.length);
    
    var date = s_time1.substring(d1+1,);
    
    
    var data = [{
        "branch":"write",
        "s_time":s_time12,
        "e_time":s_time22,
        "theme":name,
        "place":place,
        "date":date
    }];
    var params = {
        "method":"POST",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(data)
    }
    fetch('http://60.134.235.1:1337',params);
    console.log(JSON.stringify(data));
}
function show(){

}

//today's activityのやつ
url = "//script.google.com/macros/s/AKfycbyDVhDM3jguwxl-nuUjiUY-lSj_s7fe4BfusIcK1TSGnvp2BhYMRpaengK5SO_E4vM/exec";
function start2(){
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    document.getElementById("time_c").innerHTML = hour+":"+minute;
    t5 = document.getElementById("t5");
    fetch(url,{
        "method":"GET",
        "mode":"cors"
    })
    .then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    .then(resJson =>{
        length = resJson.length;
        for(var a = 0; a<length; a++){
            text = resJson[a];
            data = "<p class="+"\""+"t55"+"\""+">"+text+"</p>";
            t5.insertAdjacentHTML("beforeend",data);
        }
    })
}