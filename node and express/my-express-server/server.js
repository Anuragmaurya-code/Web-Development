const express=require("express");

const app = express();

app.get("/",function(req,res){
  res.send("<h1>!hello</h1>");
});
app.get("/contact",function(req,res){
  res.send("contact email:abc@gmail.com");
});
app.get("/about",function(req,res){
  res.send("I am a web developer");
});
app.get("/name",function(req,res){
  res.send("Anurag");
});
app.listen(3000,function(){
  console.log("Server 3000 has been started");
});
