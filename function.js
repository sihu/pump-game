$( document ).bind( 'mobileinit', function(){
  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
});

$(() => {
  let progress = 0;
  let deflateInterval;
  let difficulty = 3;

  restart();
  $('.won').hide();
  $("#pump").bind("tap", inflate);
  $("#restart").click(() => {
    restart();
  });

  $("input[name=difficulty]:radio").change(d => {
    difficulty = parseInt($('input[name=difficulty]:checked').val());
  });

  function restart() {
    $('.won').hide();
    $("#pump").bind("tap", inflate);
    deflateInterval = setInterval(() => {
      deflate();
    }, 200);
    progress = 0;
  }

  function inflate(event) {
    progress += difficulty;
    $('.pump-top').animate({'background-position-y': "25px"}, 10, 'linear', () => {
      $('.pump-top').animate({'background-position-y': "0px"}, 20);
    });
    progress = progress > 100 ? 100 : progress;
    if (progress == 100) {
      won();
    }
    setProgess();
  }

  function deflate() {
    if (progress >= 0) {
      progress -= 3;
      progress = progress < 0 ? 0 : progress;
    }
    setProgess();
  }

  function won() {
    clearInterval(deflateInterval);
    $('.won').show();
  }

  function setProgess() {
    $(".progress-bar").css('width', `${progress}%`);
    $(".progress-bar").html(`${progress} %`);
  }
});
