var keys = {
	nodes: "0AhtG6Yl2-hiRdHdQM1JrS2JTRklaQ2M1ek41bEs5LVE",
	annot: "0AhtG6Yl2-hiRdGdjLVNKZmJkbkhhNDMzQm5BTzlHX0E"
}

var rand = true;
var addGraph;

document.addEventListener('DOMContentLoaded', function () {
	Tabletop.init({
		key: keys.nodes,
		callback: init
	});
	$("#accordion h3").click(function(){
		rand = false;
	});
});

function node() {
	this.id = null;
	this.first = null;
	this.last = null;
	this.birth = null;
	this.death = null;
	this.label = null;
	this.occupation = null;
	this.edges = null;
	this.explored = false;
}

function group() {
	this.id = null;
	this.name = null;
	this.nodes = null;
}

// Create a dictionnary of nodes and groups
function init(result) {
	
	var data = {
		nodes: {},
		groups: {},
		nodes_names: {},
		groups_names: {}
	};
	
	result.nodes.elements.forEach(function (row) {
		var n = new node();
		n.id = row.id;
		n.first = row.first;
		n.last = row.last;
		n.birth = row.birth;
		n.death = row.death; 
		n.occupation = row.occupation;
		n.label = row.first + ' ' + row.last;
		n.name = n.label + ' (' + row.birth + ')';
		n.edges = [];
		n.edges[0] = row.unlikely.split(', ');
		n.edges[1] = row.possible.split(', ');
		n.edges[2] = row.likely.split(', ');
		n.edges[3] = row.likely.split(', ');
		data.nodes[n.id] = n;
		data.nodes_names[n.name] = n.id;
	});

	result.groups.elements.forEach(function (row) {
		var g = new group();
		g.id  = row.id;
		g.name = row.name;
		g.nodes = row.nodes.split(', ');
		data.groups[g.id] = g;
		data.groups_names[g.name] = g;
	});

	initGraph(data);
}

// Populate the suggested drop-down menus
// Make the buttons in the search panel functional
function initGraph(data){
	$('#one').typeahead({
		local: Object.keys(data.nodes_names).sort()
	});
	$('#two').typeahead({
		local: Object.keys(data.nodes_names).sort()
	});
	$('#three').typeahead({
		local: Object.keys(data.nodes_names).sort()
	});
	$('#entry_768090773').typeahead({
		local: Object.keys(data.nodes_names).sort()
	});
	$('#entry_1321382891').typeahead({
		local: Object.keys(data.nodes_names).sort()
	});
	$('#four').typeahead({
		local: Object.keys(data.groups_names).sort()
	});
	$('#five').typeahead({
		local: Object.keys(data.groups_names).sort()
	});
	$('#six').typeahead({
		local: Object.keys(data.groups_names).sort()
	});

	var options = {
		element: 'figure',
		with_labels: true,
		layout_attr: {
			charge: -500,
			linkDistance: 130
		},
		node_attr: {
			id: function (d) {
				return 'node-' + d.data.id;
			},
			r: function (d) {
				if (!d.data.radius) {
					return 18;
				}
				return d.data.radius;
			},
			title: function (d) {
				return d.label;
			}
		},
		node_style: {
			fill: function (d) {
				if (!d.data.radius) {
					return '#CAE4E1';
				}
				return '#aac';
			},
			stroke: 'none'
		},
		edge_style: {
			fill: '#555',
			'stroke-width': 5,
			cursor: 'pointer'
		},
		label_style: {
			fill: '#222',
			cursor: 'pointer',
			'font-size': '0.6em'
		},
		pan_zoom:{
			enabled: true,
			scale: false
		}
	}

	showRandomNode(data, options);

	$("#findonenode").click(function () {
		if ($("#one").val()) {
			rand = false;
			Pace.restart();
			showOneNode(data.nodes_names[$("#one").val()], data, options, parseInt($('#confidence')[0].value));
			$('#twogroupsmenu').css('display','none');
		}
	});

	$("#findtwonode").click(function () {
		if ($("#two").val() && $("#three").val()) {
			rand = false;
			Pace.restart();
			showTwoNodes(data.nodes_names[$("#two").val()], data.nodes_names[$("#three").val()], data, options, parseInt($('#confidence')[0].value),[]);			
			$('#twogroupsmenu').css('display','none');
		}
	});

	$("#findonegroup").click(function () {
		if ($("#four").val()) {
			rand = false;
			Pace.restart();
			showOneGroup($("#four").val(), data);
			$('#twogroupsmenu').css('display','none');
		}
	});

	$("#findtwogroup").click(function () {
		if ($("#five").val() && $("#six").val()) {
			rand = false;
			Pace.restart();
			$('#group1').html($("#five").val());
			$('#group3').html($("#six").val());
			findInterGroup($("#group1").html(), $("#group3").html(), data);
		}
	});

	$("#group1").click(function () {
		showOneGroup($("#group1").html(), data);
	});

	$("#group3").click(function () {
		showOneGroup($("#group3").html(), data);
	});

	$("#group2").click(function () {
		findInterGroup($("#group1").html(), $("#group3").html(), data);
	});

	$('#submitnode').click(function(){
		rand = false;
		var node = $('#entry_1804360896').val() + ' ' + $('#entry_754797571').val() + ' (' + $('#entry_524366257').val() + ')';
		$('section').css('display','none');
		$('#addedgeform').css('display','block');
		$('#entry_768090773').val(node);
		addGraph = new jsnx.Graph();
		addGraph.add_node(node, { id: 0, radius: 25 });
		jsnx.draw(addGraph, options, true);
	});

	$('#submitedge').click(function(){
		rand = false;
		var source = $('#entry_768090773').val();
		var target = $('#entry_1321382891').val();
		addGraph.add_node(target);
		addGraph.add_edge(source, target);
	});
}

function showRandomNode(data, options) {
	if (!rand) return;
	var keys = Object.keys(data.nodes);
	var id = data.nodes[keys[Math.floor(keys.length * Math.random())]].id;
	showOneNode(id, data, options, 2);
	if (rand) {
		setTimeout(function(){
			showRandomNode(data, options)
		}, 15000);
	}
}

function showOneNode(parent, data, options, confidence, graph) {
	// console.log(confidence);
	var isNew = false;
	if (!graph) {
		graph = new jsnx.Graph();
		isNew = true;
	}
	var p = data.nodes[parent];
	p.explored = true;
	graph.add_node(p.label, { id: p.id, radius: 20 });
	p.edges[confidence].forEach(function (edge){
		if (edge != "")  {
			var f = data.nodes[edge];
			graph.add_node(f.label, { id: f.id });
			graph.add_edge(p.label, f.label);
			f.edges[confidence].forEach(function (e){
				var s = data.nodes[e];
				if (graph.nodes().indexOf(s.label) >= 0) {
					graph.add_edge(f.label, s.label);
				}
			});
		}
	});
	if (isNew) {
		$('figure').html('');
		$("#results").html("Network of <b>" + p.name +"</b>");
		jsnx.draw(graph, options, true);
	}
	$("#one").val('');
	$("#one").typeahead('setQuery', '');
	d3.selectAll('.node').on('click', function (d) {
		rand = false;
		Pace.restart();
		if (!data.nodes[d.data.id].explored) {			
			d3.select(this.firstChild).style('fill', '#aac');
			showOneNode(d.data.id, data, options, confidence, graph);
		}
	});
	d3.selectAll('.edge').on('click', function (d) {
		rand = false;
		Pace.restart();
		var id1 = parseInt(d.source.data.id);
		var id2 = parseInt(d.target.data.id);
		getAnnotation(id1 < id2 ? id1 : id2, id1 > id2 ? id1 : id2, data);			
	});
	d3.selectAll('.edge').on('mouseover', function (d) {
		d3.select(this.firstChild).style('fill', '#7FB2E6');
		d3.select('#node-' + d.source.data.id).style('fill', '#7FB2E6');
		d3.select('#node-' + d.target.data.id).style('fill', '#7FB2E6');
	});
	d3.selectAll('.edge').on('mouseout', function (d) {
		d3.select(this.firstChild).style('fill', '#555');
		d3.select('#node-' + d.source.data.id).style('fill', function (n) {
			return data.nodes[d.source.data.id].explored ? '#aac' : '#CAE4E1';
		});
		d3.select('#node-' + d.target.data.id).style('fill', function (n) {
			return data.nodes[d.target.data.id].explored ? '#aac' : '#CAE4E1';
		});
	});
	var g = findGroups(p, data);
	showNodeInfo(p, g);
}


// takes in the node object and the data object, returns the groups that the node is in
function findGroups(node,data){
	var groups = [];
	for(var key in data.groups){
		if ((data.groups[key].nodes).indexOf(node.id)>-1)
			groups.push(data.groups[key].name);
	}
	var strgroups = groups.join(', ')
	return strgroups;
}


//displays the node information
function showNodeInfo(data, groups){
	accordion("node");
	$("#node-name").text(data.first+ " "+ data.last);
	$("#node-bdate").text(data.birth);
	$("#node-ddate").text(data.death);
	$("#node-significance").text(data.occupation);
	$("#node-group").text(groups);
	var d = new Date();
	$("#node-cite").text( data.first+ " "+ data.last + " Network Visualization. \n Six Degrees of Francis Bacon: Reassembling the Early Modern Social Network. Gen. eds. Daniel Shore and Christopher Warren. "+d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear()+" <http://sixdegreesoffrancisbacon.com/>");
	$("#node-DNBlink").attr("href", "http://www.oxforddnb.com/view/article/"+data.id);
	$("#node-GoogleLink").attr("href", "http://www.google.com/search?q="+data.first+"+"+ data.last);
}


// displays the network of two nodes
function showTwoNodes(id1, id2, data, options, confidence, highlighted) {
	
	if(confidence===3){
		confidence=2
	}
	

	if (id1 === id2) {
		alert("You have selected the same person twice. \n Please try again...");
		return;
	}

	$('figure').html('');
	var G = jsnx.Graph();
	var edges = [];
	var p1 = data.nodes[id1];
	var p2 = data.nodes[id2];
	var tableview = [];

	// console.log(confidence);
	// console.log(p1);
	// console.log(p2);
	var selected = highlighted; 
	var highlight = false;
	if (selected.length!==0){
		console.log("special selection");
		var sedge = [];
		highlight=true;
	}
	
	

	var p1_1 = [];	//nodes connection to p1 by one edge
	var p2_1 = []; // nodes connecting to p2 by one edge
	for (var i = 2; i >= confidence; i --) { // change confidence after db/bucket change
		p1_1= p1_1.concat(p1.edges[i]);
		p2_1= p2_1.concat(p2.edges[i]);	
	}

	p1_1 = nodupSort(p1_1);
	p2_1 = nodupSort(p2_1);

	var p1_2 = [];// nodes connected to p1_1 (all nodes 2 away from p1)
	var p2_2 = [];// nodes connected to p2_1  (all nodes 2 away from p2)

	for (var i = 0; i < p1_1.length; i ++) {
		for(var j = 2; j >= confidence; j --){ // j is confidence
			var p1edges = data.nodes[p1_1[i]].edges[j];
			p1edges.forEach( function(p1edge){
				//p1_2.push([p1_1[i], p1edge]);
				p1_2.push({"source":p1_1[i], "edge":p1edge});
			}); 
		}		
	}
	for (var i = 0; i < p2_1.length; i ++) {
		for(var j = 2; j >= confidence; j --){// j is confidence
			var p2edges = data.nodes[p2_1[i]].edges[j];
			p2edges.forEach( function(p2edge){
				//p1_2.push([p2_1[i], p2edge]);
				p2_2.push({"source":p2_1[i], "edge":p2edge});

			}); 
		}		
	}


	//one edge 
	if(p2_1.indexOf(p2.id)>=0){
		edges.push([p1.label, p2.label]);
		tableview.push({ "network": p1.label+", "+ p2.label })
	}
	

	//two edge
	p1_1.forEach(function (edge){
		if (p2_1.indexOf(edge) >= 0) {

			var label = data.nodes[edge].label;
			if(!highlight){
				G.add_node(label);
			}
			edges.push([p1.label, label]);
			edges.push([p2.label, label]);
			tableview.push({ "network": p1.label+", "+label+", "+ p2.label } )

			//tableview.push([p1.label+", "+label+", "+ p2.label])
			if(highlight){
				var allnodes=true;
				selected.forEach(function (node){
					//console.log(node+" " +label);
					if (node!==label){
						allnodes=false
					}
				});
				if(allnodes){
					G.add_node(label);
					sedges.push([p1.label, label]);
					sedges.push([p2.label, label]);
				}
		
			}
		}
	});

	//three edge
	p1_1.forEach(function (edge){
		p2_2.forEach(function (pair2){
			if (edge===pair2["edge"]) {

				var label = data.nodes[edge].label;
				var s2 = data.nodes[pair2["source"]].label;

				if( (p1.label!=s2) && (p2.label!=label)){

					if(!highlight){
						G.add_node(label);
					}
					edges.push([label, p1.label]);
					edges.push([s2, label]);
					edges.push([s2, p2.label]);
					tableview.push({ "network":p1.label+", "+label+", "+s2+", "+ p2.label})
					//tableview.push([p1.label+", "+label+", "+s2+", "+ p2.label])

					if(highlight) {//&& (((selected.indexOf(label)>=0)) || (selected.indexOf(s2)>=0) )
						var allnodes=true;
		                selected.forEach(function (node){
		                	//console.log(node+" " +label + " " + s2);
		                    if (node!==label && node!==s2){
		                        allnodes=false
		                    }
		                });
		                if(allnodes){
			                G.add_node(label);
							sedge.push([label, p1.label]);
							sedge.push([s2, label]);
							sedge.push([s2, p2.label]);
		                }
					
					}
				}
			}
		});
	});

	// four edge
	p1_2.forEach(function (pair1){
		p2_2.forEach(function (pair2){
			if (pair1["edge"]===pair2["edge"]) {

				var label = data.nodes[pair2["edge"]].label;
				var s1 = data.nodes[pair1["source"]].label;
				var s2 = data.nodes[pair2["source"]].label;

				if((p1.label!=s2) && (p1.label!=label) &&(p2.label!=label) && (s1!=s2)&& (p2.label!=s1)){

					if(!highlight){
						G.add_node(label);
					}
					edges.push([s1, label]);
					edges.push([s2, label]);
					edges.push([s1, p1.label]);
					edges.push([s2, p2.label]);
					//tableview.push([p1.label+", "+s1+", "+label+", "+s2+", "+ p2.label]);
					tableview.push({ "network":p1.label+", "+s1+", "+label+", "+s2+", "+ p2.label});
					if(highlight) { //  && ( (selected.indexOf(label)>=0) || (selected.indexOf(s1)>=0) || (selected.indexOf(s2)>=0) )
					    var allnodes=true;
		                selected.forEach(function (node){
		                	//console.log(node+" " +label + " " + s1 + " " + s2);
		                    if (node!==label && node!==s1 && node!==s2){
		                        allnodes=false
		                    }
		                });
		                if(allnodes){
		                    G.add_node(label);
							sedge.push([s1, label]);
							sedge.push([s2, label]);
							sedge.push([s1, p1.label]);
							sedge.push([s2, p2.label]);
		                }
					}
				}
			}
		});
	});



	if (highlight){
		G.add_nodes_from([p1.label, p2.label], { radius: 25 });
		G.add_edges_from(sedge);
		jsnx.draw(G, options);
	}
	else{
		G.add_nodes_from([p1.label, p2.label], { radius: 25 });
		G.add_edges_from(edges);
		jsnx.draw(G, options);	
	}


	d3.selectAll('.node').on('click', function (d) {
		// if(! $(d3.select(this.firstChild)).hasClass("node-selected") ) {
		// 	$(d3.select(this.firstChild).firstChild).addClass("node-selected");
		// } else {
		// 	$(d3.select(this.firstChild)).removeClass("node-selected");
		// }

		//console.log(this);
		//console.log($(this).children().eq(1).text());

		var nclick= $(this).children().eq(1).text();
		if (nclick != p1.label && nclick != p2.label){
			var index = selected.indexOf(nclick);
			if(index>-1){
			
					selected.splice(index,1);
			}
			else{
				selected.push(nclick);
			}
			console.log(selected);
		}

		//display()
		showTwoNodes(id1, id2, data, options, confidence, selected); 
	});


	//console.log(sharednetworkmenu);		
	// $("#tableview").css('display','block')
	if ($("#check-shared").is(":checked")){
		var title = "Common network between " + p1.label + " and  " + p2.label ;
		writeNodeTable(tableview, title);

	}

	// $("#showNetworkTable").click(function(){

	// });

	// $("#showNetworkNodes").click(function(){
	// 	jsnx.draw(G, options);	
	// });


	$("#results").html("Common network between <b>" + p1.label  + "</b> and <b>" +  p2.label + "</b>");
	$("#two").val('');
	$("#two").typeahead('setQuery', '');
	$("#three").val('');
	$("#three").typeahead('setQuery', '');
}

function nodupSort(array){

    var sorted_arr = array.sort(function(a,b){return a-b});
    var no_dup=[];
    for (var i = 0; i < array.length - 1; i++) {
        if (sorted_arr[i + 1] != sorted_arr[i]) {
            no_dup.push(sorted_arr[i]);
        }
    }
    return no_dup;
}

function showOneGroup(group, data) {
	var g = data.groups_names[group];
	var results = [];
	g.nodes.forEach(function (node) {	
		results.push(data.nodes[node]);
	});
	var title = "People who belong to the <b>" + group + "</b> group";
	writeTableWith(results, title);
	$("#results").html(title);
	$("#four").val('');
	$("#four").typeahead('setQuery', '');
	$("#five").val('');
	$("#five").typeahead('setQuery', '');
	$("#six").val('');
	$("#six").typeahead('setQuery', '');
}

// Display the intersections between group1 and group2
function findInterGroup(group1, group2, data) {
	var g1 = data.groups_names[group1];
	var g2 = data.groups_names[group2];
	var common = [];
	g1.nodes.forEach(function (node) {
		if (g2.nodes.indexOf(node) >= 0) {
			common.push(data.nodes[node]);
		}
	});
	var title = "Intersection between <b>" + group1 + "</b> and <b>" + group2 + "</b>";
	writeTableWith(common, title);
	$("#results").html(title);
}

// Create the table container
function writeTableWith(dataSource, title){
    $('figure').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');
    $('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 100,
        'aaData': dataSource,
        'aoColumns': [
            {'mDataProp': 'first', 'sTitle': 'First Name'},
            {'mDataProp': 'last', 'sTitle': 'Last Name'},
            {'mDataProp': 'birth', 'sTitle': 'Birth Date'},
            {'mDataProp': 'death', 'sTitle': 'Death Date'},
            {'mDataProp': 'occupation', 'sTitle': 'Historical Significance'}
        ],
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
        }
    });
    downloadData(dataSource, title);
};

function writeNodeTable(dataSource, title){
	//console.log(dataSource);
    $('figure').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');
    $('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 100,
        'aaData': dataSource,
        'aoColumns': [
            {'mDataProp': 'network', 'sTitle': 'Network'},
        ],
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
        }
    });
    //downloadData(dataSource, title);
};

// Define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

function downloadData(data, title) {
	var result = title + " \n" + 'First Name,Last Name,Birth Date,Death Date,Historical Significance' + "\n";
	data.forEach(function (cell) {
		result += cell["first"] + ',' + cell["last"] + ',' + cell["birth"] + ',' + cell["death"] + ',' + cell["occupation"] + "\n";
	});
	var dwnbtn = $('<a href="data:text/csv;charset=utf-8,' + encodeURIComponent(result) + ' "download="' + title + '.csv"><div id="download"></div></a>');
	$(dwnbtn).appendTo('figure');
}

function getAnnotation(id1, id2,data) {
	// var k = Math.ceil((p.id + 1) / 250) / 10;
	// var key = keys['edges' + Math.ceil(k)];
	console.log(id1 + ' ' + id2);
	Tabletop.init({
		key: keys.annot,
		query: 'source= ' + id1 + ' and target= ' + id2,
		simpleSheet: true,
		callback: function(result) {
			result.forEach(function (row){
				accordion("edge");			
				$("#edge-source").html(data.nodes[id1].first +" "+data.nodes[id1].last);
				$("#edge-target").html(data.nodes[id2].first+" "+data.nodes[id2].last);
				$("#edge-confidence").html(getConfidence(row.confidence));
				$("#edge-annotation").html(row.annotation);
				return true;
			});
		}
	});
}

function getConfidence(c) {
	if (c<0.2) 		return "Very Unlikely";
	else if(c<0.4) 	return "Unlikey";
	else if(c<0.6) 	return "Possible";
	else if(c<0.8) 	return "Likely";
	else 			return "Certain";
}