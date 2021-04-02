import React from 'react';
import axios from 'axios';
import City from './City';
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

  handleZipChange = (event) => {
    this.setState({
      zipCode: event.target.value
    })
  }

  handleZipSubmit = (event) => {
    // alert('Zip was submitted: ' + this.state.zipCode);

    event.preventDefault();
    this.fetchCities();
  }

  fetchCities = async () => {
    try {
      let zip = this.state.zipCode;
      console.log(zip);
      let response = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${zip}`);
      let responseData = await response.data;
      console.log(responseData);

      this.setState({
        cities: responseData,
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Zip Code and City Search</h1>
        <form onSubmit={this.handleZipSubmit}>
          <label>
            Zip Code: 
            <input
              type="text" 
              value={this.state.zipCode}
              onChange={this.handleZipChange}
            />
          </label>
          <input type="submit" value="Search" />
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

        {/* render city components */
          this.state.cities.map( (city) => {
            return (
              <div>
                <City data={city} />
              </div>
            )
          })
        }

      </div>
    );
  }
}

export default App;
