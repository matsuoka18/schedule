var shcedule = '';
function jump1(){
    location.href = "send.html";
}

function jump2(){
    location.href="schedule.html";
}
function start(){

    start2();
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
url = "https://script.google.com/macros/s/AKfycbyDVhDM3jguwxl-nuUjiUY-lSj_s7fe4BfusIcK1TSGnvp2BhYMRpaengK5SO_E4vM/exec";
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