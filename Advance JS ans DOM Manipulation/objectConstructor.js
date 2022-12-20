function HouseKeeper(yearsOfExperience,name,cleaningRepertoire){
    this.yearsOfExperience=yearsOfExperience;
    this.name=name;
    this.cleaningRepertoire=cleaningRepertoire;
}

var houseKeeper1=new HouseKeeper(12,"Anurag",["bathroom","lobby"]);

houseKeeper1.yearsOfExperience;


// with method
function HouseKeeper(yearsOfExperience,name,cleaningRepertoire){
    this.yearsOfExperience=yearsOfExperience;
    this.name=name;
    this.cleaningRepertoire=cleaningRepertoire;
    this.cleaning=function(){
        alert("Cleaning in progress");
    }
}
