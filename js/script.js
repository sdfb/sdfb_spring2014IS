$(document).ready(function() {
	$("#onenode").tooltip({placement: 	'right', title: 'Connections of one individual'});
	$("#twonode").tooltip({placement: 	'right', title: 'Mutual connections between two individuals'});
	$("#onegroup").tooltip({placement: 	'right', title: 'Members of one group'});
	$("#twogroup").tooltip({placement: 	'right', title: 'Mutual members of two groups'});
	$('#onenodeform').css('display','block');

	//clicking menu buttons to show search bars
	$('.accordion_content ul li').click(function(e){
		document.getElementById('googleaddnode').reset();
		document.getElementById('googleaddedge').reset();
        $('.accordion_content ul li').removeClass('clicked');
        $(this).addClass('clicked');
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

	$(".slider").slider({
        animate: true,
        range: "min",
        value: 3,
        min: 0,
        max: 4,
        step: 1,
        //this gets a live reading of the value and prints it on the page
        slide: function( event, ui ) {
        	var result = "Very unlikely";
        	if (ui.value == 1) {
        		result = "Unlikely";
        	} else if (ui.value == 2) {
        		result = "Possible";
        	} else if (ui.value == 3) {
        		result = "Likely";
        	} else if (ui.value == 4){
                result = "Very likely"
            }
            $("#slider-result" + this.title).html( result + " relationships");
        },

        //this updates the hidden form field so we can submit the data using a form
        change: function(event, ui) { 
            $("#confidence" + this.title).attr('value', ui.value);
        }
    });
});