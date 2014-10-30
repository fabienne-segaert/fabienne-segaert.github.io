(function ($){
    /* wait for the page to be loaded */
    $(function(){
        var $content = $('#content');
        
        /* Make external links go _blank
        --------------------------------------------------------- */
        var $extLinks = $content.find("a[href^='http']");
        $extLinks.attr('target', '_blank');
        $extLinks.each(function(){
            $(this).append(' <span class="glyphicon glyphicon-new-window"></span>');
        });


        /* create slider(s) with pull-tag
        --------------------------------------------------------- */
        $(".slide-tag").each(function(){
            var $tag = $(this)
              , target = $tag.data('slide-target')
              , $slide
              , mlft
            ;
            if (target) {
                $slide = $(target); // search it
            } else {
                $slide = $tag.parents(".slide")
            }
            mlft = $slide.css("margin-left")

            if ($slide.length == 0) return;
            
            function show() {
                $slide.animate({"margin-left" : "0px"}, 1000, "swing");
            }
            function hide() {
                $slide.animate({"margin-left" : mlft}, 1000, "swing");
            }
            $tag.click(function() {
                var on = $slide.data('slide-on') || false;
                if (on) { hide(); } else { show(); }
                $slide.data('slide-on', !on);
                return false;
            });

            function shakeIn(fn) {
                $tag.animate({"margin-left" : "-10px"}, 250, "swing", fn);
            }
            function shakeOut(fn) {
                $tag.animate({"margin-left" : "0px"}, 250, "swing", fn);
            }
            function shake() {
                shakeIn(shakeOut(shakeIn(shakeOut)));
            }

            if ($tag.is("img") && !target) {
                setInterval(shake, 15000);
            }
        });

        /* Add top-clips!
        --------------------------------------------------------- */
        $("[data-clips]").each(function() {
            var $tgt = $(this)
              , clips = $tgt.data('clips')
              , links = $("body").data('links')
            ;
            $div = $('<div class="top-clips">');
            clips.forEach(function(name, i){
                var link = links[name];
                if (!link) {
                    $div.append('<img class="top-clip" src="/img/clip-'+name+'.png">');
                } else {
                    $div.append('<a target="_blank" href="'+link+'"><img class="top-clip" src="/img/clip-'+name+'.png"></a>');
                }
            });
            $tgt.append($div);
        });

    });
})(jQuery);
