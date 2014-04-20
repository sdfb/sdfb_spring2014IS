$(document).ready(function(){
	$("#accordion h3").click(function(){
		//change colors when click
		$('#accordion h3').css('background', '#196B94');
		$('#accordion h3').removeClass('on');
		$(this).css('background','#185D80');
		$(this).addClass('on');
		//slide up all the link lists
		$("#accordion div").slideUp();
		//slide down the link list below the h3 clicked - only if its closed
		if(!$(this).next().is(":visible")) {
			$(this).next().slideDown();
		}
	})
})

//accordion function for when a user clicks on a node or edge.
function accordion(item){
	$(".accordion_content").removeClass('active');
	$(".accordion_content").slideUp();
	$("#accordion h3").removeClass('on');
	$("#" + item + "info").prev().addClass('on');
	$("#" + item + "info").slideDown();	
	$("#" + item + "info").addClass("active");
}