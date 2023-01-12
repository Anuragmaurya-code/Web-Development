const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const con=mongoose.connect('mongodb://127.0.0.1:27017/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);



const FruitSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    required:true,
    min:1,
    max:10
  },
  review:String
});

const peopleSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  fruit:FruitSchema
});

const Fruit=mongoose.model("fruit",FruitSchema);

const People=mongoose.model("people",peopleSchema);
// const per1=new People({
//   name:'Anurag',
//   age:49
// });
// const per2=new People({
//   name:'Rohan',
//   age:50
// })
// const mango=new Fruit({
//   name:'Mango',
//   rating:7
// })
// mango.save();

// const Raj=new People({
//   name:'Raj',
//   age:30,
//   fruit:mango
// });
// Raj.save();
// People.insertMany([per1,per2],function(e){
//   if(e)
//   console.log(e);
// })


// const apple=new Fruit({
//   name:'apple',
//   rating:6,
//   review:'Good'
// })

// apple.save();
Fruit.find({name:'apple'},function(err,docs){
  People.updateOne({name:'Anurag'},{fruit:docs},function(e){
    if(e)
    console.log(e);
  });
});


setTimeout(function(){mongoose.connection.close()},1000);