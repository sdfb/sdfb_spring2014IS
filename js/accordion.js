/*jQuery time*/
// $(document).ready(function(){
// 	$("#accordion h3").click(function(){
// 		//slide up all the link lists
// 		$("#accordion ul ul").slideUp();
// 		//slide down the link list below the h3 clicked - only if its closed
// 		if(!$(this).next().is(":visible"))
// 		{
// 			$(this).next().slideDown();
// 		}
// 	})
// })

$(document).ready(function(){
	//change colors when hover
	$("#accordion h3").hover($(this).addClass('hover'), $(this).removeClass('hover'));
	$("#accordion h3").click(function(){
		//change colors when click
		$('#accordion h3').css('background', '#196B94');
		$('#accordion h3').removeClass('on');
		$(this).css('background','#185D80');
		$(this).addClass('on');

		//slide up all the link lists
		$("#accordion div").slideUp();
		//slide down the link list below the h3 clicked - only if its closed
		if(!$(this).next().is(":visible"))
		{
			$(this).next().slideDown();
		}
	})
})


//accordian function for when a user clicks on a node or edge.
function accordian(item){

	if(item=="node"){
		//console.log(("#node-info").prev());
	}
	else if(item=="edge"){
	}
}