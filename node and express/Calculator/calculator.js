const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));//use to handle middleware

app.get("/",function(req,res){
  res.sendfile(__dirname+"/index.html");
});

app.get("/bmicalculator",function(req,res){
  res.sendfile(__dirname+"/bmiCalculator.html");
});

app.post("/bmicalculator",function(req,res){
  var w=parseFloat(req.body.weight);
  var h=parseFloat(req.body.height);
  var result=w/(h*h);
  res.send("The answer is "+result);
});

app.post("/",function(req,res){
  var n1=Number(req.body.num1);
  var n2=Number(req.body.num2);
  var result=n1+n2;
  res.send("The answer is "+result);
});
app.listen(3000,function(){
  console.log("Server started on port 3000");
});
