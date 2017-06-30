$(document).ready(function () {
	$("#open_menu, #fixed_open_menu").click(function(event) {
		event.preventDefault();
		$(this).parents('body').addClass('menu-open');
	});
	$("#close_menu").click(function(event) {
		event.preventDefault();
		$(this).parents('body').removeClass('menu-open');
	});

	$(document).scroll(function() {
		if ($(".section-two-content")[0] && $(".gallary-content .row .col-4")[0]) {
			checkAnimation('.section-two-content', 'start');
			checkAnimation('.gallary-content .row .col-4', 'start');
		}
		if($(".footer .container")[0]) {
			checkAnimation('.footer .container', 'start');
		}
		if($(".contact-section-two .display-table")[0] && $(".contact-section-three form")[0]) {
			checkAnimation('.contact-section-two .display-table', 'start');
			checkAnimation('.contact-section-three form', 'start');
		}
		var y = $(this).scrollTop();
		if (y > 200) {
			$('body').addClass('sticky-header');
		} else {
			$('body').removeClass('sticky-header');
		}
	});
});

// Returns true if the specified element has been scrolled into the viewport.
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation(elmClass, animClass) {
    var $elem = $(elmClass);

    // If the animation has already been started
    if ($elem.hasClass(animClass)) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass(animClass);
    }
}


