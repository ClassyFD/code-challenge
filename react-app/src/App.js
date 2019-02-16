/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import './App.css'
import axios from 'axios';

const GIT_USER = 'dhh'
const GIT_USER_URL = `https://api.github.com/users/${GIT_USER}/events`

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: undefined,
    }
  }

  handleClick = (event) => {
    axios.get(GIT_USER_URL).then((response)=>{
      const data = response.data;
      let points = 0;
      const typeNames = {
        PushEvent: 5,
        PullRequestReviewCommentEvent: 4,
        WatchEvent: 3,
        CreateEvent: 2,
      }

      data.forEach((dataEL)=>{
        const type = dataEL.type;
        points += typeNames[type] || 1;
      })
      this.setState({
        score: points,
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App_score">
          {this.state.score === undefined? 'n/a' : this.state.score}
        </div>
        <button
          onClick={(e)=>this.handleClick(e, GIT_USER_URL)}
          type="button"
          className="App_button"
          children="Get Score"
        />
      </div>
    );
  }
}
