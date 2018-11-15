import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "./Input";
import LotView from "./LotView";

class AppView extends Component {
  constructor() {
    super();
    this.state = {
      title: "LiveLot-CSM"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.id]: event.target.value,
      title: event.target.value
    });
  }
  // Lots = new Array()
  // Lots = [
  //   {name: "K", num: 67},
  //   {name: "D", num: 43},
  //   {name: "M", num: 42},
  //   {name: "Q", num: 10},
  //   {name: "CT", num:22},
  //   {name: "I", num: 33}
  // ]

  // LotViews = Lots.map((lot) => {
  //   <LotView
  //       key={lot.name}
  //       name={lot.name}
  //       num={lot.num}
  //     />
  // })

  render() {

    return (
      <div>
        <h2 className="pp-title">{this.state.title}</h2>
        <div className="pp-lot-header row">
        <div className="col-sm-4"> Lot Name </div>
        <div className="col-sm-8"> Spots Available</div>
    </div>
        <LotView
          key={"K"}
          name={"K"}
          num={67}
        />
        <LotView
          key={"D"}
          name={"D"}
          num={43}
        />
        <LotView
          key={"M"}
          name={"M"}
          num={42}
        />
        <LotView
          key={"Q"}
          name={"Q"}
          num={10}
        />
        <LotView
          key={"CT"}
          name={"CT"}
          num={22}
        />
        <LotView
          key={"I"}
          name={"I"}
          num={33}
        />
      </div>
    );
  }
}
export default AppView;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppView />, wrapper) : false;
