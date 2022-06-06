jQuery(function($) {

    var windowWidth = $('body').width();

    /*
    |----------------------------------------------------------------
    | Hide/Show Header
    |----------------------------------------------------------------
    */
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();
    var projectAnchors = document.getElementById("projectAnchors");
    var projectAnchor = document.getElementsByClassName("anchor");

    $(window).scroll(function(event){
        didScroll = true;
    });

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta) {
          return;
        }

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('header-down').addClass('header-up');
        }
        else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('header-up').addClass('header-down');
            }
        }

        lastScrollTop = st;
    }

    setInterval(function() {
        if(didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    /*
    |--------------------------------------------------------
    | Navigation
    |--------------------------------------------------------
    */
    const targetElement = document.querySelector('.gn');
    // bodyScrollLock.disableBodyScroll(targetElement);
    // bodyScrollLock.enableBodyScroll(targetElement);

    $('.gn a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        bodyScrollLock.enableBodyScroll(targetElement);
        $('.gn-trigger').removeClass('is-active');
        $('.gn').slideUp();
        projectAnchors.style.top = "130px";
        projectAnchors.style.transition = "all 0.3s";
        return false;
    });    

   $('.gn-trigger').on('click',function(e) {
       e.preventDefault();
       if($(this).hasClass('is-active')) {
           $(this).removeClass('is-active');
           $('.gn').slideUp();
           bodyScrollLock.enableBodyScroll(targetElement);
           projectAnchors.style.top = "130px";
           projectAnchors.style.transition = "all 0.3s";
       } else {
        $(this).addClass('is-active');
        $('.gn').slideDown(400);
        bodyScrollLock.disableBodyScroll(targetElement);
        projectAnchors.style.top = "-100px";
        projectAnchors.style.transition = "all 0.3s";
       }
   });

   $(window).resize(function(){
    windowWidth = $('body').width();
    if(windowWidth > 767 && $('.gn-trigger').hasClass('is-active')) {
        setTimeout(function() {
            $('.gn-trigger').removeClass('is-active');
            $('.gn').slideUp(0);
        }, 200);
        bodyScrollLock.enableBodyScroll(targetElement);
    } 
   });
});
