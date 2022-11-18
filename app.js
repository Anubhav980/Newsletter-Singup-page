//jshint esversion:6

const express = require("express");
const body = require("body-parser");
const request = require("request");
const https = require("https");

const token = sec.token;
const api = sec.api;

const app = express();
app.use(body.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res) {
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstj = req.body.fname;
  const lastj = req.body.lname;
  const em = req.body.email;

  const data = {
    members:[
      {
        email_address: em,
        status:"subscribed",
        merge_fields:{
          FNAME: firstj,
          LNAME: lastj
        }
      }
    ]
  };
  const jsonstringy = JSON.stringify(data);
  const url = "https://us11.api.mailchimp.com/3.0/lists/"+token;
  const options = {
    method: "post",
    auth: api
  };

const request = https.request(url,options,function(response){

  console.log(res.statusCode);
  if (response.statusCode === 200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }


});
request.write(jsonstringy);
request.end();

});

app.post("/failure",function(req,res) {
   res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


//api : f1f7093ef6d2ac599b8ce65c968a940f-us11
//audience id : 25b1c6c250
