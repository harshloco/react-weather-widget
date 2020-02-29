import React, { Component } from "react";
import "./App.css";
import API_KEY from "./config.js";
import { WindDirectionCalculation } from "./utils/windDirectionCalculation";
import Navbar from "./layouts/Navbar";
import WidgetEditor from "./components/WidgetEditor";
import WeatherInfo from "./components/WeatherInfo";

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

    // Bind the this context to the handler function
    this.tempHandler = this.tempHandler.bind(this);
    this.windHandler = this.windHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
  }
  // This method will be sent to the child component
  tempHandler(tempSelected) {
    this.setState({
      defaultTemperatureUnit: tempSelected
    });
  }
  windHandler(windSelected) {
    this.setState({
      defaultWind: windSelected
    });
  }
  titleHandler(title) {
    this.setState({
      defaultTitle: title.length === 0 ? "Title of widget" : title
    });
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    //get user current location
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
          //console.log("navigatoe " + this.state.lat + "line 137");
          //query open weather only if we have lat and lon
          if (!this.state.isLoading && this.state.lat && this.state.lon) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=${API_KEY}`;
            // console.log(url);
            fetch(url)
              .then(handleErrors)
              .then(resp => resp.json())
              .then(data => {
                var deg = Math.floor(data.wind.deg);
                //calcualte wind direction
                //Online Resource --- calculation logic from => https://gist.github.com/Shivabeach/05585b99501e3ab5e27c12ea7adf13d5
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
                this.setState({
                  city: data.name,
                  temp: data.main.temp
                });
                // console.log(
                //   "icon " + this.state.weather.icon + " TEMP " + this.state.temp
                // );
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
        error => {
          this.showError(error);
        },
        options
      );
    } else {
      this.setState({
        errorMessage: "Geolocation is not supported by this browser.",
        searchDone: true
      });
    }
  }
  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.setState({
          errorMessage: "User denied the request for Geolocation.",
          searchDone: true
        });
        break;
      case error.POSITION_UNAVAILABLE:
        this.setState({
          errorMessage: "Location information is unavailable.",
          searchDone: true
        });

        break;
      case error.TIMEOUT:
        this.setState({
          errorMessage: "The request to get user location timed out.",
          searchDone: true
        });

        break;
      default:
        this.setState({
          errorMessage: "An unknown error occurred.",
          searchDone: true
        });

        break;
    }

    // console.log("An unknown error occurred ." + this.state.errorMessage);
  }

  render() {
    if (!this.state.searchDone) {
      return (
        <div className="weather-container">
          <p>Loading...</p>
        </div>
      );
    } else if (this.state.errorMessage) {
      return (
        <div className="error-message">
          <p>{this.state.errorMessage}</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar />
          <div className="container-fluid" style={{ marginTop: "80px" }}>
            <div className="card mainCard">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-md-6 vl">
                    <WidgetEditor
                      tempUnit={this.state.defaultTemperatureUnit}
                      windUnit={this.state.defaultWind}
                      callBackTemperature={this.tempHandler}
                      callBackWind={this.windHandler}
                      callBackTitle={this.titleHandler}
                    />
                  </div>

                  {/* <div className=" col-md-4 vl"></div> */}
                  <div className="col-lg-6 col-md-6">
                    <WeatherInfo
                      weatherData={this.state.weatherData}
                      tempUnit={this.state.defaultTemperatureUnit}
                      windUnit={this.state.defaultWind}
                      s
                      widgetTitle={this.state.defaultTitle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
