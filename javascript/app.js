var hname = [];
var hotel_id = [];
var hotel = [];
var rating = ["Hotel Name"];
var id = [];
let user;
let ty = '';
let state = true;
let tableBody = '';
function parseData(createGraph) {
	Papa.parse("../data/ratings_small.csv", {
		download: true,
		complete: function (results) {
			createGraph(results.data);
		}
	});
}

function getbook() {
	Papa.parse("../data/hotel123.csv", {
		download: true,
		complete: function (results) {
			get(results.data);
		}
	});
}
function get(info) {
	for (var k = 0; k < hotel_id.length; k++) {
		for (var j = 1; j < info.length; j++) {
			if (info[j][0] == hotel_id[k]) {
				hname[k] = new Array(3);
				hname[k][0] = info[j][0];
				hname[k][1] = info[j][1];
				hname[k][2] = info[j][2];
				hname[k][3] = info[j][3];
				hname[k][4] = info[j][4];
				hname[k][5] = info[j][5];
			}
		}
	}
	console.log(hname);
	table();
}

function createGraph(data) {
	console.log(data);
	for (var i = 1; i < data.length; i++) {
		if (data[i][0] == user) {
			id.push(data[i][0]);
			hotel_id.push(data[i][1]);
			rating.push(data[i][2]);
			hotel.push(data[i][3]);
			
		}
		else {
			continue;
		}
	}
	getbook();
	console.log(id, hotel_id, rating, hname);
	var chart = c3.generate({
		bindto: '#chart',
		data: {
			columns: [
				rating
			],

			type: ty
		},
		axis: {
			x: {
				type: 'category',
				categories: hotel,
				tick: {
					multiline: false,
					culling: {
						max: 12
					}
				}
			}
		},
		bar: {
			width: {
				ratio: 0.5
			}
		},
		zoom: {
			enabled: true
		},
		legend: {
			position: 'bottom'
		}
	});
}


function gradeTable(hname) {

	const tableHead = `
		<table >
			<thead>
				<tr class='highlight-row'>
					<th>Hotel Name</th>
					<th>Property Type</th>
					<th>Room Type</th>
					<th>Contact No.</th>
					<th>City</th>
				</tr>
			</thead>
			<tbody>
	`;

	const tableFoot = `
			</tbody>
		</table>
	`;

	for (let i = 0; i < hname.length; i += 1) {

		let hotel_name = hname[i][1];
		let hotel_type = hname[i][2];
		let room_type = hname[i][3];
		let phone_no = hname[i][4];
		let city = hname[i][5];
		tableBody += `
			<tr>
				<td>${hotel_name}</td>
				<td>${hotel_type}</td>
				<td>${room_type}</td>
				<td>${phone_no}</td>
				<td>${city}</td>
			</tr>
		`
	}

	return tableHead + tableBody + tableFoot;
}
function table() {
	document.querySelector('.tab')
		.insertAdjacentHTML(
			'afterbegin',
			gradeTable(hname)
		)
}

function processForm() {
	var val = location.search.substring(1).split("&");
	var temp = val[0].split("=");
	user = unescape(temp[1]);
	if (user > 0 && user <=5) {
		parseData(createGraph);
	} else {
		alert("Enter number between 1-5");
		window.location.href = "index.html";
	}
}
if (state) {
	processForm();
}

function graphdisplay() {

	ty = '';
	document.getElementById("grp").value = "Line Chart";

	state = false;
	hname = [];
	hotel_id = [];
	rating = ["ratings"];
	id = [];
	tableBody = '';
	document.querySelector('.tab').innerHTML = "";
	parseData(createGraph);

}
