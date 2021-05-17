import React, { useEffect, useState } from "react";
import { Line, Chart } from "react-chartjs-2";
import axios from 'axios';
import API from "../../utils/API";
import surveyAPI from "../../utils/surveyAPI";

function LineChart() {
  const [hours, setHours] = useState([]);
  const [dates, setDates] = useState([]);


  useEffect(() => {
    getChartData();
  }, [])

  //need to comment out process.env.MONGODB_URI in server.js to use seed data.
  function getChartData() {
    let hoursArray = []
    let dateArray = [];

    surveyAPI.getSurveys()
    .then(res => {
      console.log(res.data)

      let data = res.data

      data.forEach(entry => {
        let date = entry.date
        let newDate = new Date(date).toLocaleDateString()
        dateArray.push(newDate)
        hoursArray.push(entry.hoursslept)
      })

      console.log(hoursArray)
      setHours(hoursArray);
      setDates(dateArray)
    })
      .catch(err => console.log(err));
  }

  
const data = 
{ 
  labels: dates,
  datasets: [
    {
      label: "Hours Slept",
      data: hours,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    
  
    // {
    //   label: "Second dataset",
    //   data: wakeUp,
    //   fill: false,
    //   borderColor: "#742774"
    // }
  ],
  
};

//attempts to customize

// const testLine = new Chart (React.createRef(), {
//   type: "line",
//   data: data,
//   options: options,
//   legend: legend,
// })

// const yLabels = {
//   0 : 'newb', 2 : 'codecademy', 4 : 'code-school', 6 : 'bootcamp', 8 : 'junior-dev',
//   10 : 'mid-level', 12 : 'senior-dev', 14 : 'full-stack-dev', 16 : 'famous-speaker',
//   18 : 'unicorn', 20 : 'harambe'
// }

// const options = {
//   scales: {
//       yAxes: [{
//           ticks: {
//               callback: function(value, index, values ) {
//                   // for a value (tick) equals to 8
//                   return yLabels[value];
//                   // 'junior-dev' will be returned instead and displayed on your chart
//               }
//           }
//       }]
//   }
// }
// const legend = {
//   display: true,
//   position: "bottom",
//   labels: {
//     fontColor: "#323130",
//     fontSize: 14
//   }
// };

// const options = {
//   title: {
//     display: true,
//     text: "Chart Title"
//   },
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           suggestedMin: 0,
//           suggestedMax: 100
//         }
//       }
//     ]
//   }
// };
// const options = {
//   scales: {
//     xAxes: [{
//       scaleLabel: {
//         display: true,
//         labelString: 'Years'
//       }
//     }],
//     yAxes: [{
//       ticks: {
//           beginAtZero: true,
//       }
//     }],
//   }     
// }

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Dates"
      }
  },

      y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Hours"
          }
      }
    }
  }


  return (
    <div style={{ backgroundColor: "white" }}>
     
      <Line data={ data } options={ options }/>
      
    </div>
  );
}


export default LineChart