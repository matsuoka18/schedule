document.getElementById("div").innerHTML = "START";
var data = [{
    'branch':'write',
    's_time':'9:00',
    'e_time':'13:00',
    'theme':'r',
    'place':'w',
    "date":"12"
}]

var params = {
    "method":"post",
    "mode":"cors",
    "Content-Type":"application/json",
    "body":JSON.stringify(data)
}
fetch('http://192.168.3.30:1337',params);
document.getElementById("div").innerHTML = JSON.stringify(data);