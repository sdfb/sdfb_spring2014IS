var keys = {
	0: 	"0AhtG6Yl2-hiRdHpTZFIwM1dBZDY5ZUYxR3FISGRkd2c",
	1: 	"0AhtG6Yl2-hiRdG1hQVBPejQxb3BVUktMeVp1ZUQ2d0E"
}

var rand = true;
var Gtemp;

document.addEventListener('DOMContentLoaded', function () {
	Tabletop.init({
		key: keys[0],
		callback: init
	});
});

function node() {
	this.id = null;
	this.first = null;
	this.last = null;
	this.birth = null;
	this.life = null;
	this.label = null;
}

// TODO
function initGroups(nodes) {

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
		n.first = row.first;
		n.last = row.last;
		n.birth = row.birth; 
		n.life = row.birth + '-' + row.death;
		if (row.birth < 10) {
			n.label = row.first + ' ' + row.last + ' (160' + row.birth + ')';
		} else {
			n.label = row.first + ' ' + row.last + ' (16' + row.birth + ')';
		}
		data.nodes[n.id] = n;
		data.labels[n.label] = n;
	});
	initGraph(data);
	initGroups(data.nodes);
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
	$('#entry_768090773').typeahead({
		local: Object.keys(data.labels).sort()
	});
	$('#entry_1321382891').typeahead({
		local: Object.keys(data.labels).sort()
	});

	var color = d3.scale.category20();
	var options = {
		element: 'figure',
		with_labels: true,
		weighted: true,
		layout_attr: {
			charge: -400,
			linkDistance: 120
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
			fill: '#999',
			'stroke-width': 5
		},
		label_style: {
			fill: '#222',
			cursor: 'pointer',
			'font-size': '0.7em'
		}
	}

	showRandomNode(data, options);

	$("#findonenode").click(function () {
		if ($("#one").val()) {
			rand = false;
			Pace.restart();
			showOneNode($("#one").val(), data, options);
		}
	});

	$("#findtwonode").click(function () {
		if ($("#two").val() && $("#three").val()) {
			rand = false;
			Pace.restart();
			showTwoNodes($("#two").val(), $("#three").val(), data, options);
		}
	});

	$("#findtwonodetable").click(function () {
		if ($("#two").val() && $("#three").val()) {
			rand = false;
			Pace.restart();
			showTable($("#two").val(), $("#three").val(), data);
		}
	});

	$('#submitnode').click(function(){
		rand = false;
		var node = $('#entry_1804360896').val() + ' ' + $('#entry_754797571').val() + ' (' + $('#entry_524366257').val() + ')';
		$('section').css('display','none');
		$('#addedgeform').css('display','block');
		$('#entry_768090773').val(node);
		Gtemp = jsnx.Graph();
		Gtemp.add_nodes_from([node], {
			group: 0
		});
		jsnx.draw(Gtemp, options, true);	
	});

	$('#submitedge').click(function(){
		rand = false;
		var source = $('#entry_768090773').val();
		var target = $('#entry_1321382891').val();
		Gtemp.add_nodes_from([target], {
			group: 1
		});
		Gtemp.add_edges_from([[source, target]]);
	});


}

function showRandomNode(data, options){
	var parent = data.nodes[Math.floor((Math.random()*9999))].label;
	showOneNode(parent, data, options, true);
	if (rand) {
		setTimeout(function(){
			showRandomNode(data, options)
		}, 20000);
	}
}

function showOneNode(parent, data, options, random) {
	var G = jsnx.Graph();
	var p = data.labels[parent];
	var edges = [];
	var fnodes = [];
	// var key = keys[Math.ceil((p.id + 1) / 1000)];
	var key = keys[1];
	Tabletop.init({
		key: key,
		simpleSheet: true,
		query: 'source = ' + p.id,
		callback: function(result) {
			result.forEach(function (edge){
				var f = data.nodes[edge.target];
				fnodes.push(f.label);
				edges.push([p.label, f.label, {weight: edge.confidence}]);
			});
			G.add_nodes_from(fnodes, {
				group: 1
			});
			G.add_nodes_from([p.label], {
				group: 0
			});
			G.add_edges_from(edges);
			if (random) {
				if (rand) {
					jsnx.draw(G, options);
				}
			} else {
				$('figure').html('');
				jsnx.draw(G, options);
				$("#one").val('');
				$("#one").typeahead('setQuery', '');
			}
			d3.selectAll('.node').on('click', function (d) {
				if (d3.event.ctrlKey) {
					showOneNode(d.node, data, options);
				}
			});
		}
	});
}

function showTwoNodes(person1, person2, data, options) {
	$('figure').html('');
	var G = jsnx.Graph();
	var edges = [];
	var p1 = data.labels[person1];
	var p2 = data.labels[person2];
	var n1 = [];
	var key1 = keys[1];
	var key2 = keys[1];

	Tabletop.init({
		key: key1,
		simpleSheet: true,
		query: 'source = ' + p1.id,
		callback: function(result) {
			result.forEach(function (row){
				n1.push(row.target);
			});
			Tabletop.init({
				key: key2,
				simpleSheet: true,
				query: 'source = ' + p2.id,
				callback: function(result) {
					result.forEach(function (row){
						if (n1.indexOf(row.target) >= 0) {
							var label = data.nodes[row.target].label;
							G.add_nodes_from([label], { group: 0 });
							edges.push([p1.label, label]);
							edges.push([p2.label, label]);
						}
					});
					G.add_nodes_from([p1.label, p2.label], { group: 1 });
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

function showTable(person1, person2, data) {
	$('figure').html('');
	var p1 = data.labels[person1];
	var p2 = data.labels[person2];
	var n1 = [];
	var common = [];
	var key1 = keys[1];
	var key2 = keys[1];

	Tabletop.init({
		key: key1,
		simpleSheet: true,
		query: 'source = ' + p1.id,
		callback: function(result) {
			result.forEach(function (row){
				n1.push(row.target);
			});
			Tabletop.init({
				key: key2,
				simpleSheet: true,
				query: 'source = ' + p2.id,
				callback: function(result) {
					result.forEach(function (row){
						if (n1.indexOf(row.target) >= 0) {
							common.push(data.nodes[row.target]);
						}
					});
					writeTableWith(common);
				}
			});
		}
	});
	$("#two").val('');
	$("#two").typeahead('setQuery', '');
	$("#three").val('');
	$("#three").typeahead('setQuery', '');
}

// create the table container and object
function writeTableWith(dataSource){
    $('figure').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');
    $('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 10,
        'aaData': dataSource,
        'aoColumns': [
            {'mDataProp': 'first', 'sTitle': 'First Name'},
            {'mDataProp': 'last', 'sTitle': 'Last Name'},
            {'mDataProp': 'birth', 'sTitle': 'Birth Date'}
        ],
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
        }
    });
};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};