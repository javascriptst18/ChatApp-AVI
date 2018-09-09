import React, { Component } from "react";
import moment from "moment";
import "./Calendar.css";

class Calendar extends Component {
  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
    selectedDay: null
  };

  // Using the moment calender function
  // This library makes it easier for coders to not waste time on the hardcode instead of the functionality
  weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
  weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  months = moment.months();

  // create arrow function which will return the current year from "dateContext"
  // year function will render current year from the state
  year = () => {
    return this.state.dateContext.format("Y");
  };

  // I will use the moment library throughout the application
  // same goes with month render current month from the state which comes from the moment library
  month = () => {
    return this.state.dateContext.format("MMMM");
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  currentDate = () => {
    console.log("currentDate: ", this.state.dateContext.get("date"));
    return this.state.dateContext.get("date");
  };
  currentDay = () => {
    return this.state.dateContext.format("D");
  };

  // Getting a value between 0-6 where 0 is sunday and so on
  // this function will be useful when start rendering the calendar
  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext)
      .startOf("month")
      // this will tell me how many blank space to leace when rendering calendar
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };

  render() {
    // Map the weekdays i.e Sun, Mon, Tue etc as <td>
    // weekdays short was created above which we took from moment.js
    let weekdays = this.weekdaysShort.map(day => {
      return (
        // for every day we are creating a table data
        // give it a key so that we wont get key error
        <td key={day} className="week-day">
          {day}
        </td>
      );
    });
    // creating empty slots
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="emptySlots">{""}</td>);
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = d === this.currentDay() ? "day current-day" : "day";
      daysInMonth.push(
        <td key={d} className={className}>
          <span>{d} </span>
        </td>
      );
    }
    console.log("days:", daysInMonth);

    const totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      }
    });
    let trElems = [];

    return (
      <div className="calendar-container" style={this.style}>
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td colSpan="5">
                <this.MonthNav /> <this.YearNav />
              </td>
              <td colSpan="2" className="nav-month">
                <i
                  className="prev fa fa-fw fa-chevron-left"
                  onClick={e => {
                    this.prevMonth();
                  }}
                />
                <i
                  className="prev fa fa-fw fa-chevron-right"
                  onClick={e => {
                    this.nextMonth();
                  }}
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>{weekdays}</tr>
            {trElems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
