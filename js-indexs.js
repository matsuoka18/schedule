function start(){
    var url = 'http://192.168.3.30:1337';
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
    })
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
    fetch('http://192.168.3.30:1337',params);
    console.log(JSON.stringify(data));
}