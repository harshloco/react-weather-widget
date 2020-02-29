import React, { Component } from "react";
import PropTypes from "prop-types";

class WidgetEditor extends Component {
  constructor(props) {
    super(props);

    this.handleTemperatureRadio = this.handleTemperatureRadio.bind(this);
    this.handleWindRadio = this.handleWindRadio.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  handleTemperatureRadio(value) {
    this.props.callBackTemperature(value);
  }
  handleWindRadio(value) {
    this.props.callBackWind(value);
  }
  handleTitleChange(event) {
    // console.log("handleTitleChange value : " + event.target.value);
    this.props.callBackTitle(event.target.value);
  }
  render() {
    return (
      <div className="card m-4  h-50 border-0 WidgetEditor">
        <div className="form-group editor-heading">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title of widget"
            className="form-control"
            id="title"
            value={this.props.defaultTitle}
            onChange={this.handleTitleChange.bind(this)}
          />
        </div>
        <div className="form-group editor-heading">
          <label htmlFor="temp">Temperature</label>
        </div>
        <div className="form-group">
          <div className="form-check-inline mr-4">
            <label className="circleRadio">
              <input
                type="radio"
                className="form-check-input"
                name="optRadioTemp"
                checked={this.props.tempUnit === "C"}
                onChange={() => this.handleTemperatureRadio("C")}
              />
              <span>&deg;</span>C<span className="checkmark"></span>
            </label>
          </div>
          <div className="form-check-inline ml-4">
            <label className=" circleRadio">
              <input
                type="radio"
                className="form-check-input"
                name="optRadioTemp"
                checked={this.props.tempUnit === "F"}
                onChange={() => this.handleTemperatureRadio("F")}
              />
              <span>&deg;</span>F<span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="form-group editor-heading">
          <label htmlFor="pwd">Wind</label>
        </div>
        <div className="form-group">
          <div className="form-check-inline mr-4">
            <label className="circleRadio">
              <input
                type="radio"
                className="form-check-input"
                name="optRadioWind"
                checked={this.props.windUnit === "On"}
                onChange={() => this.handleWindRadio("On")}
              />
              On
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="form-check-inline ml-4">
            <label className=" circleRadio">
              <input
                type="radio"
                className="form-check-input"
                name="optRadioWind"
                checked={this.props.windUnit === "Off"}
                onChange={() => this.handleWindRadio("Off")}
              />
              Off
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

WidgetEditor.propTypes = {
  defaultTitle: PropTypes.string,
  tempUnit: PropTypes.string,
  windUnit: PropTypes.string,
  callBackTemperature: PropTypes.func,
  callBackWind: PropTypes.func,
  calBackTitle: PropTypes.func
};
export default WidgetEditor;
