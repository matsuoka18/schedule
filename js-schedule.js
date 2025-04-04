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
var url = '//script.google.com/macros/s/AKfycbxoOsQWCOtQPchamjt9hON7x5WFppcw1kjovGNfReLGGBb4ZKfocA1oyltJ9JVxeI69/exec';
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
    console.log("ERROR");
    document.getElementById("small").innerHTML = "サーバー停止中";

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
    for(var a = 0; a<length; a++){
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
    var text = "<div class="+"\""+"block3"+"\""+ "id="+"\""+"blcok3"+"\""+"><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>日付</p><input type="+"\""+"number" +"\""+"id="+"\""+"t1"+a+"\""+"value="+"\""+date+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>開始時間</p><input type="+"\""+"time"+"\""+" id="+"\""+"t2"+a+"\""+"value="+"\""+s_time+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>終了時間</p><input type="+"\""+"time"+"\""+" id="+"\""+"t3"+a+"\""+"value="+"\""+e_time+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>名称</p><input type="+"\""+"text" +"\""+"id="+"\""+"t4"+a+"\""+" value="+"\""+theme+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>場所</p><input type="+"\""+"text"+"\""+" id="+"\""+"t5"+a+"\""+" value="+"\""+place+"\""+"></div><div class="+"\""+"bt"+"\""+" id="+"\""+"change"+a+"\""+"onclick="+"\""+"change("+a+")\""+">更新</div><div class="+"\""+"bt"+"\""+" id="+"\""+"delete"+a+"\""+"onclick="+"\""+"del("+a+")\""+">削除</div></div>";
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
    var t6 = "change"+num;
    var n_date = document.getElementById(t1).value;
    var n_s_time = document.getElementById(t2).value;
    var n_e_time = document.getElementById(t3).value;
    var n_theme = document.getElementById(t4).value;
    var n_place = document.getElementById(t5).value;
    document.getElementById(t6).innerHTML = "更新中";

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
    fetch('//60.134.235.1:1337',params);
    //fetch('http://192.168.3.30:1337',params);
    console.log("Change_Send");
    change_check(data);
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
    var t6 = "delete"+num;
    var n_date = document.getElementById(t1).value;
    var n_s_time = document.getElementById(t2).value;
    var n_e_time = document.getElementById(t3).value;
    var n_theme = document.getElementById(t4).value;
    var n_place = document.getElementById(t5).value;
    document.getElementById(t6).innerHTML = "削除中";
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
    fetch('//60.134.235.1:1337',params);
    //fetch('http://192.168.3.30:1337',params);
    change_check(data);
    console.log("Delete_Send");
    //location.href = "schedule.html"
    }
    catch(err){
        console.log(err);
        
    }

}

function change_check(data){
    var url = '//script.google.com/macros/s/AKfycbxoOsQWCOtQPchamjt9hON7x5WFppcw1kjovGNfReLGGBb4ZKfocA1oyltJ9JVxeI69/exec';
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
        var last = json.length;
        var count = 0;
        for(var a=0; a<last; a++){
if(data[a].s_time == json[a].s_time && data[a].e_time == json[a].e_time && data[a].theme == json[a].theme && data[a].place == json[a].place && data[a].date == json[a].date){
count++;
}

        }
        if(count > 0){
            alert("処理失敗");
        }else{
            //alert("完了しました");
            location.href = "schedule.html";
        }
    })
    .catch(err =>{
        console.log(err);
        console.log("ERROR");
        alert("エラーが発生しました");
    
    });
}
