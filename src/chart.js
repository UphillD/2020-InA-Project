/* function createChart
 * Creates a 'mentions per year' chart
 * Utilizes the highcharts module
 * https://www.highcharts.com/
 */
function createChart(query, series) {
	
	Highcharts.chart('container', {

		title: {
			text: "Articles mentioning '" + query + "'",
			margin: 35,
			y: 20,
			style: {
				color: '#FFFFFF',
				fontWeight: 'bold'
			}
		},
		
		subtitle: {
			text: '2000 - 2020',
			style: {
				color: '#FFFFFF'
			}
		},

		yAxis: {
			title: {
				text: null
			},
			labels: {
				style: {
					color: '#C9F0FF',
					fontSize: '11px'
				}
			},
			gridLineColor: '#C9F0FF',
			gridLineDashStyle: 'Dot'
		},
		
		xAxis: {
			labels: {
				style: {
					color: '#C9F0FF',
					fontSize: '11px'
				}
			}
		},

		chart: {
			backgroundColor: '#34495E',
			borderRadius: 10,
			type: 'line'
		},
		legend: {
			enabled: false,
		},

		plotOptions: {
			series: {
				pointStart: 2000
			}
		},

		series: [{
			name: 'Articles',
			data: series,
			color: '#72A98F'
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