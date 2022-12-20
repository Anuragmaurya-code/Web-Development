var number =Math.floor(Math.random()*6)+1;
var s1="images\\dice"+number+".png";
document.querySelector("img.img1").setAttribute("src",s1);

var number =Math.floor(Math.random()*6)+1;
var s2="images\\dice"+number+".png";
document.querySelector("img.img2").setAttribute("src",s2);

if(s1>s2)
  document.querySelector("h1").textContent="Player 1 Wins 🚩";
else if(s2>s1)
  document.querySelector("h1").textContent="Player 2 Wins 🚩";
else
  document.querySelector("h1").textContent="Its a draw refresh again"
