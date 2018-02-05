import React, { Component } from 'react';
import logo from './logo.svg';
import './config/clarifai.js'
import './App.css';

var GenderConcept = (props) => {
  return (
    <div>
      <p>Gender prediction: {props.info[0]}</p>
      <p> {props.info[1]} </p>
      <p> {props.info[2]} </p>
    </div>
  ) 
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://images.summitmedia-digital.com/preview/images/2017/05/23/nm_suzy.jpg',
      imageData: null
    }
  }
  componentDidMount() {
    this.GetData(this.state, this.setImageDataState.bind(this));
  }
  setImageDataState(data) {
    this.setState({
      imageData: data
    });
  }
  GetData = (props, callback) => {
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({
    apiKey: window.CLARIFAI_API_KEY
    });  
    app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, props.image).then(
      function(response) {
        (() => {
          callback(response);
        })()
      },
      function(err) {
        // there was an error
        console.log('uh oh you hit a little error');
      }
    );
  }

  render() {
    let genderData;
    let masculine;
    let feminine;
    let genderPrediction;
    if (this.state.imageData !== null && this.state.imageData.outputs[0].data.regions !== undefined) {
      console.log('successfull data')
      genderData = this.state.imageData.outputs[0].data.regions[0].data.face.gender_appearance;
      masculine = genderData.concepts[0].name + ": " + Math.round(genderData.concepts[0].value * 100) + '%';
      feminine = genderData.concepts[1].name + ": " + Math.round(genderData.concepts[1].value * 100) + '%';
      genderPrediction = genderData.concepts[0].name
      console.log(JSON.stringify(genderData))
      console.log(masculine);
      console.log(feminine);
      // if (genderData.concepts[0].value > genderData.concepts[1].value) {
      //   genderPrediction = genderData.concepts[0].name;
      // } else {
      //   genderPrediction = genderData.concepts[1].name;
      // }
    } else if (this.state.imageData === null) {
      genderPrediction = '...loading';
    } else {
      console.log('image is not suitable')
      genderPrediction = ' Not unavailable for this image. Please select a different image';
    }
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.image} className="App-logo" alt="logo" />
          <h1 className="App-title"></h1>
          {/* <h1>{this.state.imageData}</h1> */}
          
        </header>
        {/* <GenderConcept /> */}
        <GenderConcept info={[genderPrediction, masculine, feminine]} />
        <p className="App-intro">
        
          
        </p>
        {/* <div update={this.setImageDataState(this.props)}/> */}
      </div>
    );
  }
}

export default App;
