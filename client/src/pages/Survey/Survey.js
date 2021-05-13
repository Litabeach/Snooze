import surveyAPI from "../../utils/surveyAPI";
import React, { useEffect, useState } from 'react';
import MomentUtils from '@date-io/moment';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import Jumbotron from "../../components/Jumbotron";

function Survey() {
    // Setting our component's initial state
    const [survey, setSurveys] = useState([])
    const [selectedDate, handleDateChange] = useState(new Date());
    const [formObject, setFormObject] = useState({
      date: "",
      bedtime: "",
      wakeuptime: "",
      sleepquality: "",
      mood: "",
      notes: "",
    });
    
//date pickers
//time picker for wake up
//time picker for going to sleep


//land on page with date picker
//grey out calendar dates that already have
//call database to get existing sleeps


    var surveyQuestions = [
      {
        question: "How was your quality of sleep?",
        answers: {
          a: "1",
          b: "2",
          c: "3",
          d: "4", 
          e: "5"
        }
      },
      {
        question: "How are you feeling today?",
        answers: {
          a: "1",
          b: "2",
          c: "3", 
          d: "4",
          e: "5" 
        },
      },
      {
        question: "Write any notes about your day that might affect tonight's sleep.",
        answers: "text area", //replace with text area
      },
    ];

    // Load all surveys and store them with setSurveys
    useEffect(() => {
      loadSurveys()
    }, []);
  
    // Loads all surveys and sets them to surveys
    function loadSurveys() {
        surveyAPI.getSurveys()
        .then(res => 
          setSurveys(res.data)
        )
        .catch(err => console.log(err));
    };
    
    // When the form is submitted, use the API.saveSurvey method to save the survey data
    // Then reload surveys from the database
    function handleFormSubmit(event) {
      event.preventDefault();
      if (formObject.date) {
        surveyAPI.saveSurvey({
          date: formObject.date,
          bedtime: formObject.bedtime,
          wakeuptime: formObject.wakeuptime,
          sleepquality: formObject.sleepquality,
          mood: formObject.mood
        })
          .then(() => setFormObject({
            date: "",
            bedtime: "",
            wakeuptime: "",
            sleepquality: "",
            mood: ""
          }))
          .then(() => loadSurveys())
          .catch(err => console.log(err));
      }
    }

    return (

      <Jumbotron>
      <h1>Survey</h1> 
<h2>Select the date</h2>
  <MuiPickersUtilsProvider utils={MomentUtils}>
   <DatePicker value={selectedDate} onChange={handleDateChange} />
   <TimePicker value={selectedDate} onChange={handleDateChange} />
   <DateTimePicker value={selectedDate} onChange={handleDateChange} />
  </MuiPickersUtilsProvider>
  <h2>Question 1</h2>

  <h2>Question 1</h2>

  <h2>Question 1</h2>

  <h2>Question 1</h2>
  <button onClick={handleFormSubmit}>Submit</button>
  </Jumbotron>
    )

}

export default Survey;


      
  
    