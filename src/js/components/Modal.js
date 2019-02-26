import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import '../../css/main.css'

class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            numcars: props.numcars 
        }

        //will need to bind handlers here
        this._handleDecrement = this._handleDecrement.bind(this);
        this._handleIncrement = this._handleIncrement.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleClose = this._handleClose.bind(this);
    } 

    _handleClose = () => {
        console.log('inside of _handleClose')
        this.props.handleClose()
    }
    
    _handleDecrement = () => {
        console.log('handling Decrement')
        this.setState({
            numcars: this.state.numcars - 1
        })
    }

    _handleIncrement = () => {
        console.log('handling Increment')
        this.setState({
            numcars: this.state.numcars + 1
        })
    }

    _handleChange = (event) => {
        console.log('handling change')
        this.setState({numcars: parseInt(event.target.val)})
    } 

    _handleSubmit = () => {
        console.log('inside of _handleSubmit')
        this.props.handleClose()
        this.props.handleSubmit(this.props.lotname, this.state.numcars)
    }

    render() {
    return (
        <div className="modal display-block">
            <section className="modal-main">
                <div className='modal-header' >
                    <h1>Edit Lot {this.props.lotname}</h1>
                </div>

                <div className='modal-body'>
                    <i className="fa fa-minus" aria-hidden="true" onClick={this._handleDecrement}></i>
                     {/* <input className='modal-numcars' autoFocus={true} value={this.state.numcars} type={"number"} onChange={this._handleChange} /> */}
                    <div className='modal-numcars'>{this.state.numcars}</div>
                    <i className="fa fa-plus" aria-hidden="true" onClick={this._handleIncrement}></i>
                </div>
                <div className='modal-footer'>
                    <div className='modal-button modal-submit' onClick={this._handleSubmit}>Submit</div>
                    <div className="modal-button modal-close" onClick={this._handleClose}>Close</div>
                </div>
            </section>
        </div>
        );
    }
}


export default Modal;