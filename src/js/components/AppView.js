import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "./Input";
import LotView from "./LotView";
import Modal from './Modal'
import AWS from "aws-sdk";
import { resolve } from "url";

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "AKIAI6NSAW6YQJL36SQA",
  secretAccessKey: "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",
});


const MINES_LOTS = ['A', 'B', 'C', 'CTLM', 'D', 'E', 'F', 'FF', 'I', 'J', 'K', 'O', 'Q', 'R']
const TABLE_NAME = "livelot";
const DOC_CLIENT = new AWS.DynamoDB.DocumentClient();

class AppView extends Component {
  isMounted = false

  constructor() {
    super();
    this.state = {
      lots: [],
      modalLotName: '#',
      modalNumCars: -1,
      pollingIntervall: 2000,
      showModal: false,
      title: "LiveLot-Mines"
    };
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.modalSubmit = this.modalSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.id]: event.target.value,
      title: event.target.value
    });
  }


  showModal = (lotname, numcars) => {
    console.log(numcars)
    this.setState({
      modalNumCars: numcars,
      modalLotName: lotname,
      showModal: true
    })
  }

  hideModal = () => {
    console.log('inside of hideModal')
    this.setState({
      showModal: false
    })
  }

  modalSubmit = (lotname, numcars) => {
    console.log('inside of modalSubmit')
    let updated_lots = this.state.lots
    let updated_lot = updated_lots[lotname]
    updated_lot = {
      numcars: parseInt(numcars),
      lotname: lotname
    }
    const index = updated_lots.findIndex((lot) => lot.lotname === lotname)
    // debugger
    updated_lots[index] = updated_lot
    console.log(updated_lots)

    updated_lots.filter
    // make call to update the database
    var params = {
      TableName: TABLE_NAME,
      Key:{
          "lotname": lotname
      },
      UpdateExpression: "set numcars = :n",
      ExpressionAttributeValues:{
          ":n":numcars
      },
      ReturnValues:"UPDATED_NEW"
    };
    
    console.log("Updating the item...");
    DOC_CLIENT.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

    this.setState({
      lots: updated_lots
    })
  }

  /**
   * Gets the number of cars for the specified lot
   */
  getLotTuple = (params) => {
    return new Promise( (resolve, reject) => {

      DOC_CLIENT.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            reject(err)
        } else {
            resolve(data.Item)
        }
      });
    })
    
  }

  /**
   * Performs DynamoDB scan operation
   */
  onScan = (err, data) => {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        reject(err)
    } else {
        //print all the data

        console.log("Scan succeeded.", data.Items)
        // debugger
        data.Items.forEach((lot) => {
          console.log(
                lot.lotname + ": ",
                lot.numcars);
        });

        if(this.isMounted) {
          this.setState({
            lots: data.Items
          })
        }
        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        // if (typeof data.LastEvaluatedKey != "undefined") {
        //     console.log("Scanning for more...");
        //     params.ExclusiveStartKey = data.LastEvaluatedKey;
        //     DOC_CLIENT.scan(params, onScan);
        // }

        resolve(data.Item)
    }
  }
  /**
   * Gets all of the lots in the table with their number of cars
   */
  getAllLots = (params) => {
    return new Promise((resolve, reject) => {
      DOC_CLIENT.scan(params, this.onScan);
    })
  }


  speak(msg) {
      // debugger
      console.log('SPEAK CALLED')
      if ('speechSynthesis' in window) {
        let msgSpeak = new SpeechSynthesisUtterance();
        msgSpeak.voice = speechSynthesis.getVoices()[0];
        console.log('inside of speak')
        msgSpeak.text = msg;
        speechSynthesis.speak(msgSpeak);
      }
  }

  poll() {


      const polling = setTimeout(() => {
        for(let i = 0; i < MINES_LOTS.length; i++) {
          let lot_params = {
            TableName: TABLE_NAME,
            Key:{
              "lotname": MINES_LOTS[i]
            }
          }
    
          this.getLotTuple(lot_params)
            .then((lot) => {
              let joined = this.state.lots.concat(lot)
              this.setState({
                lots: joined
              })
            })
            .catch((err) => {
              console.error(err)
            })
        }

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
    this.isMounted = true
    console.log('component did mount')
    

    let getAllLotParams = {
      TableName : TABLE_NAME,
      ProjectionExpression:"lotname, numcars"
    };

    this.getAllLots(getAllLotParams)
    // this.poll()
  }

  componentDidUpdate() {
    console.log('component did update')
    console.log(this.state)
  }

  componentWillUnmount() {
    console.log('component unmounted')
    this.isMounted = false
  }

  render() {
    console.log('rerendered')
    // debugger
    const lots = this.state.lots
    return (
      <div>
        <h2 className="pp-title">{this.state.title}</h2>
        <div className="pp-lot-header row">
        <div className="col-sm-4"> Lot Name </div>
        <div className="col-sm-8"> Spots Available</div>
      </div>
        {this.state.showModal ? <Modal handleClose={this.hideModal} handleSubmit={this.modalSubmit} lotname={this.state.modalLotName} numcars={this.state.modalNumCars} show={this.state.showModal}  />: null},
        { lots.map(lot => 
          <LotView
            key={lot.lotname}
            name={lot.lotname}
            numcars={lot.numcars}
            openModal={this.showModal}
          />
        )}
      </div>
      
    );
  }
}
export default AppView;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppView />, wrapper) : false;
