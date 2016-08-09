// scroll
var nice = $("html").niceScroll();

$(window).scroll(function() {
    //- nav fixed
    if ($('.page-header').offset().top > 50) {
        $('.page-header').addClass("top-nav-collapse");
    } else {
        $('.page-header').removeClass("top-nav-collapse");
    }
});
