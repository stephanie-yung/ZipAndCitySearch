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
        try {
            let cityName = this.state.city.toUpperCase();

            let response = await axios.get(`http://ctp-zip-api.herokuapp.com/city/${cityName}`);
            this.setState({apiData: response.data, found: true});
        } catch (error) {
                if (error.response) {
                    console.log(error.response.data); //Not Found
                    console.log(error.response.status); //404
                    this.setState({found: false});
                }
        }
    }

    getZipCodes = () => {
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        var newData = [];
        //found is false when we get 404 error
        if(!foundMatch) {
            table.push(<h7> No Results </h7>);
            return table;
        } else {
            var i;
            for (i = 0; i < newData.length; i+= 5){
                newData.push(newData);
            }
            //create a loop where if the length is 5 itll print console.log
            //else it will split after 5 and then console log
            return newData;
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