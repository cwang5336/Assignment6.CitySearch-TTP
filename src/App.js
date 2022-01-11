import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CityInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      getSuccess: true,
      firstPage: true,
      zipcode: ["Can't find this city"] ,
      city: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchCityData(city){
    axios.get("https://ctp-zip-api.herokuapp.com/city/" + city)
    .then(response => {
      let result = response.data;
      this.setState({zipcode:result, getSuccess:true});
    })
    .catch(err => {
      console.log(err);
      this.setState({getSuccess:false});
    });
  }

  handleClick() {
    let upperCaseCity = this.state.city.toUpperCase();
    if (!this.state.firstPage) {
      upperCaseCity = "Try New York"
    };
      this.setState ({
          firstPage : !this.state.firstPage,
          city: upperCaseCity,
      });
  }

  handleChange (event) {
    this.setState({
        city:  event.target.value
    });
  }

  render() {
    if (this.state.firstPage === true) {
      return (
          <div >
            <h1 className = "App-header">City Search </h1>
            <h2  className = "inputter">City: <input className="inputLine" type='text' value = {this.state.city} onChange={this.handleChange}/></h2>
            <button className= "subButton" onClick={this.handleClick}>Submit</button>
          </div>
      );
    } else {
      this.fetchCityData(this.state.city);
      var zipcode = (<p>City Not Found</p>);
      if(this.state.getSuccess){
        zipcode = this.state.zipcode.map((zipcode)=><PrintZip data={zipcode}/>
        );
      }; 
    let correctCity = this.state.city.toLowerCase();
    correctCity = correctCity.toUpperCase()
    return(
      <div>
        <h1 className = "App-header">City Search Results</h1>
        <h2 className = "inputter">City: {correctCity}</h2>
        <ul className = "zipList">{zipcode}</ul>
        <button className= "button" onClick={this.handleClick}>Try Again</button>
      </div>
    );
  }
  }
}

class PrintZip extends Component {
  render() {
      let zip = this.props.data;
      return (
          <li>
              <p>{zip}</p>
          </li>
      );
  }
}

class App extends Component {
  render() {
      return (
          <div>
            <CityInfo />
          </div>

      );
  }
}

export default App;
