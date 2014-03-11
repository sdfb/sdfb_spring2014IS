$(document).ready(function() {
	$('li').click(function(e){
		document.getElementById('googleaddnode').reset();
		document.getElementById('googleaddedge').reset();
		$('section').css('display','none');	
		var id = '#' + e.target.id + 'form';
		$(id).css('display','block');
	});
});