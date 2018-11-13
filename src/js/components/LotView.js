import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import '../../css/main.css'
// import './style.css'
const LotView = ( {name, num } ) => (
    <div className="pp-lot row">
        <div class="col-sm-6"> {name} </div>
        <div class="col-sm-6"> {num}</div>
    </div>
);

LotView.propTypes = {
    name: PropTypes.string,
    num: PropTypes.number
}

export default LotView;