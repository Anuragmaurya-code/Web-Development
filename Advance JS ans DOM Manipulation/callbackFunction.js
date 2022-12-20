// explain concept of call back function
function anotherEventListener(typeOfEvent,callback){
    var event1={
        eventType:"keypress",
        key:"p"
    }
    if(typeOfEvent===event1.eventType)
        callback(event1);
}

anotherEventListener("keypress",function(e) {//here e is the event1 variable in anotherEventListener
    console.log(e);
});
