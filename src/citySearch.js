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

    getZipCodes = () => {
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        //found is false when we get 404 error
        if(!foundMatch){
            //ADD LATER
        } else {
            return currData;
        }
    }

    render() {
        return (
            <div className="container">
                <div className = "search">
                    <label style={{fontWeight: "bold"}}>City name: </label>
                    <input type="text" value={this.state.city} onChange={this.handleInputChange} placeholder="Enter city name"/>
                    <button className="search-button" onClick={this.handleSearchClick}>Search</button>
                </div>
                <br/>
                { this.getZipCodes() }
            </div>
        )
    }
}

export default CitySearchAPI;