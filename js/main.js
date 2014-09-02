(function ($){
    /* wait for the page to be loaded */
    $(function(){
        var $content = $('#content');
        
        /* Make the single-page scroll work locally
        --------------------------------------------------------- */
        var navbarHeight = $('#navbar').height();
        function filterPath(string) {
            return string
                .replace(/^\//,'')                            /* remove leading slash */
                .replace(/(index|default).[a-zA-Z]{3,4}$/,'') /* remove file.extension */
                .replace(/\/$/,'');                           /* remove trailing slash */
        }
        var $nav = $('nav');
        $('a[href*=#]').each(function() {
            var $this = $(this);
            if ( filterPath(location.pathname) == filterPath(this.pathname)
                    && location.hostname == this.hostname
                    && this.hash.replace(/#/,'') 
               ) {
                var $targetId     = $(this.hash)
                  , targetName    = this.hash.slice(1)
                  , $targetAnchor = $('[name=' + targetName +']')
                  , $navItem      = $('a[href=#'+ targetName +']').parent('li')
                  , $target = $targetId.length ? $targetId : 
                                $targetAnchor.length ? $targetAnchor : false;
                if ($target) {
                    var targetOffset = $target.offset().top - navbarHeight;
                    $this.click(function() {
                        $('html, body').animate({scrollTop: targetOffset}, 1000);
                        var d = document.createElement("div");
                        d.style.height = "101%";
                        d.style.overflow = "hidden";
                        document.body.appendChild(d);
                        window.scrollTo(0,targetOffset);
                        setTimeout(function() {
                            d.parentNode.removeChild(d);
                        }, 10);
                        window.location.hash = targetName

                        //TODO menu addaptation! (and undo scrollspy?
                        if ($navItem.length && $nav.length) {
                            $('.active', $nav).removeClass('active');
                            $navItem.addClass('active');
                        }
                        return false;
                    });
                }
            }
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
