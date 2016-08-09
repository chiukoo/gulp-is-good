$(function() {
    var $wrap = $(".mainBody"),
        $nav = $(".page-nav"),
        navBtn = '#nav-btn',
        active = 'is-active';

    $(document).on('click', navBtn, toggleNav);
    $(document).mouseup(function (e) {
        if (!$nav.is(e.target) && $nav.has(e.target).length === 0) {
            closeNav();
        }
    });

    function toggleNav(e) {
        if ($wrap.hasClass(active)) {
            closeNav();
        } else {
            activeNav();
        }
    }

    function activeNav() {
        $wrap.addClass(active);
    }

    function closeNav() {
        $wrap.removeClass(active);
    }

    // drop menu
    $(function() {
        dropBtn = $('.dropMenu > a');
        dropBtn.on('click', function(e) {
            e.preventDefault();
            var drop = $(this).parent();
            dropBtn.each(function() {
                $(this).parent().not(drop).removeClass(active);
            });
            drop.toggleClass(active);
        });
    });
});

