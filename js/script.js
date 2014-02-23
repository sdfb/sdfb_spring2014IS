$(document).ready(function() {
	$('li').click(function(e){
		$('section').css('display','none');	
		var id = '#' + e.target.id + 'form';
		$(id).css('display','block');
	});
});