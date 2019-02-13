import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import '../../css/main.css'

class LotView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.name,
            numcars: props.numcars
        }

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick = () => {
        console.log('handling click')
        this.props.openModal(this.state.name, this.state.numcars)
    }
    render() {
        return(
            <div className="pp-lot row">
                <div className="col-sm-4"> {this.state.name} </div>
                <div className="col-sm-8 pp-car-display" onClick={this._handleClick} >
                    {this.state.numcars}
                    <i className="fas fa-edit"></i>
                </div>
            </div>
        )
    }
}  

LotView.propTypes = {
    name: PropTypes.string,
    numcars: PropTypes.number,
    openModal: PropTypes.func
}

export default LotView;