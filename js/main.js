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
        function currentHash() {
            var currentHash = window.location.hash;
            if (currentHash && currentHash.length) {
                 return currentHash.slice(1);
            }
            //else
            return;
        }
        function activateMenu($menu) {
            if($menu === undefined) {
                var name = currentHash();
                if (name && name.length) {
                    $menu = targets[name].menu;
                }
            }
            if ($menu.length && $nav.length) {
                $('.active', $nav).removeClass('active');
                $menu.addClass('active');
            }
        }
        
        var targets = {};
        function gotoHash(hash) {
            var name = hash || currentHash();
            if (!(name && name.length && targets[name])) { return; }
            
            var targetData = targets[name]
              , $target    = targetData.target
              , $menu      = targetData.menu
            ;
            var offset = $target.offset().top - navbarHeight;
            
            $('html, body').animate({scrollTop: offset}, 1000, "swing", function(){
                activateMenu();
            });
            window.location.hash = name;
        }
        
        $('a[href*=#]').each(function() {
            var $this = $(this);
            if ( filterPath(location.pathname) == filterPath(this.pathname)
                    && location.hostname == this.hostname
                    && this.hash.replace(/#/,'') 
               ) {
                var $targetId     = $(this.hash)
                  , targetName    = this.hash.slice(1)
                  , $targetAnchor = $('[name=' + targetName +']')
                  , $menuItem     = $('a[href=#'+ targetName +']').parent('li')
                  , $target = $targetId.length ? $targetId : 
                                $targetAnchor.length ? $targetAnchor : false;
                if ($target) {
                    // initialize the set of targets
                    targets[targetName] = {
                        target: $target
                      , menu  : $menuItem
                    };
                    // register the onclick
                    $this.click(function() {
                        gotoHash(targetName);
                        return false;
                    });
                }
            }
        });
        
        gotoHash();
        
        /* Make external links go _blank
        --------------------------------------------------------- */
        var $extLinks = $content.find("a[href^='http']");
        $extLinks.attr('target', '_blank');
        $extLinks.each(function(){
            $(this).append(' <span class="glyphicon glyphicon-new-window"></span>');
        });
    });
})(jQuery);
