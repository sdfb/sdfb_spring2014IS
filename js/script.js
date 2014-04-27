$(document).ready(function() {
	$("#onenode").tooltip({placement: 	'right', title: 'The connections of one individual'});
	$("#twonode").tooltip({placement: 	'right', title: 'The mutual connections between two individuals'});
	$("#onegroup").tooltip({placement: 	'right', title: 'The members of one group'});
	$("#twogroup").tooltip({placement: 	'right', title: 'The mutual members of two groups'});
	$('#onenodeform').css('display','block');

	//clicking menu buttons to show search bars
	$('li').click(function(e){
		document.getElementById('googleaddnode').reset();
		document.getElementById('googleaddedge').reset();
		$('section').css('display','none');	
		var id = '#' + e.target.id + 'form';
		$(id).css('display','block');
	});
	$('.toggle').click(function(e){
		$('.toggle').removeClass('active');
		$(this).addClass('active');
	});
	$('#findtwogroup').click(function(e){
		$('#twogroupsmenu').css('display','block');
	});

	$( ".slider" ).slider({
        animate: true,
        range: "min",
        value: 2,
        min: 0,
        max: 3,
        step: 1,

        //this gets a live reading of the value and prints it on the page
        slide: function( event, ui ) {
        	var result = "Unlikely";
        	if (ui.value == 1) {
        		result = "Possible";
        	} else if (ui.value == 2) {
        		result = "Likely";
        	} else if (ui.value == 3) {
        		result = "Very likely";
        	}
            $( "#slider-result" ).html( result + " relationships");
        },

        //this updates the hidden form field so we can submit the data using a form
        change: function(event, ui) { 
            $('#confidence').attr('value', ui.value);
        }
    });
});