var keys = {
	0: 		"0AhtG6Yl2-hiRdHpTZFIwM1dBZDY5ZUYxR3FISGRkd2c",
	250: 	"0AhtG6Yl2-hiRdG1hQVBPejQxb3BVUktMeVp1ZUQ2d0E",
	500: 	"0AhtG6Yl2-hiRdE5raE8wRHlXR2ZqRXpzVExlMWQwa0E",
	750: 	"0AhtG6Yl2-hiRdEI1V3RqNy1iVEdtMm90blJhZ1J1R2c",
	1000: 	"0AhtG6Yl2-hiRdFdhaWJ5b1lQQzVEOENuZHV0d09QVXc",
	1250: 	"0AhtG6Yl2-hiRdFVwd2FWWTF2cENkTjV6cXpvLV9kaGc",
	1500: 	"0AhtG6Yl2-hiRdFcxN3ZpVmVsX0x5ZXNoOVNiam15dXc",
	1750: 	"0AhtG6Yl2-hiRdDZub0ZmdEZhRHN1bktTYlVFa19oZXc",
	2000: 	"0AhtG6Yl2-hiRdEEtX0E2N0lvRk1FQWlTZjBwQ3Vnc1E",
	2250: 	"",
	2500: 	"",
	2750: 	"",
	3000: 	"",
	3250: 	"",
	3500: 	"",
	3750: 	"",
	4000: 	"",
	4250: 	"",
	4500: 	"",
	4750: 	"",
	5000: 	"",
	5250: 	"",
	5500: 	"",
	5750: 	"",
	6000: 	"",
	6250: 	"",
	6500: 	"",
	6750: 	"",
	7000: 	""
}

document.addEventListener('DOMContentLoaded', function () {
	Tabletop.init({
		key: keys[0],
		callback: init
	});
});

function node() {
	this.id = null;
	this.label = null;
	this.name = null;	
	this.life = null; 	
}

// TODO
function initGroups(nodes, groups) {

}

// TODO
function showOneGroup(group, data) {

}

// TODO
function showTwoGroups(group1, group2, data) {

}


// Create a dictionnary of nodes
function init(result) {
	var data = {
		nodes: {},
		labels: {}
	};
	
	result.nodes.elements.forEach(function (row) {
		var n = new node();
		n.id = row.id;
		n.name = row.first + ' ' + row.last;
		n.life = row.birth + '-' + row.death;
		if (row.birth < 10) {
			n.label = n.name + ' (160' + row.birth + ')';
		} else {
			n.label = n.name + ' (16' + row.birth + ')';
		}
		data.nodes[n.id] = n;
		data.labels[n.label] = n;
	});

	initGraph(data);
	initGroups(data.nodes, result.groups.elements);
}

// Populate the suggested drop-down menus
// Make the buttons in the search panel functional
function initGraph(data){
	$('#one').typeahead({
		local: Object.keys(data.labels).sort()
	});
	$('#two').typeahead({
		local: Object.keys(data.labels).sort()
	});
	$('#three').typeahead({
		local: Object.keys(data.labels).sort()
	});

	var color = d3.scale.category20();
	var options = {
		element: 'figure',
		with_labels: true,
		layout_attr: {
			charge: -400,
			linkDistance: 120
		},
		pan_zoom: {
			enabled: false
		},
		node_attr: {
			r: 5,
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
			fill: '#222',
			cursor: 'pointer',
			'font-size': '0.7em'
		}
	}

	$("#findonenode").click(function () {
		if ($("#one").val()) {
			Pace.restart();
			showOneNode($("#one").val(), data, options);
		}
	});

	$("#findtwonode").click(function () {
		if ($("#two").val() && $("#three").val()) {
			Pace.restart();
			showTwoNodes($("#two").val(), $("#three").val(), data, options);
		}
	});
}

function showOneNode(parent, data, options) {
	var G = jsnx.Graph();
	var p = data.labels[parent];
	var edges = [];
	var fnodes = [];
	// var key = keys[Math.ceil((p.id + 1) / 1000)];
	var key = keys[250];
	Tabletop.init({
		key: key,
		simpleSheet: true,
		query: 'source = ' + p.id,
		callback: function(result) {
			result.forEach(function (edge){
				var f = data.nodes[edge.target];
				fnodes.push(f.label);
				edges.push([p.label, f.label]);
			});
			G.add_nodes_from(fnodes, {
				group: 1
			});
			G.add_nodes_from([p.label], {
				group: 0
			});
			G.add_edges_from(edges);
			jsnx.draw(G, options);
		}
	});
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
	var p1 = data.labels[person1];
	var p2 = data.labels[person2];
	var n1 = [];
	var n2 = [];
	var key1 = keys[250];
	var key2 = keys[250];
	Tabletop.init({
		key: key1,
		simpleSheet: true,
		query: 'source = ' + p1.id,
		callback: function(result) {
			result.forEach(function (edge){
				var c = data.nodes[edge.target];
				n1.push(c.label);
			});
			Tabletop.init({
				key: key2,
				simpleSheet: true,
				query: 'source = ' + p2.id,
				callback: function(result) {
					result.forEach(function (edge){
						var c = data.nodes[edge.target];
						n2.push(c.label);
					});
					n1.forEach(function (node) {
						if (n2.indexOf(node) != -1) {
							G.add_nodes_from([node], {
								group: 0
							});
							edges.push([p1.label, node]);
							edges.push([p2.label, node]);
						}
						if (node == p2.label) {
							edges.push([p1.label, p2.label]);
						}
					});
					G.add_nodes_from([p1.label, p2.label], {
						group: 1
					});
					G.add_edges_from(edges);
					jsnx.draw(G, options);
				}
			});
		}
	});
	$("#two").val('');
	$("#two").typeahead('setQuery', '');
	$("#three").val('');
	$("#three").typeahead('setQuery', '');
}