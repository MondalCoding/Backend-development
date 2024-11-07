//const p = document.querySelector('#prg');
const prm = new URLSearchParams(window.location.search);
console.log("Form Data: ",prm);
var fname=prm.get("fname");
var lname=prm.get("lname");
var fathername=prm.get("fathername");
var gender=prm.get("gender");
var dob=prm.get("dob");
var phone=prm.get("phone");
var email=prm.get("email");
var address=prm.get("address");
var city=prm.get("city");
var state=prm.get("state");
var country=prm.get("country");
var pin=prm.get("pin");

var getData="First name: "+fname+"<br>";
getData+="Last name: "+lname+"<br>";
getData+="Father name: "+fathername+"<br>";
getData+="Gender: "+gender+"<br>";
getData+="DOB: "+dob+"<br>";
getData+="Phone: "+phone+"<br>";
getData+="Email Id: "+email+"<br>";
getData+="Address: "+address+"<br>";
getData+="City: "+city+"<br>";
getData+="State: "+state+"<br>";
getData+="Country: "+country+"<br>";
getData+="Pin code: "+pin+"<br>";

document.getElementById("prg").innerHTML=getData;
/*prm.forEach((val, key)=>{
    p.append(`${key} = ${val}`);
    p.append(document.createElement('br'));
});*/