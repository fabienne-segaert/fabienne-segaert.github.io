(function ($){
  /* wait for the page to be loaded */
  $(function(){


    /* Enable the toggle effect 
    --------------------------------------------------------- */
    var $tgl = $("#nav_menu_toggle")
      , $hideToRight = $(".hide-right")
      , $hideToTop =  $(".hide-top")
      , $hideToFade =  $(".hide-fade")
      , animopts = {duration: 400, queue: false}
      , tglHeightStr = $tgl.height() + "px"
    ;
    function completeOpts( fn) {
      fn = fn || function(){};
      var cmpl = {complete: fn}
      ;
      return $.extend(cmpl, animopts);
    }


    if ($tgl) { // if a tgl is found
      var completeHide = completeOpts( function() {
          $(this).css('display', 'none');
      });

      function hideElements () {
        $tgl.rotate({animateTo:-90});
        $hideToRight.animate({width: "toggle", height: tglHeightStr }, completeOpts(function() {
          $(this).css('display', 'none');
          $(this).css('height', tglHeightStr);
        }));
        $hideToTop.slideUp( completeHide);
        $hideToFade.fadeOut( completeHide);
      }

      function showElements () {
        $tgl.rotate({animateTo:0});
        $hideToRight.animate({width: "toggle"}, completeOpts( function() {  
          $(this).css('display', 'block');
          $(this).css('width', 'none');
          $(this).css('height', 'none');
        }));
        $hideToTop.slideDown( completeOpts( function() {
          $(this).css('display', 'block');
          $(this).css('height', 'none');
        }));
        $hideToFade.fadeIn( completeOpts( function() {
          $(this).css('display', 'block');
          $(this).css('opacity', '1');
        }));
      }

      function alternate(fnOn, fnOff) {
        var on = true
        ;
        return function() {
          if (on) { fnOn(); } else { fnOff(); }
          on = !on;
        }
      }

      alternate.on = true;

      //$tgl.on('click', alternate(hideElements, showElements));
      $tgl.on('mouseenter', hideElements);
      $tgl.on('mouseout', showElements);

    }


    /* Scale the height of content to the available space
    --------------------------------------------------------- */
    var $content = $('#content')
      , $window  = $(window)
      , $header  = $('#header')
      , $footer  = $('#footer')
      , margin   = 85
    ;

    function resize(){
      var newHeight = $window.height() - $header.height() - $footer.height() - margin;
      ;
      //$content.css({'max-height': newHeight +"px"});
      $content.css({'height': newHeight +"px"});
    };
    $window.on('resize', resize);
    $window.resize();


    /* Enable the custom scrollbar
    --------------------------------------------------------- */
    $content.mCustomScrollbar(); 


    /* Make external links go _blank
    --------------------------------------------------------- */
    var $extLinks = $content.find("a[href^='http']");
    ;
    $extLinks.attr('target', '_blank');
    $extLinks.each(function(){
      $(this).append(' <span class="glyphicon glyphicon-new-window"></span>');
    });


    /* Style Content elements using bootstrap
    --------------------------------------------------------- */
    var $tbls = $content.find('table')
    ;
    $tbls.addClass('table table-hovered table-condensed');
    $tbls.css('background-color', 'rgba( 240, 240, 240, 0.8)');
    $tbls.css('color','rgb( 64, 64, 64)');

    var $imgs = $content.find('img')
    ;
    $imgs.addClass('img-thumbnail');
    $imgs.css('padding', '10px');
     


    /* Enable the background-slide-show
    --------------------------------------------------------- */
    var $body = $('body')
      , bgset = $body.data('bg')
    ;
    if (bgset && bgset.length) { // if slides are defined
      var slides = []
      ;
      $(bgset).each(function(){
        slides.push({image: this});
      });
      $.supersized({ slideshow: 1, vertical_center : 1, fit_portrait: 0, fit_landscape: 0, slides : slides });
    }

  });
})(jQuery);
