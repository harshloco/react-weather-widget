import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layouts/Navbar";
import API_KEY from "./config.js";
import { WindDirectionCalculation } from "./utils/windDirectionCalculation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {
        weather: "",
        city: "",
        country: "",
        temp: 0,
        icon: "",
        speed: "",
        deg: ""
      },
      searchDone: false,
      defaultTemperatureUnit: "C",
      defaultWind: "On",
      errorMessage: "",
      defaultTitle: "Title of widget",
      coordinates: [],
      lat: "",
      lon: "",
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.setState({
            coordinates: pos.coords
          });
          this.setState({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            isLoading: false
          });
          // console.log("navigatoe " + this.state.lat + "line 137");
          if (!this.state.isLoading) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=${API_KEY}`;
            console.log(url);
            fetch(url)
              .then(handleErrors)
              .then(resp => resp.json())
              .then(data => {
                var deg = Math.floor(data.wind.deg);
                //calcualte wind direction
                deg = WindDirectionCalculation(deg);

                // console.log(data.weather[0].icon);
                const weatherObj = {
                  weather: data.weather[0].main,
                  city: data.name,
                  country: data.sys.country,
                  temp: Math.floor(data.main.temp),
                  icon: data.weather[0].icon,
                  speed: Math.floor(data.wind.speed * 3.6),
                  deg: deg
                };
                this.setState({
                  weatherData: weatherObj,
                  searchDone: true,
                  errorMessage: ""
                });
                this.setState({ city: data.name, temp: data.main.temp });
                // console.log(
                //   "icon " + this.state.weather.icon + " TEMP " + this.state.temp
                // );
                // this.setState({
                //   weatherData: weatherObj,
                //   searchDone: true,
                //   errorMessage: ""
                // });
              })
              .catch(error => {
                // If an error is catch, it's sent to SearchBar as props
                this.setState({ errorMessage: error.message });
              });
          }

          function handleErrors(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          }
        },
        () => {},
        options
      );
    }
  }

  render() {
    if (!this.state.searchDone) {
      return (
        <div className="weather-container">
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar />
        </div>
      );
    }
  }
}

export default App;
