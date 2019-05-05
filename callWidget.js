//ECMA6 standard class in javascript
class CallWidget{
   constructor(settings){
    this.settings=settings;//get setting parameters
    this.renderCSS();//render css in the html document
    this.renderUI(settings.position);//render html pop for the design
    this.displayCallnow();//iniitalize popup
    
   }
   //use to render css for the pop up
   renderCSS(){
    var style=document.createElement('style');
    style.innerHTML="body{font-family:Arial,Helvetica,sans-serif}*{box-sizing:border-box}.open-button{background-color:#4caf50;color:#fff;padding:16px 20px;border:none;cursor:pointer;opacity:.8;position:fixed;z-index:999;width:280px;border-radius:15px 15px 15px 15px}.chat-popup{display:none;position:fixed;z-index:1000}.topleft{top:23px;left:28px}.topright{top:23px;right:28px}.bottomleft{bottom:23px;left:28px}.bottomright{bottom:23px;right:28px}.form-container{padding:10px;background-color:#2e2d88;color:#fff;width:300px;border-radius:15px 15px 15px 15px}.form-container textarea{width:100%;padding:15px;margin:5px 0 22px 0;border:none;background:#f1f1f1;resize:none;min-height:200px;border-radius:15px 15px 15px 15px}.form-container input{width:100%;padding:15px;margin:5px 0 22px 0;border:none;background:#f1f1f1;resize:none;min-height:50px;border-radius:15px 15px 15px 15px}.form-container select{width:100%;padding:15px;margin:5px 0 22px 0;border:none;background:#f1f1f1;resize:none;min-height:50px;border-radius:15px 15px 15px 15px}.form-container textarea:focus{background-color:#ddd;outline:0}.form-container .btn{background-color:#4caf50;color:#fff;padding:16px 20px;border:none;cursor:pointer;width:100px;margin-bottom:10px;margin-left:100px;opacity:.8;border-radius:15px 15px 15px 15px}.form-container .cancel{background-color:red}.form-container .btn:hover,.open-button:hover{opacity:1}.loader{border:6px solid #f3f3f3;border-top:6px solid #4caf50;border-radius:50%;width:40px;height:40px;animation:spin 2s linear infinite;margin-left:130px;margin-bottom:10px}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}";
    document.head.appendChild(style);
   }
   //use to render HTML pop in the page
   renderUI(position){
     var widget='<button class="open-button '+position+'" id="mainb" onclick="openPopup()"><span><img height="25" style="margin-right:7px" src="calllogo.png"/></span>Click here to get a call-back</button>'
  +'<div class="chat-popup '+position+'" id="widget">'
  +'<div id="callarea" class="form-container">'
    +'<h4 style="text-align: center;">DO YOU WANT A CALLBACK?</h4>'
   +' <p> Please give us you details and we will get back to you</p>'
   +' <input type="text" id="name" placeholder="Your Name" required />'
   +' <input type="number" id="number" placeholder="Number (e.g USA 18884521505)" required />'
   +' <input type="email" id="email" placeholder="Email" required />'
    +'<select>'
    +' <option>i am interested in Content</option></select>'
  +' <div class="loader" id="load" style="display: none"></div>'
  +' <p  id="error" style="display: none;text-align: center"></p>'
   +' <button type="submit" class="btn" onclick="callNow()">Call Now</button>'
  +'</div>'
 +' <div id="responsearea" class="form-container" style="height: 200px;display: none">'
   +' <h4 style="text-align: center;margin-top: 80px" >You will receive a call soon</h4>'
   +' <p> </p>'
  +'</div>'
 +' <div id="cancelarea" class="form-container">'
    +'<button type="button" class="btn cancel" onclick="closePopup()">Close</button>'
 +' </div>'
  
+'</div>';
 document.body.innerHTML+=widget;
   }
  //use to make get call to a web site
   getCall(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      var res=JSON.parse(xhr.responseText);
      callback(res);
    };
    xhr.send();
   }
   //use to validate name of the user
   validateName(name){
    if(name.length!=0){
      return true;
     }else{
      return false;
    }
   }
   //use to validate if phone number is valid
   validateNumber(number,callback){
     this.getCall("http://apilayer.net/api/validate?access_key=66f6356ff4ff0daf54e503c47ea49a36&number="+number,function(res){
      callback(res);
     });
   
    
   }
   //use to validate if email address is valid
   validatEmailAddress(email){
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   }
   //use to display response message
   displayResponse(){
     document.getElementById("responsearea").style.display = "block";
    document.getElementById("callarea").style.display = "none";
   }
   //use to display call now
   displayCallnow(){
       document.getElementById("responsearea").style.display = "none";
        document.getElementById("load").style.display = "none";
        document.getElementById("error").style.display = "none";
       document.getElementById("callarea").style.display = "block";
       document.getElementById("number").style.border = "0px ";
       document.getElementById("email").style.border = "0px ";
       document.getElementById("name").style.border = "0px ";
   }
}
var widget=null;//declare widget variable
//use to popup
function openPopup() {
  var element=document.getElementById("widget");
   element.style.display = "block";
  widget.displayCallnow();
}
//close popup
function closePopup() {
  document.getElementById("widget").style.display = "none";
}
//invote call now button 
function callNow(){
  var name=document.getElementById('name').value;
  var email=document.getElementById('email').value;
  var number=document.getElementById('number').value;
  document.getElementById("load").style.display = "block";
  var message,error;
  if(widget.validateName(name)){
    error=false;
  }else{
     error=true;
     document.getElementById("name").style.border = "1px solid red";
     message="Specify your name";

  }
  
   if(widget.validatEmailAddress(email)){
     error=false;
   }else{
      error=true;  
     document.getElementById("email").style.border = "1px solid red";
     message="Wrong Email Address";
  }
  widget.validateNumber(number,function(res){
      if(res.valid){
         error=false;
       }else{
         error=true;  
         document.getElementById("number").style.border = "1px solid red";
          message="invalid number provided";
       }
      
      if(error){
        document.getElementById("error").innerHTML=message;
        document.getElementById("error").style.display = "block";
        document.getElementById("load").style.display = "none";
      }else{
        document.getElementById("load").style.display = "none";
        widget.displayResponse();
     }

  });
     
   
  
  
 // 
}
//use to initailize widget, this is the function that is needed to be call by the user
function myCallWidget(data){
  widget=new CallWidget(data);
}