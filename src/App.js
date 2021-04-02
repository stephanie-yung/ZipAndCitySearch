import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '', // for value in zip search bar
      city: '', // for value in city search bar
      zipCodes: [], // list of zip codes gotten from city search bar
      cities: [], // list of cities gotten from zip search bar
    }
  }

  handleZipSearch = (e) => {
    this.setState({
      zipCode: e.target.value
    })
  }

  handleCitySearch = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  fetchCities = async () => {
    // try {
      let zip = this.state.zipCode;
      console.log(zip);
      let response = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
      let citiesObject = await response.json();
      console.log(citiesObject);

      this.setState({
        cities: citiesObject,
      });

    // } catch (error) {
    //   console.log(error);
    // }
  }

  fetchZipCodes = async () => {
    try {
      let city = this.state.city.toUpperCase();
      let response = await axios.get(`http://ctp-zip-api.herokuapp.com/city/${city}`)
      let zipCodesObject = await response.json();
      console.log(zipCodesObject);

      this.setState({
        cities: zipCodesObject,
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Zip Code and City Search</h1>
        <form>
          <label>Zip Code: </label>
          <input
            type="text" 
            value={this.state.zipCode}
            onChange={this.handleZipSearch}
          />
          <button type="submit" onClick={this.fetchCities}>Search Zip Code</button>
        </form>

        <br></br>

        <form>
          <label>City: </label>
          <input 
            type="text"
            value={this.state.city} 
            onChange={this.handleCitySearch}
          />
          <button type="submit" onClick={this.fetchZipCodes}>Search City</button>
        </form>
      </div>
    );
  }
}

export default App;
