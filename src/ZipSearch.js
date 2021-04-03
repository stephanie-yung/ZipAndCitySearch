import React from 'react';
import axios from 'axios';
import City from './City';
import './App.css';

class ZipSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '', // for value in zip search bar
      cities: [], // list of cities gotten from zip search bar
      invalidZip: false,
    }
  }

  //When zipcode changes in search bar
  handleZipChange = (event) => {
    this.setState({
      zipCode: event.target.value
    })
  }

  //When zipcode is submitted
  handleZipSubmit = (event) => {
    // alert('Zip was submitted: ' + this.state.zipCode);
    event.preventDefault();
    this.fetchCities();
  }

  //get city information
  fetchCities = async () => {
    try {
      let zip = this.state.zipCode;
      console.log(zip);
      let response = await axios.get(`http://ctp-zip-api.herokuapp.com/zip/${zip}`);
      let responseData = await response.data;
      console.log(responseData);

      this.setState({
        cities: responseData,
        invalidZip: false,
      });

    } catch (error) {
      console.log(error);
      
      this.setState({
        invalidZip: true
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Zip Code Search</h1>
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

        {/* render city components */
          this.state.invalidZip ?
          <h7>No results.</h7>
          :
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

export default ZipSearch;
