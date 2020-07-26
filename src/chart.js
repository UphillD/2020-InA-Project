function createChart(query, series) {
	Highcharts.chart('container', {

		title: {
			text: 'Articles Mentioning ' + query + ', 2000-2020'
		},
		
		subtitle: {
			text: ''
		},

		yAxis: {
			title: {
				text: 'Number of Articles'
			}
		},

		xAxis: {
			accessibility: {
				rangeDescription: 'Range: 2000 to 2020'
			}
		},

		legend: {
			enabled: false,
		},

		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 2000
			}
		},

		series: [{
			name: 'Articles',
			data: series
		}],

		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}

	});
}