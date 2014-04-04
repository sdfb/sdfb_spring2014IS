$(document).ready(function() {
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
	$('#prev').click(function(e){
		var c = $('.active')[0].id.slice(5);
		if (c == '2') {
			$('#group1').click();
		} else if (c == '3') {
			$('#group2').click();
		}
	});
	$('#next').click(function(e){
		var c = $('.active')[0].id.slice(5);
		if (c == '1') {
			$('#group2').click();
		} else if (c == '2') {
			$('#group3').click();
		}
	});
	$('#findtwogroup').click(function(e){
		$('#twogroupsmenu').css('display','block');
	});
});