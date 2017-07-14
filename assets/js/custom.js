$(document).ready(function() {
	var goFundMe=5.0;
	var razoo=5.0;
	var fundly=4.9;
	var kyyndPrice=25;
	var fundCount="";
	var goal="";

	$('.plus').on('click',function(){  
		var textField=$(this).closest('.cxd-pricing-input').find('.text-value'); 
   		textField.val(parseInt(textField.val())+1);
   		personalFundraiserCalculator($('#fund-count').val(),$('#goal').val());
	});
	$('.minus').on('click',function(){   
   		var textField=$(this).closest('.cxd-pricing-input').find('.text-value'); 
   		var tValue=textField.val();
   		var id=textField.attr('id');
			if((id=='fund-count' && tValue >1) || (id=='goal' && tValue >1000) || (id=='avg-donation' && tValue >10)) {
				textField.val(tValue-1);
			}
		var fundCount=$('#fund-count').val();
		var goal=$('#goal').val();
			if(fundCount!="" && goal!="" && fundCount>0 && goal>1000)
				personalFundraiserCalculator(fundCount,goal);
   		
	});

	$('.ch-plus').on('click',function(){  
		var textField=$(this).closest('.cxd-pricing-input').find('.ch-text-value'); 
   		textField.val(parseInt(textField.val())+1);
   		charityFundraiserCalculator($('#ch-fund-count').val(),$('#ch-goal').val());
	});

	$('.ch-minus').on('click',function(){   
   		var textField=$(this).closest('.cxd-pricing-input').find('.ch-text-value'); 
   		var tValue=textField.val();
   		var id=textField.attr('id');
			if((id=='ch-fund-count' && tValue >1) || (id=='ch-goal' && tValue >1000) || (id=='ch-avg-donation' && tValue >10)) {
				textField.val(tValue-1);
			}
	    var fundCount=$('#ch-fund-count').val();
		var goal=$('#ch-goal').val();
			if(fundCount!="" && goal!="" && fundCount>0 && goal>1000)
				charityFundraiserCalculator(fundCount,goal);
   		
	});

	$(".text-value").on("change paste keyup", function() {
		var fundCount=$('#fund-count').val();
		var avgDonation=$('#avg-donation').val();
		var goal=$('#goal').val();
		// if(fundCount=="" || fundCount<=0) {
		// 	fundCount=1;
		// 	$('#fund-count').val(1);
		// }
		// if(goal=="" || goal<1000) {
		// 	goal=1000;
		// 	$('#goal').val(1000);
		// }
		// if(avgDonation=="" || avgDonation<10) {
		// 	$('#avg-donation').val(10);
		// }
		//if(fundCount!="" && goal!="" && fundCount>0 && goal>=1000)
			personalFundraiserCalculator(fundCount,goal);

	});

	$(".ch-text-value").on("change paste keyup", function() {
		var fundCount=$('#ch-fund-count').val();
		var avgDonation=$('#avg-donation').val();
		var goal=$('#ch-goal').val();
		// if(fundCount=="" || fundCount<=2) {
		// 	fundCount=3;
		// 	$('#ch-fund-count').val(3);
		// }
		// if(goal=="" || goal<1000) {
		// 	goal=1000;
		// 	$('#ch-goal').val(1000);
		// }
		// if(avgDonation=="" || avgDonation<10) {
		// 	$('#ch-avg-donation').val(10);
		// }
		//if(fundCount!="" && goal!="" && fundCount>0 && goal>=1000)
			charityFundraiserCalculator(fundCount,goal);

	});
	$(".text-value,.ch-text-value").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	function personalFundraiserCalculator(fundCount,goalAmount) {
		var kyyndTotal=fundCount*kyyndPrice;
		var razooTotal=Math.round(fundCount*razoo*goalAmount/100);
		var goFundMeTotal=Math.round(fundCount*goFundMe*goalAmount/100);
		var diffRazzo=Math.round(razooTotal/kyyndTotal);
		var diffGoFundMe=Math.round(goFundMeTotal/kyyndTotal);
		$('#kyynd-total').text('$'+new Intl.NumberFormat().format(kyyndTotal));
		$('#gofundme-total').text('$'+new Intl.NumberFormat().format(goFundMeTotal));
		$('#razoo-total').text('$'+new Intl.NumberFormat().format(razooTotal));
		$('#diff-gofundMe').text(diffGoFundMe+'X');
		$('#diff-razoo').text(diffRazzo+'X');
		var save=parseInt(goFundMeTotal)-parseInt(kyyndTotal);
		if (save<0) 
			save=0;
		$('#save').text("Save $"+ new Intl.NumberFormat().format(save) +" with Kyynd");
		$('#gofund-cal').text(fundCount+' X $'+new Intl.NumberFormat().format(goalAmount)+' X 5.0% = $'+new Intl.NumberFormat().format(goFundMeTotal));
		$('#razoo-cal').text(fundCount+' X $'+new Intl.NumberFormat().format(goalAmount)+' X 5.0% = $'+new Intl.NumberFormat().format(razooTotal));
		$('#kyynd-cal').text('$'+new Intl.NumberFormat().format(kyyndPrice)+' X '+fundCount+' = $'+new Intl.NumberFormat().format(kyyndTotal));

	}

	function charityFundraiserCalculator(fundCount,goalAmount) {
		var kyyndTotal=kyyndPrice;
		var fundlyTotal=Math.round(fundCount*fundly*goalAmount/100);
		var goFundMeTotal=Math.round(fundCount*goFundMe*goalAmount/100);
		var diffFundly=Math.round(fundlyTotal/kyyndTotal);
		var diffGoFundMe=Math.round(goFundMeTotal/kyyndTotal);
		$('#ch-kyynd-total').text('$'+new Intl.NumberFormat().format(kyyndTotal));
		$('#ch-gofundme-total').text('$'+new Intl.NumberFormat().format(goFundMeTotal));
		$('#fundly-total').text('$'+new Intl.NumberFormat().format(fundlyTotal));
		$('#ch-diff-gofundMe').text(diffGoFundMe+'X');
		$('#diff-fundly').text(diffFundly+'X');
		var save=parseInt(goFundMeTotal)-parseInt(kyyndTotal);
		if (save<0) 
			save=0;
		
		$('#ch-save').text("Save $"+new Intl.NumberFormat().format(save) +" with Kyynd");
		$('#ch-gofund-cal').text(fundCount+' X $' +new Intl.NumberFormat().format(goalAmount)+' X 5.0% = $'+new Intl.NumberFormat().format(goFundMeTotal));
		$('#fund-cal').text(fundCount+' X $' +new Intl.NumberFormat().format(goalAmount)+' X 4.9% = $'+new Intl.NumberFormat().format(fundlyTotal));

	}
});