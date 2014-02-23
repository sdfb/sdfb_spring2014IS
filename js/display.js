document.addEventListener('DOMContentLoaded', function () {
	var key = "0AhtG6Yl2-hiRdHpTZFIwM1dBZDY5ZUYxR3FISGRkd2c"
	Tabletop.init({
		key: key,
		callback: init
	})
});

function node() {
	this.id = null; 	// Person ID 			>> 1
	this.label = null;	// SHOULD BE First Last (Birth) BUT FOR NOW IT RETURNS ID
	this.name = null;	// First Last 			>> Sama Kanbour
	this.life = null; 	// (Birth - Death)		>> (1992-2040)
}

// TODO
function initGroups(nodes, groups) {
	//groups.forEach(function (row) {
	// row.id should return the id of the person
	// row.group should retunr the name of the group, for examples Puritans 
	// })

	// nodes[1] returns info about person with ID 1.
	// For instance, you can get the name of person 1 by doing nodes[1].name
	// which should return 'Sama Kanbour'.

	// attach functions to the search features

	// $("#findonegroup").click(function () {
	// 		showOneGroup(...);
	// });
}

// TODO
function showOneGroup(group, data) {

}

// TODO
function showTwoGroups(group1, group2, data) {

}


// Create a dictionnary of nodes and edges to speed up the search
function init(result) {
	var data = {
		nodes: {},
		edges: {}
	}
	result.nodes.elements.forEach(function (row) {
		var n = new node();
		n.id = row.id;
		n.name = row.first + ' ' + row.last;
		n.life = row.birth + '-' + row.death;
		// n.label = n.name + ' (' + row.birth + ')';
		n.label = row.id;
		data.nodes[n.id] = n;
	});
	result.edges.elements.forEach(function (row) {
		if (row.source in data.edges) {
			data.edges[row.source][row.target] = {};
		}
		if (!(row.source in data.edges)) {
			data.edges[row.source] = {};
			data.edges[row.source][row.target] = {};
		}
		if (row.target in data.edges) {
			data.edges[row.target][row.source] = {};
		}
		if (!(row.target in data.edges)) {
			data.edges[row.target] = {};
			data.edges[row.target][row.source] = {};
		}
	});
	initGraph(data);
	initGroups(data.nodes, result.groups.elements);
}

// Populate the suggested drop-down menus
// Make the buttons in the search panel functional
function initGraph(data){
	$('#one').typeahead({
		local: Object.keys(data.nodes).sort()
	});
	$('#two').typeahead({
		local: Object.keys(data.nodes).sort()
	});
	$('#three').typeahead({
		local: Object.keys(data.nodes).sort()
	});

	var color = d3.scale.category20();
	var options = {
		element: 'figure',
		with_labels: true,
		layout_attr: {
			charge: -400,
			linkDistance: 80
		},
		pan_zoom: {
			enabled: false
		},
		node_attr: {
			r: 20,
			title: function (d) {
				return d.label;
			}
		},
		node_style: {
			fill: function (d) {
				return color(d.data.group);
			},
			stroke: 'none'
		},
		edge_style: {
			fill: '#999'
		},
		label_style: {
			fill: '#fff'
		}
	}

	$("#findonenode").click(function () {
		if ($("#one").val()) {
			showOneNode($("#one").val(), data, options);
		}
	});

	$("#findtwonode").click(function () {
		if ($("#two").val() && $("#three").val()) {
			showTwoNodes($("#two").val(), $("#three").val(), data, options);
		}
	});
}

function showOneNode(parent, data, options) {
	var G = jsnx.Graph();
	var edges = [];
	var p = data.nodes[parent].label;
	var fnodes = [];
	var snodes = [];
	for (var first in data.edges[parent]) {
		var f = data.nodes[first].label;
		fnodes.push(f);
		edges.push([p, f]);
		for (var second in data.edges[first]) {
			var s = data.nodes[second].label;
			snodes.push(s);
			edges.push([f, s]);
		}
	}
	G.add_nodes_from(snodes, {
		group: 2
	});
	G.add_nodes_from(fnodes, {
		group: 1
	});
	G.add_nodes_from([p], {
		group: 0
	});
	G.add_edges_from(edges);
	jsnx.draw(G, options);
	$("#one").val('');
	$("#one").typeahead('setQuery', '');
	d3.selectAll('.node').on('click', function (d) {
		if (d3.event.ctrlKey) {
			showOneNode(d.node, data, options);
		}
	});
}

function showTwoNodes(person1, person2, data, options) {
	var G = jsnx.Graph();
	var edges = [];
	var p1 = data.nodes[person1].label;
	var p2 = data.nodes[person2].label;
	var n1 = [p1];
	var n2 = [p2];
	for (var child in data.edges[person1]) {
		var c = data.nodes[child].label;
		n1.push(c);
		edges.push([p1, c]);
	}
	for (var child in data.edges[person2]) {
		var c = data.nodes[child].label;
		n2.push(c);
		edges.push([p2, c]);
	}
	G.add_nodes_from(n1, {
		group: 1
	});
	G.add_nodes_from(n2, {
		group: 2
	});
	G.add_edges_from(edges);
	jsnx.draw(G, options);
	$("#two").val('');
	$("#two").typeahead('setQuery', '');
	$("#three").val('');
	$("#three").typeahead('setQuery', '');
}