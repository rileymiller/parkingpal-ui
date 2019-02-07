import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import '../../css/main.css'

const Modal = ({ handleClose, show, lotname, numcars}) => {
    console.log('Modal render method called')
    return (
    <div className={show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
            {<div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{lotname + ' ' + numcars}</h5>
                        <button type="button" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Save changes</button>
                        <button type="button" className="btn btn-secondary">Close</button>
                    </div>
                    </div>
                </div>
            </div>}
            <button onClick={handleClose}>close</button>
        </section>
    </div>
    );
};

export default Modal;