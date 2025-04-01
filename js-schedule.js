function jump1(){
    location.href = "indexs.html"
}
function jump2(){
    location.href = "send.html"
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
    var text = "<div class="+"\""+"block3"+"\""+ "id="+"\""+"blcok3"+"\""+"><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>日付</p><input type="+"\""+"text" +"\""+"id="+"\""+"t1" +"\""+"value="+"\""+date+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>開始時間</p><input type="+"\""+"text"+"\""+" id="+"\""+"t1" +"\""+"value="+"\""+s_time+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>終了時間</p><input type="+"\""+"text"+"\""+" id="+"\""+"t1" +"\""+"value="+"\""+e_time+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>名称</p><input type="+"\""+"text" +"\""+"id="+"\""+"t1"+"\""+" value="+"\""+theme+"\""+"></div><div class="+"\""+"block4"+"\""+" id="+"\""+"block4"+"\""+"><p>場所</p><input type="+"\""+"text"+"\""+" id="+"\""+"t1"+"\""+" value="+"\""+place+"\""+"></div><div class="+"\""+"bt"+"\""+" id="+"\""+"change"+"\""+"onclick="+"\""+"change("+a+")\""+">更新</div><div class="+"\""+"bt"+"\""+" id="+"\""+"delete"+"\""+"onclick="+"\""+"del("+a+")\""+">削除</div></div>";
    document.getElementById("block2").insertAdjacentHTML('beforeend',text);
}

console.log("Writed");
}

function change(num){
    console.log("change_num:"+num);
}
function del(num){
    console.log("delete_num:"+num);
}
