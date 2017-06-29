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
		var y = $(this).scrollTop();
		if (y > 200) {
			$('body').addClass('sticky-header');
		} else {
			$('body').removeClass('sticky-header');
		}
	});
});