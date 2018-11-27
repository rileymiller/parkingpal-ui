import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "./Input";
import LotView from "./LotView";
import AWS from "aws-sdk";
import { resolve } from "url";

AWS.config.update({
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com",
  accessKeyId: "AKIAIFYOEWMP7W4EPBHQ",
  secretAccessKey: "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",
});




class AppView extends Component {
  constructor() {
    super();
    this.state = {
      title: "LiveLot-CSM",
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
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            console.log(data.Item)
            resolve(data.Item)
        }
      });
    })
    
  }

  poll() {


      const polling = setTimeout(() => {
      // stuff here
        console.log('polling')
        var table = "livelot";

        var lotname1 = "CTLM";
        var lotname2 = "StudentCenter"

        var CTLMparams = {
            TableName: table,
            Key:{
              "lotname": lotname1
            }
        };

        var StudentCenterparams = {
          TableName: table,
          Key:{
            "lotname": lotname2 
          }
        };

        this.getLotTuple(CTLMparams)
          .then((lot) => {
            let joined = this.state.lots
            joined[lot.lotname] = lot.numcars
            console.log("joined[lot.lotname]", joined[lot.lotname])
            
            this.setState({
              lots: joined
            })
          })
          .catch((err) => {
            console.error(err)
          })

        this.getLotTuple(StudentCenterparams)
          .then((lot) => {
            let joined = this.state.lots
            joined[lot.lotname] = lot.numcars
            console.log("joined[lot.lotname]", joined[lot.lotname])
            this.setState({
              lots: joined
            })
          })
          .catch((err) => {
            console.error(err)
          })
          // as last step you should call poll() method again
          // if you have asyncronous code you should not call it
          // as a step of your async flow, as it has already is 
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
    var lotname2 = "StudentCenter"

    var CTLMparams = {
        TableName: table,
        Key:{
          "lotname": lotname1
        }
    };

    var StudentCenterparams = {
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

    this.getLotTuple(StudentCenterparams)
      .then((lot) => {
        let joined = this.state.lots.concat(lot)
        this.setState({
          lots: joined
        })
      })
      .catch((err) => {
        console.error(err)
      })

      // this.poll()
  }

  render() {
    let lots = this.state.lots        
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
