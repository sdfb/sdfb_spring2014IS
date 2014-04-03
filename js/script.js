$(document).ready(function() {
	$('li').click(function(e){
		document.getElementById('googleaddnode').reset();
		document.getElementById('googleaddedge').reset();
		$('#twogroupsmenu').css('display','none');
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
			$('.toggle').removeClass('active');
			$('#group1').addClass('active');
		} else if (c == '3') {
			$('.toggle').removeClass('active');
			$('#group2').addClass('active');
		}
	});
	$('#next').click(function(e){
		var c = $('.active')[0].id.slice(5);
		if (c == '1') {
			$('.toggle').removeClass('active');
			$('#group2').addClass('active');
		} else if (c == '2') {
			$('.toggle').removeClass('active');
			$('#group3').addClass('active');
		}
	});
	$('#findtwogroup').click(function(e){
		$('#twogroupsmenu').css('display','block');
	});
});