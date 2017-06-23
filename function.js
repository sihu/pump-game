$( document ).bind( 'mobileinit', function(){
  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
});

$(() => {
  const pumpEl = $('#pump');
  const pumpUpEl = $('.pump-top');
  const wonEl = $('.won');
  const progressBar = $('.progress-bar');
  let progress = 0;
  let deflateInterval;
  let difficulty = 3;

  restart();
  wonEl.hide();
  pumpEl.bind("tap", inflate);
  $("#restart").click(() => {
    restart();
  });

  $("input[name=difficulty]:radio").change(d => {
    difficulty = parseInt($('input[name=difficulty]:checked').val());
  });

  function restart() {
    pumpUpEl.removeClass('won');
    wonEl.hide();
    pumpEl.bind("tap", inflate);
    deflateInterval = setInterval(() => {
      deflate();
    }, 200);
    progress = 0;
  }

  function inflate(event) {
    progress += difficulty;
    pumpUpEl.clearQueue();
    pumpUpEl.animate({'background-position-y': "25px"}, 10, 'linear', () => {
      pumpUpEl.animate({'background-position-y': "0px"}, 200);
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
    wonEl.show();
    pumpUpEl.addClass('won');
  }

  function setProgess() {
    progressBar.css('width', `${progress}%`);
    progressBar.html(`${progress} %`);
  }
});
