$(document).ready(function() {
	//hover over search bars for descriptions
	$("#onenode").mouseover(function() {
		// document.onmousemove = getMouseXY;
		// placeDiv(tempX-20, tempY,'onenodeD');
	    $("#onenodeD").show();
	}).mouseout(function() {
	    $("#onenodeD").hide();
	});
	$("#twonode").mouseover(function() {
		// document.onmousemove = getMouseXY;
		// placeDiv(tempX, tempY,'twonodeD');
	    $("#twonodeD").show();
	}).mouseout(function() {
	    $("#twonodeD").hide();
	});
	$("#onegroup").mouseover(function() {
		// document.onmousemove = getMouseXY;
		// placeDiv(tempX, tempY,'onegroupD');
	    $("#onegroupD").show();
	}).mouseout(function() {
	    $("#onegroupD").hide();
	});
	$("#twogroup").mouseover(function() {
		// document.onmousemove = getMouseXY;
		// placeDiv(tempX, tempY,'twogroupD');
	    $("#twogroupD").show();
	}).mouseout(function() {
	    $("#twogroupD").hide();
	});

	function placeDiv(x_pos, y_pos, div) {
	  var d = document.getElementById(div);
	  d.style.position = "absolute";
	  d.style.left = x_pos+'px';
	  d.style.top = y_pos+'px';
	}

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

	
    ////////////////////////////////// 1-PERSON SEARCH //////////////////////////////////

    var confidence = "CI2";
    //SLIDER FOR CONFIDENCE INTERVAL
    // CI1 = 0.0-0.19, CI2 = 0.2-0.39, CI3 = 0.4-0.59, CI4 = 0.6-0.79, CI5 = 0.81-1.0
    $("#confidInt td").click(function(){
    	$("#confidInt td").css('background', '#FFF');
    	confidence = this.id;
    	var cid = Number(confidence.charAt(2)); //number for conf int
    	for (var i=0; i<=cid; i++){
    		var temp = "#CI"+i;
    		$(temp).css('background', '#8F9094');
    	}
    	$(this).css('background', '#73757D');
    })
});