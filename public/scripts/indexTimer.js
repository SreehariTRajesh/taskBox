var list=Array.from(my_tasks);
console.log(list);
function countDownTimer(countDownDate,i) {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  if(seconds<10)
        seconds="0"+seconds;
  if(minutes<10)
        minutes="0"+minutes;
  if(hours<10)
        hours="0"+hours;
  if(days<10)
        days="0"+days;
  document.getElementById(`timer${i}`).innerHTML = days + " days:" + hours + " hours:"
  + minutes + " minutes:" + seconds + " seconds ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById(`timer${i}`).innerHTML = "EXPIRED";
  }
}
setInterval(function(){
    for(var i=0;i<list.length;++i){
        countDown=new Date(list[i].deadline);
        countDownTimer(countDown,i);
    }
},1000);