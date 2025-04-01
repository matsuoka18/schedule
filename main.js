/*
mysqlででデータベース作成
node.jsでpost,getできるように
Lineに紐付け
*/
var express = require('express');
var mysql = require('mysql');
var http = require('http');
var content = '';
var n_status = "stop";
var error_text = 'Error';
var app = express();

var server = mysql.createConnection({
    host:'127.0.0.1',
    user:'kazuya',
    password:'Michael-Matsuo1834',
    database:'schedule'
})

server.connect((err)=>{
    if(err){
        console.log(err);
        console.log("Program Stop");
        error_text = "Server connection failure";
        return;
    }
    n_status = "run";
    console.log("server connected!!")
});

http.createServer((req,res)=>{
    if(req.method == "POST"){
        console.log("POST");
req.on('data',function(data){
content = data;
console.log(content);
}).on('end',function(){
    content = JSON.parse(content);
    var branch = content[0].branch;
    console.log(branch);
    if(branch == "write"){
       var s_time = content[0].s_time;
       var e_time = content[0].e_time;
       var theme = content[0].theme;
       var place = content[0].place;
       var date = content[0].date;
         if(place.length <= 0 ){
             place = "なし";
         }
           var write_data = 'insert schedule_detail(s_time,e_time,theme,place,date) values ('+"\""+s_time+"\",\""+e_time+"\",\""+theme+"\",\""+place+"\",\""+date+"\");"
           //シフトの情報はそのまま追加できるようにデータベースをつくる。つ
           server.query(write_data);
           console.log("Writed");
           
     }else if(branch == "change"){
        //日付だけか日付と時間の両方で,何を変更するか
        //var change_data1 = 'update work_schedule_detail set ';
     console.log(content[0]);
      console.log("change");
     }else if(branch == "delete"){
     console.log("delete")
     }else{
         console.log("Branch Error");
         error_text = 'parameter error';
     }
     res.end();
})
    }else if(req.method == "GET"){
console.log("GET");
        var text_data = 'select * from schedule_detail';
//var json_data = "Success";
server.query(text_data,(err,res2)=>{
    if(err){
        console.log(err);
        console.log("Program Stop");
        error_text='Data acquisition failure';
    }
    var json_data = JSON.stringify(res2); 


    res.write(json_data);
    res.end();
});

    }else{
        console.log("Error of method");
        error_text = "Parameter error 2";
        res.write(error_text);
        res.end();
        //回数でストップかけるのもあり 3/23
    }
}).listen(1337,'192.168.3.30');


//一番近い予定を見つけてつうｓちするゆにする