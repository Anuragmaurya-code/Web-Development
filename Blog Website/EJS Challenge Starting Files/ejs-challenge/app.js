//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/blog',{useNewUrlParser: true,useUnifiedTopology: true});


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

const postDataSchema=new mongoose.Schema({
  title:String,
  data:String
});
const Post=mongoose.model('postData',postDataSchema);

const postArraySchema = new mongoose.Schema({
  name:String,
  content :[postDataSchema]
});

const PostArray = mongoose.model('postArray',postArraySchema);
PostArray.find({},function(err,docs){
  if(!err)
  {
    if(docs.length===0)
    {
      l=new PostArray({name:'posts'}),
      l.save()
    }
  }
});
app.get("/", function(req, res) {  
    PostArray.findOne({name:'posts'},function(err,docs){
      console.log(docs);
      if(!err)
      {
        res.render("home", {
          pageHeading: "Home",
          pageContent: homeStartingContent,
          postArray:docs.content});
      }
    });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    pageHeading: "Contact",
    pageContent: contactContent
  });
});

app.get("/posts/:postname",function(req,res){
  const urlTitle=_.lowerCase(req.params.postname);
  const random_array=[];
  PostArray.findOne({name:'posts'},function(err,docs){
    if(!err)
    {
      const arrayData=docs.content;
      arrayData.forEach(post =>{
        const postTitle=_.lowerCase(post.title);
        random_array.push(postTitle);
        if(postTitle===urlTitle)
        {
        res.render("post",{
        postHeading:post.title,
        postContent:post.data
        });
      }
      });
  }
  });
});
  


app.get("/about", function(req, res) {
  res.render("about", {
    pageHeading: "About",
    pageContent: aboutContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const newtitle=req.body.title;
  const newdata =req.body.post;
  const newpost=Post({
    title: newtitle,
    data: newdata
  });
  console.log(newpost);
  PostArray.findOneAndUpdate({name:'posts'},{$push:{content:newpost}},function(err,suc){
    if(err)
    console.log(err);
    else    
    console.log(suc);
  });
  res.redirect("/")
});
app.listen(3000, function() {
  console.log("Server is running");
});
