import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "./Input";
import LotView from "./LotView";
import AWS from "aws-sdk";
import { resolve } from "url";

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "AKIAI6NSAW6YQJL36SQA",
  secretAccessKey: "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",
});




class AppView extends Component {
  constructor() {
    super();
    this.state = {
      title: "LiveLot-Mines",
      pollingIntervall: 2000,
      lots: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.id]: event.target.value,
      title: event.target.value
    });
  }

  getLotTuple = (params) => {
    return new Promise( (resolve, reject) => {
      const dynamodb = new AWS.DynamoDB.DocumentClient();

      dynamodb.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            reject(err)
        } else {
            // console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            // console.log(data.Item)
            resolve(data.Item)
        }
      });
    })
    
  }


  poll() {


      const polling = setTimeout(() => {
      // stuff here
        // console.log('POLLING')
        var table = "livelot";

        var lotname1 = "CTLM";
        var lotname2 = "D"

        var CTLMparams = {
            TableName: table,
            Key:{
              "lotname": lotname1
            }
        };

        var Dparams = {
          TableName: table,
          Key:{
            "lotname": lotname2 
          }
        };

        this.getLotTuple(CTLMparams)
          .then((lot) => {
            if(this.state.lots[lot.lotname] !== lot.numcars) {
              console.log("CTLM LOT UPDATED")
              let updated_lot = this.state.lots
              updated_lot[lot.lotname] = lot.numcars
              this.setState({
                lots: updated_lot
              })
              // this.state.lots[lot.lotname] = lot.numcars
              // this.forceUpdate()
              // console.log(this.state.lots)
            }
            
            // this.setState({
            //   lots: joined
            // })
          })
          .catch((err) => {
            console.error(err)
          })

        this.getLotTuple(Dparams)
          .then((lot) => {
            if(this.state.lots[lot.lotname] !== lot.numcars) {
              console.log("D LOT UPDATED")
              let updated_lot = this.state.lots
              updated_lot[lot.lotname] = lot.numcars
              this.setState({
                lots: updated_lot
              })
              // this.state.lots[lot.lotname] = lot.numcars
              // this.forceUpdate()
              // console.log(this.state.lots)
            }
            
          })
          .catch((err) => {
            console.error(err)
          })
          // as last step you should call poll() method again
          // if you have asyncronous code you should not call it
          // as a step of your async flow, as it already is 
          // time period with setTimeout
          this.poll()
    }
      , this.state.pollingIntervall)
    
  }
  /**
   * Need to grab parking lot data
   */
  componentDidMount() {

    console.log('component did mount')
    var table = "livelot";

    var lotname1 = "CTLM";
    var lotname2 = "D"

    var CTLMparams = {
        TableName: table,
        Key:{
          "lotname": lotname1
        }
    };

    var Dparams = {
      TableName: table,
      Key:{
        "lotname": lotname2 
      }
    };

    this.getLotTuple(CTLMparams)
      .then((lot) => {
        let joined = this.state.lots.concat(lot)
        this.setState({
          lots: joined
        })
      })
      .catch((err) => {
        console.error(err)
      })

    this.getLotTuple(Dparams)
      .then((lot) => {
        let joined = this.state.lots.concat(lot)
        this.setState({
          lots: joined
        })
      })
      .catch((err) => {
        console.error(err)
      })

    this.poll()
  }

  render() {
    let lots = this.state.lots  
    // let lots = [ { lotname: "CTLM", numcars: 14 }, { "lotname": "D", "numcars": 5 } ]
    console.log('RENDERED CALLED')
    console.log(lots)
    return (
      <div>
        <h2 className="pp-title">{this.state.title}</h2>
        <div className="pp-lot-header row">
        <div className="col-sm-4"> Lot Name </div>
        <div className="col-sm-8"> Spots Available</div>
      </div>
        { lots.map(lot => 
          <LotView
          key={lot.lotname}
          name={lot.lotname}
          num={lot.numcars}
          />
        )}
      </div>
    );
  }
}
export default AppView;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppView />, wrapper) : false;
