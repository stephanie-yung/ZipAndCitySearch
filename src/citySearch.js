import { Component } from 'react';
import axios from 'axios';

class CitySearchAPI extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiData: [],
            city: "",
            found: false
        }
    }

    handleInputChange = (event) => {
        this.setState({city: event.target.value});
    }

    handleSearchClick = async () => {
        let cityName = this.state.city;
        let linkToAPI = 'http://ctp-zip-api.herokuapp.com/city/' + cityName;

        try {
            let response = await axios.get(linkToAPI);
            this.setState({apiData: response.data, found: true});
        } catch (error) {
            //ADD LATER
        }
    }

    makeTable = () => {
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        //found is false when we get 404 error
        if(!foundMatch){
            //ADD LATER
        } else {
            table.push(
              <tr key={currData.id}>
                <td>{currData}</td>
              </tr>
            );
            return table;
        }
    }

    render() {
        return (
            <div className="container">
                <div className = "search">
                    <h3>Search City:</h3>
                    <input type="text" value={this.state.city} onChange={this.handleInputChange} placeholder="Enter city name"/>
                    <button className="search-button" onClick={this.handleSearchClick}>Search</button>
                </div>
                <br/>
                <table id="data">
                    <tbody>
                    {this.makeTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CitySearchAPI;