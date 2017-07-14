$(document).ready(function() {
	materialEffect();
	rippleEffect();
	setInterval(checkInput, 100);
});

function materialEffect() {

	$(".group").find("input, select").focus(function() {
		var group = $(this).parents(".group");
		if($(this).val().trim().length==0){
			$(group).addClass("is-focussed");			
		}
		$(group).addClass("is-focussed-color");
	});

	$(".group").find("input, select").blur(function() {
		var group = $(this).parents(".group");
		if($(this).val().trim().length==0){
			$(group).removeClass("is-focussed");
		}
		$(group).removeClass("is-focussed-color");
		if( ( $(this).attr("id") == "elm_start_date_holder" && !$(group).hasClass("is-focussed") ) || ( $(this).attr("id") == "elm_end_date_holder" && !$(group).hasClass("is-focussed") ) ) {
			window.setTimeout(materialEffect, 200);
		}
	});
	checkInput();
}

function checkInput() {
	$(".bar-label").css('display','block');
	$(".group").each(function(){
		if($(this).find("input").length>0){
			if($(this).find("input").val().length!=0) {
				if($(this).find("input").val().trim().length!=0) {
					$(this).addClass("is-focussed");
				}
			}
		}
		if($(this).find("select").length>0){
			if($(this).find("select").val()!=null && $(this).find("select").val().length!=0) {
				if($(this).find("select").val().trim().length!=0) {
					$(this).addClass("is-focussed");
				}
			}
		}
	});
}

function rippleEffect() {
	$(".btn").click(function (e) {
	   $(this).css({"position":"relative", "overflow":"hidden"});
	  $(".ripple").remove();

	  var posX = $(this).offset().left,
	      posY = $(this).offset().top,
	      buttonWidth = $(this).width(),
	      buttonHeight =  $(this).height();
	  
	  $(this).prepend("<span class='ripple'></span>");

	  
	  if(buttonWidth >= buttonHeight) {
	    buttonHeight = buttonWidth;
	  } else {
	    buttonWidth = buttonHeight; 
	  }
	  
	  var x = e.pageX - posX - buttonWidth / 2;
	  var y = e.pageY - posY - buttonHeight / 2;
	  
	 
	  $(".ripple").css({
	    width: buttonWidth,
	    height: buttonHeight,
	    top: y + 'px',
	    left: x + 'px'
	  }).addClass("rippleEffect");
	});
}