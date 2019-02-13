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
    } 

    render() {
    return (
        <div className={"modal display-block"}>
            <section className="modal-main">
                <div className='modal-header' >
                    <h1>Edit Lot {this.props.lotname}</h1>
                </div>

                <div className='modal-body'>
                    {this.state.numcars}
                </div>
                <button onClick={this.props.handleClose}>Close</button>
            </section>
        </div>
        );
    }
}


export default Modal;