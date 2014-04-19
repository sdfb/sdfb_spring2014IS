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


//accordian function for when a user clicks on a node or edge.
function accordian(item){

	$(".accordion_content").removeClass('active');
	$(".accordion_content").slideUp();
	$('#accordion h3').removeClass('on');

	if(item=="node"){
		console.log("node click");
		$("#nodeinfo").prev().addClass('on');
		//console.log($("#nodeinfo").prev());//.addClass('on');

		$("#nodeinfo").slideDown();	
		$("#nodeinfo").addClass("active");
			
	}
	else if(item=="edge"){

		console.log("edge click");
		$("#relationship").prev().addClass('on');

		$("#relationship").slideDown();	
		$("#relationship").addClass("active");
	}
	else{
		console.log("this shouldnt happen");
		$("#navigation").prev().addClass('on');
		
		$("#navigation").slideDown();	
		$("#navigation").addClass("active");
	}
}