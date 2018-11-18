export const getLineChartData = chartData => {
  return {
    labels: chartData.labels,
    datasets: [
      {
        label: 'New Tickets',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(54, 162, 235, 1)',
        pointColor: 'rgba(54, 162, 235, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(197, 217, 249, 0.2)',
        borderColor: 'rgb(126, 168, 234)',
        data: chartData.created
      },
      {
        label: 'Pending Tickets',
        fillColor: 'rgba(153, 102, 255, 0.2)',
        strokeColor: 'rgba(153, 102, 255, 1)',
        pointColor: 'rgba(153, 102, 255, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        data: chartData.pending
      },
      {
        label: 'Completed Tickets',
        fillColor: 'rgba(255, 159, 64, 0.2)',
        strokeColor: 'rgba(255, 159, 64, 1)',
        pointColor: 'rgba(255, 159, 64, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(255, 159, 64, 1)',
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        data: chartData.completed
      },
      {
        label: 'Verified Tickets',
        fillColor: 'rgba(75, 192, 192, 0.2)',
        strokeColor: 'rgba(75, 192, 192,1)',
        pointColor: 'rgba(75, 192, 192, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: chartData.verified
      }
    ]
  }
}

export const getBarChartData = chartData => {
  return {
    labels: chartData.labels,
    datasets: [
      {
        label: 'New Tickets',
        data: chartData.created, // data with status 1
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Pending Tickets',
        data: chartData.pending, // data with status  3
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Completed Tickets',
        data: chartData.completed, // data with status 4
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Verified Tickets',
        data: chartData.verified, // data with status 5
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 2
      }
    ]
  }
}

export const getChartOptions = (chartData, lineChart) => {
  const maxYax = Math.max(
    Math.max(...chartData.created),
    Math.max(...chartData.pending),
    Math.max(...chartData.completed),
    Math.max(...chartData.verified)
  )
  if (lineChart) {
    return {
      scaleShowGridLines: true,
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      pointHitRadius: 10,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate:
        '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: chartData.created.length ? (maxYax < 10 ? 10 : maxYax) : 10
            }
          }
        ]
      }
    }
  } else {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: chartData.created.length ? (maxYax < 10 ? 10 : maxYax) : 10
            }
          }
        ]
      }
    }
  }
}
