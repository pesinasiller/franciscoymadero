var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
  playerDefaults = {
    autoplay: 0,
    autohide: 1,
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 0,
    disablekb: 1,
    enablejsapi: 0,
    iv_load_policy: 3
  };
var vid = [{
    'videoId': 'NILbBiDIMw4',
    'startSeconds': 0,
    'endSeconds': 348,
    'suggestedQuality': 'hd1080'
  }],
  currVid = 0;



function onYouTubePlayerAPIReady() {
  tv = new YT.Player('tv', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: playerDefaults
  });
}

function onPlayerReady() {
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1) {
    $('#tv').addClass('active');
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  }
  else if (e.data === 2) {
    $('#tv').removeClass('active');
    if (currVid === vid.length - 1) {
      currVid = 0;
    }
    else {
      currVid++;
    }
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
  }
}

function vidRescale() {


  var w = $(window).width() + 200,
    h = $(window).height() + 200;

  if (w / h > 16 / 9) {
    tv.setSize(w, w / 16 * 9);
    $('.tv .screen').css({
      'left': '0px'
    });
  }
  else {
    tv.setSize(h / 9 * 16, h);
    $('.tv .screen').css({
      'left': -($('.tv .screen').outerWidth() - w) / 2
    });
  }
}

function resize() {
  /*$('.tamano_pantalla').css({
    "width": $(window).width(),
    "height": $(window).height()
  });
  resizeCanvas($(window).width(), $(window).height());
*/

 $('.tamano_pantalla').animate({
        'width': $(window).width(),
        "height": $(window).height()
    }, 0, function() {
       setTimeout(function() {
        resizeCanvas($(window).width(), $('#canv-cont').height());
      }, 150);
        
    });

  
}





$(window).bind('load resize', function() {
  vidRescale();
 
  resize();
  


});




$(document).ready(function() {


  $('#muter').hide();
  $('#video_overlay').mousemove(function() {
    $('#muter').show().delay(5000).fadeOut(200);
  });


  $('#muter').on('click', function() {
    $('#tv').toggleClass('mute');



    if ($('#tv').hasClass('mute')) {
      $(this).html("🔊");
      tv.mute();
    }
    else {
      $(this).html("🔇");

      tv.unMute();
    }
  });
 
   //$("#loader").delay(1000).fadeOut(2000);
});