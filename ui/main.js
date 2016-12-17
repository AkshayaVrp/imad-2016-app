//console.log('Loaded!');
var button=document.getElementById('counter');

button.onclick=function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
    if(request.readyState === XMLHttpRequest.DONE){
        
        if(request.status === 200){
            var counter=request.responseText;
           var span=document.getElementById('count');
          span.innerHTML=counter.toString();
            
        }
    }
    
    };
  //  var username=document.getElementById('username');
    //var password=document.getElementById('password');
    //request.open('POST','http://akshayavrp.imad.hasura-app.io/login',true); 
    request.open('GET','http://akshayavrp.imad.hasura-app.io/counter',true);
    request.send(null);
    
};