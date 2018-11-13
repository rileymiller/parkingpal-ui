import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "./Input";
import LotView from "./LotView";

class AppView extends Component {
  constructor() {
    super();
    this.state = {
      title: "Parking Pal"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.id]: event.target.value,
      title: event.target.value
    });
  }

  render() {
    
    return (
      <div>
        <h2>{this.state.title}</h2>
        <LotView
          name="K"
          num={67}
        />
      </div>
    );
  }
}
export default AppView;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppView />, wrapper) : false;
