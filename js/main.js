(function ($){
    /* wait for the page to be loaded */
    $(function(){
        var $content = $('#content');
        
        $(".slide-tag").each(function(){
            var $tag = $(this)
              , $slide = $tag.data('target') || $tag.parents(".slide")
              , on = false
              , mlft = $slide.css("margin-left")
            ;
            
            function show() {
                $slide.animate({"margin-left" : "0px"}, 1000, "swing");
            }
            function hide() {
                $slide.animate({"margin-left" : mlft}, 1000, "swing");
            }
            $tag.click(function() {
                if (on) { hide(); } else { show(); }
                on = !on;
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
            setInterval(shake, 15000);
        });
        

        /* Make external links go _blank
        --------------------------------------------------------- */
        var $extLinks = $content.find("a[href^='http']");
        $extLinks.attr('target', '_blank');
        $extLinks.each(function(){
            $(this).append(' <span class="glyphicon glyphicon-new-window"></span>');
        });
    });
})(jQuery);
