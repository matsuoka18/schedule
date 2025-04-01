function jump1(){
    location.href = "indexs.html"
}
function jump2(){
    location.href = "schedule.html"
}
var s_time = '';
var e_time = '';
var theme = '';
var place = '';
var date = '';
function short(num){
    if(num == 1){
     s_time = "09:00";
     e_time = "13:00";
     theme = "東進";
     place = "藤沢駅南口校";
    }else if(num == 2){
        s_time = "14:00";
        e_time = "18:00";
        theme = "東進";
        place = "藤沢駅南口校";
    }else if(num == 3){
        s_time = "18:00";
        e_time = "22:00";
        theme = "東進";
        place = "藤沢駅南口校";
    }
    document.getElementById("s_time").value = s_time;
    document.getElementById("e_time").value = e_time;
    document.getElementById("theme").value = theme;
    document.getElementById("place").value = place;
}

function send(){
    console.log("send");
    document.getElementById("send").innerHTML = "送信中";
    s_time = document.getElementById("s_time").value;
    e_time = document.getElementById("e_time").value;
    theme = document.getElementById("theme").value;
    place = document.getElementById("place").value;
    date = document.getElementById("date").value;
    if(s_time.length <= 0 || e_time.length <= 0 ||theme.length <= 0 ||place.length <= 0 ||date.length <= 0){
        alert("空欄があります");
        console.log("Cancel")
        document.getElementById("send").innerHTML = "送信";
        return;
    }
    var data = [{
        "branch":"write",
        "s_time":s_time,
        "e_time":e_time,
        "theme":theme,
        "place":place,
        "date":date
    }];
    data = JSON.stringify(data);
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":data
    }
    try{
    fetch("http://192.168.3.30:1337",params);
    console.log("Sended")
    document.getElementById("s_time").value = "";
    document.getElementById("e_time").value ="";
    document.getElementById("theme").value="";
    document.getElementById("place").value="";
    document.getElementById("date").value="";
    document.getElementById("send").innerHTML = "完了";
    setTimeout(function(){
        document.getElementById("send").innerHTML = "送信";
    },5000)
     }
     catch(err){
        console.log(err);
        document.getElementById("send").innerHTML = "エラー";
        setTimeout(function(){
            document.getElementById("send").innerHTML = "送信";
        },5000)
     }
}