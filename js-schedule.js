function jump1(){
    location.href = "indexs.html"
}
function jump2(){
    location.href = "send.html"
}
function jump3(){
    location.href="program.html";
}
function schedule_get(){ 
    console.log("Load");
var url = 'https://script.google.com/macros/s/AKfycbxoOsQWCOtQPchamjt9hON7x5WFppcw1kjovGNfReLGGBb4ZKfocA1oyltJ9JVxeI69/exec';
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
    shcedule_write(json)
})
.catch(err =>{
    console.log(err);
});
console.log("loaded");
}

var list1 = [];
var list2 = [];
var list3 = [];
var list4 = [];
var list5 = [];
function shcedule_write(json){
    console.log("write");
    document.getElementById("small").style.display = "none";
    var length = json.length;
    var date ="";
    var s_time ="";
    var e_time = "";
    var theme = "";
    var place = "";
    for(var a = 0; a<=length; a++){
        date = json[a].date;
        s_time = json[a].s_time;
        e_time = json[a].e_time;
        theme = json[a].theme;
        place = json[a].place;
        list1.push(s_time);
        list2.push(e_time);
        list3.push(theme);
        list4.push(place);
        list5.push(date);
    var text = "<div class="+"\""+"block3"+"\""+ "id="+"\""+"blcok3"+"\""+"><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>日付</p><input type="+"\""+"text" +"\""+"id="+"\""+"t1"+a+"\""+"value="+"\""+date+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>開始時間</p><input type="+"\""+"text"+"\""+" id="+"\""+"t2"+a+"\""+"value="+"\""+s_time+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>終了時間</p><input type="+"\""+"text"+"\""+" id="+"\""+"t3"+a+"\""+"value="+"\""+e_time+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>名称</p><input type="+"\""+"text" +"\""+"id="+"\""+"t4"+a+"\""+" value="+"\""+theme+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>場所</p><input type="+"\""+"text"+"\""+" id="+"\""+"t5"+a+"\""+" value="+"\""+place+"\""+"></div><div class="+"\""+"bt"+"\""+" id="+"\""+"change"+"\""+"onclick="+"\""+"change("+a+")\""+">更新</div><div class="+"\""+"bt"+"\""+" id="+"\""+"delete"+"\""+"onclick="+"\""+"del("+a+")\""+">削除</div></div>";
    document.getElementById("block2").insertAdjacentHTML('beforeend',text);
}

console.log("Writed");
}

function change(num){
    var count = 0;
    console.log("change_num:"+num);
    var t1 = "t1"+num;
    var t2 = "t2"+num;
    var t3 = "t3"+num;
    var t4 = "t4"+num;
    var t5 = "t5"+num;
    var n_date = document.getElementById(t1).value;
    var n_s_time = document.getElementById(t2).value;
    var n_e_time = document.getElementById(t3).value;
    var n_theme = document.getElementById(t4).value;
    var n_place = document.getElementById(t5).value;

    if(n_date == list5[num]){
      n_date = "#"+n_date;
    }else{
        count++; 
    }
    if(n_s_time == list1[num]){
        n_s_time = "#"+n_s_time;
    }else{
        count++;
    }
    if(n_e_time == list2[num]){
        n_e_time = "#"+n_e_time;
    }else{
        count++;
    }
    if(n_theme == list3[num]){
        n_theme = "#"+n_theme;
    }else{
        count++;
    }
    if(n_place == list4[num]){
        n_place = "#"+n_place;
    }else{
        count++;
    }
if(count > 0){
    var data = [{
        "branch":"change",
        "date":n_date,
        "s_time":n_s_time,
        "e_time":n_e_time,
        "theme":n_theme,
        "place":n_place
    }];
    data = JSON.stringify(data);
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":data
    }
    console.log(data);
    try{
    fetch('http://192.168.3.30:1337',params);
    console.log("Change_Send");
    location.href = "schedule.html"
    }
    catch(err){
        console.log(err);
        
    }
}else{
    alert("変更がありません");
}
count = 0;
}
function del(num){
    console.log("delete_num:"+num);
    var t1 = "t1"+num;
    var t2 = "t2"+num;
    var t3 = "t3"+num;
    var t4 = "t4"+num;
    var t5 = "t5"+num;
    var n_date = document.getElementById(t1).value;
    var n_s_time = document.getElementById(t2).value;
    var n_e_time = document.getElementById(t3).value;
    var n_theme = document.getElementById(t4).value;
    var n_place = document.getElementById(t5).value;
    //書き換えた後の削除の処理するとえらーになる
    var data = [{
        "branch":"delete",
        "date":n_date,
        "s_time":n_s_time,
        "e_time":n_e_time,
        "theme":n_theme,
        "place":n_place
    }];
    data = JSON.stringify(data);
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":data
    }
    console.log(data);
    try{
    fetch('http://192.168.3.30:1337',params);
    console.log("Change_Send");
    location.href = "schedule.html"
    }
    catch(err){
        console.log(err);
        
    }

}
