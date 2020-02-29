import React, { Component } from "react";

class WeatherInfo extends Component {
  render() {
    const { city, temp, icon, speed, deg } = this.props.weatherData;
    const celcius =
      this.props.tempUnit === "C"
        ? Math.round(temp - 273.15)
        : Math.round((temp - 273.15) * (9 / 5) + 32);

    return (
      <div className="card m-4 weather-info shadow ">
        <div className="top">
          <h2 className="title-heading">{this.props.widgetTitle}</h2>

          <div className="icon-wrapper">
            <img
              id="wicon"
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather icon"
            />

            <span className="weather-text">
              <span className="weather-city">{city}</span>
              <br />
              <span className="weather-measure">
                {celcius}
                <span>&deg;</span>
              </span>
              <br />
              <span className={`weather-wind-${this.props.windUnit}`}>
                Wind
              </span>
              &nbsp;&nbsp;
              <span className={`weather-wind-speed-${this.props.windUnit}`}>
                {deg}&nbsp;{speed}km/h
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherInfo;
