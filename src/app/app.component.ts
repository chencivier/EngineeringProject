import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';
highcharts3D(Highcharts);
import Jsondata from '../assets/data/data.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any = Jsondata.experience;
  selectedFile = null;
  title = 'Electrical Engineering Project';
  title1 = 'Experience Collection System App';
  title2 = 'Shir Chen & Shir Civier';
  title3 = 'Prof. Shlomi Arnon';
  lat = this.data[0].GPS[0].lat;
  lng = this.data[0].GPS[1].lng;
  tempChart = [];
  bpmChart = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const tempList: string[] = [];
    const timeList: string[] = [];
    const bpmList: string[] = [];
    this.data.forEach(element => {
      tempList.push(element.Temp);
    });
    this.data.forEach(element => {
      timeList.push(element.time);
  });
  this.data.forEach(element => {
    bpmList.push(element.BPM);
  });
    console.log(bpmList);
    const tempCanvas = <HTMLCanvasElement>document.getElementById('tempCanvas');
    const multiply = {
      beforeDatasetsDraw: function(chart, options, el) {
        chart.ctx.globalCompositeOperation = 'multiply';
      },
      afterDatasetsDraw: function(chart, options) {
        chart.ctx.globalCompositeOperation = 'source-over';
      },
    };
    // Gradient color - this week
const gradientThisWeek = tempCanvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
gradientThisWeek.addColorStop(0, '#5555FF');
gradientThisWeek.addColorStop(1, '#9787FF');

// Gradient color - previous week
const gradientPrevWeek = tempCanvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
gradientPrevWeek.addColorStop(0, '#FF55B8');
gradientPrevWeek.addColorStop(1, '#FF8787');

const config = {
    type: 'line',
    data: {
        labels: timeList,
        datasets: [
          {
              label: 'Temperature',
              data: tempList,
              fill: false,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'transparent',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 3,
              lineTension: 0,
          }
        ]
    },
    options: {
responsive: false,
      elements: {
        point: {
          radius: 6,
          hitRadius: 6,
          hoverRadius: 6
        }
      },
      legend: {
        display: false,
      },
      tooltips: {backgroundColor: 'transparent',
        displayColors: false,
        bodyFontSize: 14,
        callbacks: {
          label: function(tooltipItems, data) {
            return tooltipItems.yLabel + '°C';
          }
        }
      },
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false,
          ticks: {
            beginAtZero: true,
          },
        }]
      }
    },
    plugins: [multiply],
};

this.tempChart = new Chart(tempCanvas, config);


const bpmCanvas = <HTMLCanvasElement>document.getElementById('bpmCanvas');
const bpmMultiply = {
  beforeDatasetsDraw: function(chart, options, el) {
    chart.ctx.globalCompositeOperation = 'multiply';
  },
  afterDatasetsDraw: function(chart, options) {
    chart.ctx.globalCompositeOperation = 'source-over';
  },
};
// Gradient color - this week
const bpmGradientThisWeek = bpmCanvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
bpmGradientThisWeek.addColorStop(0, '#5555FF');
bpmGradientThisWeek.addColorStop(1, '#9787FF');

// Gradient color - previous week
const bpmGradientPrevWeek = bpmCanvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
bpmGradientPrevWeek.addColorStop(0, '#FF55B8');
bpmGradientPrevWeek.addColorStop(1, '#FF8787');

const bpmConfig = {
type: 'line',
data: {
    labels: timeList,
    datasets: [
      {
          data: bpmList,
          fill: false,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: 'transparent',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 3,
          lineTension: 0,
      }
    ]
},
options: {
responsive: false,
  elements: {
    point: {
      radius: 6,
      hitRadius: 6,
      hoverRadius: 6
    }
  },
  legend: {
    display: false,
  },
  tooltips: {backgroundColor: 'transparent',
    displayColors: false,
    bodyFontSize: 14,
    callbacks: {
      label: function(tooltipItems, data) {
        return tooltipItems.yLabel;
      }
    }
  },
  scales: {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false,
      ticks: {
        beginAtZero: true,
      },
    }]
  }
},
plugins: [bpmMultiply],
};

this.bpmChart = new Chart(bpmCanvas, bpmConfig);
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

onFileSelected(event) {
  this.selectedFile = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(this.selectedFile, 'UTF-8');
  fileReader.onload = () => {
   console.log(JSON.parse(fileReader.result.toString()));
   this.selectedFile = JSON.parse(fileReader.result.toString());
  };
  fileReader.onerror = (error) => {
    console.log(error);
  };
}
onUpload() {
  this.data = this.selectedFile.experience;
  this.ngOnInit();
}

}
