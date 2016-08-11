$(function() {
    var $body = $('html, body'),
        $wrap = $('.mainBody'),
        $btnNav = $('#btn-menu'),
        active = 'is-active';

    $(document).on('click', '#btn-menu', toggleNav);
    $(document).mouseup(function (e) {
        if (!$btnNav.is(e.target) && $btnNav.has(e.target).length === 0) {
            closeNav();
        }
    });

    function toggleNav() {
        if ($btnNav.hasClass(active)) {
            closeNav();
        } else {
            activeNav();
        }
    }

    function activeNav() {
        $body.addClass('no-scroll');
        $btnNav.addClass(active);
        $wrap.addClass(active);
    }

    function closeNav() {
        $body.removeClass('no-scroll');
        $btnNav.removeClass(active);
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
