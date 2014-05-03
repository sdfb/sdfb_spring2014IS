$(document).ready(function() {
	$("#onenode").tooltip({placement: 	'right', title: 'Connections of one individual'});
	$("#twonode").tooltip({placement: 	'right', title: 'Mutual connections between two individuals'});
	$("#onegroup").tooltip({placement: 	'right', title: 'Members of one group'});
	$("#twogroup").tooltip({placement: 	'right', title: 'Mutual members of two groups'});


    $("#addnode").tooltip({placement:   'right', title: 'Add a new individual to the database'});
    $("#addgroup").tooltip({placement:  'right', title: 'Add a member to an existing or new group'});
    $("#addedge").tooltip({placement:   'right', title: 'Add and annotate a relationship between two individuals'});

    $("#icon-tag").tooltip({placement:  'right', title: 'Tag group'});
    $("#icon-link").tooltip({placement: 'right', title: 'Add a relationship'});
    $("#icon-annotate").tooltip({placement: 'right', title: 'Annotate relationship'});

	$('#onenodeform').css('display','block');

	// Shows search bars when click on side menu
	$('.accordion_content ul li').click(function(e){
		document.getElementById('googleaddnode').reset();
		document.getElementById('googleaddedge').reset();
        document.getElementById('googleaddgroup').reset();
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
    $("button.icon").click(function(e){
        $('.accordion_content ul li').removeClass('clicked');
        $('section').css('display','none');
        $('#add' + this.name).addClass('clicked');
        $('#add'+ this.name + 'form').css('display','block');
        $('#accordion h3').removeClass('on');
        $('#accordion div').slideUp();
        $('#contribute').prev().addClass('on');
        $('#contribute').slideDown();
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
                result = "Certain"
            }
            $("#slider-result" + this.title).html( result + " relationships");
        },

        //this updates the hidden form field so we can submit the data using a form
        change: function(event, ui) { 
            $("#confidence" + this.title).attr('value', ui.value);
        }
    });
});