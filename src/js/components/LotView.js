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
        this.props.openModal(this.props.name, this.props.numcars)
    }
    render() {
        return(
            <div className="pp-lot row">
                <div className="col-sm-4"> {this.props.name} </div>
                <div className="col-sm-8 pp-car-display" onClick={this._handleClick} >
                    {this.props.numcars}
                    {this.props.isAdmin ? <i className="fas fa-edit"></i>: null }
                </div>
            </div>
        )
    }
}  

LotView.propTypes = {
    name: PropTypes.string,
    numcars: PropTypes.number,
    openModal: PropTypes.func,
    isAdmin: PropTypes.bool
}

export default LotView;