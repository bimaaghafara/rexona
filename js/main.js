//document ready
  $(document).ready(function(){
  	checkCookie();
  	updateTotalScore();
    tutorial();
  })


//tutorial
  function tutorial(){
    $('.skip').on('click', function(){
      TweenMax.set(".overlay", {width:0});
      TweenMax.set(".tutorial", {autoAlpha:0});
      masterTL();
    });
    var i=1;
    $('.next').on('click', function(){
      TweenMax.set(".step"+i, {autoAlpha:0});
      i+=1;
      TweenMax.set(".step"+i, {autoAlpha:1});
      if (i==2){
        TweenMax.set(".score > .left", {zIndex:11});
      }else if (i==3){
        TweenMax.set(".score > .left", {zIndex:2});
        TweenMax.set(".score > .right", {zIndex:11});
      }else if (i==4){
        TweenMax.set(".score > .right", {zIndex:2});
        TweenMax.set(".progress", {zIndex:11});
      }else {
        TweenMax.set(".progress", {zIndex:2});
        TweenMax.set(".overlay", {width:0});
        TweenMax.set(".tutorial", {autoAlpha:0});
        masterTL(); 
      }
    });
  }

//masterTL
  function masterTL(){
    var masterTL = new TimelineMax({});
    masterTL
      .add( bgFront(), bubbles(),timer() )  
    ;
    return masterTL;
  }

//Global Var
  var maxAnimationTime = 30; //total duration

  function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }


//bgFront
  function bgFront(){
    var bgTL = new TimelineMax({repeat:-1,});
    bgTL
      .to("#bgFront", 2, {
          backgroundPosition:'-1280px 0px',
          ease:Linear.easeNone})
    ;
    //stop after maxAnimationTime
    TweenMax.delayedCall(maxAnimationTime, stopAnimation);
    function stopAnimation(){bgTL.pause();}
  }

//bubbles
  var bubblesTL = new TimelineMax({});
  function bubbles(){
    TweenMax.set(".bubbles", {y:120, left:'45%', autoAlpha:0});
    var currentDuration = 1;
    var i = randomInt(1,3);
    var left = i*25;
    bubblesTL
      .set(".bubble-"+i, {autoAlpha:1})
      .to(".bubble-"+i, currentDuration, {
        y:'-=50', left:'-='+left, onComplete:bubbles})
    ;
    //stop after maxAnimationTime
    TweenMax.delayedCall(maxAnimationTime, stopAnimation);
    function stopAnimation(){
      bubblesTL.pause();
      TweenMax.set(".bubbles", {y:50, autoAlpha:0});
    }
  }

//Score
  var score=0;
  $('.bubbles').on('click', function(){
      $('#score').text(score+=1);
      bubbles();
      //add poin
    });

//timer
  function timer(){
    //progressBar
      var timerTL = new TimelineMax({onUpdate:progressText,});
      timerTL
        .to("#progressBar", maxAnimationTime, {width:'0%', ease:Linear.easeNone})
      ;

    //progressText
      var timer = maxAnimationTime;
      $('#progressText').text(maxAnimationTime);
      setInterval(function() {  
        if(timer != 0){
           if(timer >10){$('#progressText').text(--timer);}
           else{$('#progressText').text('0'+--timer);} 
        }else {
          clearInterval(timer);
        }
      }, 1000);

    // //progressBar
    //   var timerTL = new TimelineMax();
    //   $('#progressBar').attr('value',maxAnimationTime);
    //   $('#progressBar').attr('max',maxAnimationTime);
    //   var progressBar = document.getElementById('progressBar');
    //   var progValue = parseInt(progressBar.value);
    //   timerTL
    //     .to(progressBar, progValue, {value:0,	ease:Linear.easeNone})
    //   ;

  }
  
  function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	//alert(document.cookie);
	}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
	if(!getCookie("totalScore")){
		setCookie("totalScore",0,1);	
		// alert("total score: "+ getCookie("totalScore"));
	}
	var totalScore = parseInt(getCookie("totalScore"));
	var prevScore = 0;
	var timer = maxAnimationTime;
    setInterval(function() {  
      if(timer != 0){
		if(score == prevScore){
		
		} else {
			prevScore = score;
			totalScore += score;
			setCookie("totalScore",totalScore,1);
		}
	  }else {
        clearInterval(timer);
      }
    }, 10000);
}

function updateTotalScore(){
	$('#totalScore').text(getCookie("totalScore"));
}