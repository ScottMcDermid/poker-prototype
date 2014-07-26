$(function() {

  var stack = 9000;
  var min = 4500;

  var initSliders = function() {
    var $sliders = $('.slider');
    $sliders.each(function() {
      var $slider = $(this);
      var $progress = $slider.find('.progress');

      var sliderTop = $slider.position().top;
      var sliderHeight = $slider.height();
      var sliderBottom = sliderTop + sliderHeight;
      var active = false;

      $(window).resize(function() {
        sliderTop = $slider.position().top;
        sliderHeight = $slider.height();
        sliderBottom = sliderTop + sliderHeight;
      });

      $slider.mousedown(function() {
        active = true;
        $('.mask').show();
      });

      $(document).mousemove(function(e) {
        if (!active) return false;

        var y = e.clientY;
        var relativeToSlider = sliderBottom - y;
        if (sliderHeight === 0) {
          var progress = 0;
        } else {
          var progress = relativeToSlider/sliderHeight;
        }
        if (progress > 1) {
          progress = 1;
        } else if (progress < 0) {
          progress = 0;
        }

        var chips = Math.round(progress * (stack - min) + min);

        $progress.css('margin-top', (1-progress)*sliderHeight + 'px');

        if (progress === 1) {
          $('.raise-allin').text('ALL IN ('+ chips +')');
        } else if (progress === 0) {
          $('.raise-allin').text('MIN RAISE ('+ chips +')');
        } else {
          $('.raise-allin').text('RAISE ('+ chips +')');
        }
      });

      $(document).mouseup(function(e) {
        active = false;
        $('.mask').hide();
      });
    });
  }; 

  var initTime = function() {

    var $times = $('.time');
    
    $times.each(function() {
      var $time = $(this);
      var $progress = $time.find('.progress');

      var progress = 100;
      var step = 0.05;
      var update = function() {
        progress -= step;
        $progress.width(progress + '%');
      };
      setInterval(update, 20);
    });
  };

  var initLog = function() {
    var historyFilter = $('.log .filter.history');
    var messagesFilter = $('.log .filter.messages');
    var logEntries = $('.log .entry');

    historyFilter.click(function() {
      logEntries.filter('.message').toggle();
    });

    messagesFilter.click(function() {
      logEntries.filter('.history').toggle();
    });
  };

  var init = function() {
    initSliders();
    initTime();
    initLog();
  };

  init();
});
