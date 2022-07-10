var minionBall = document.getElementsByClassName("minion-ball");
document.onmousemove = function (event) {
   var x = event.clientX * 100 / window.innerWidth + "%";
   var y = event.clientY * 70 / window.innerHeight + "%";

   for (var i = 0; i < 2; i++) {
      minionBall[i].style.left = x / 2;
      minionBall[i].style.top = y / 2;
      minionBall[i].style.transform = "translate(" + x + "," + y + ")";
   }
}