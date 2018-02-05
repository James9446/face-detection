import React, { Component } from 'react';
import logo from './logo.svg';
import './config/clarifai.js'
import './App.css';
var GenderConcept = (props) => {
  return (
    <div>
      <h1> {props.info} </h1>
      <h1>Hello World</h1>
    </div>
  )
  
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://static.pexels.com/photos/428341/pexels-photo-428341.jpeg',
      imageData: null
    }
  }
  componentDidMount() {
    this.GetData(this.state, this.setImageDataState.bind(this));
  }
  setImageDataState(data) {
    // debugger;
    // console.log('happy !!!!!!!!!!!')
    // console.log('this:', this.state);
    // console.log('happy !!!!!!!!!!!')
    // console.log('setImageDataState props:', props)
    this.setState({
      imageData: data
    });
    // console.log(this.state)
    // console.log('happy !!!!!!!!!!!')
  }
  GetData = (props, callback) => {
    // console.log(props.image)
    const Clarifai = require('clarifai');
  
    // initialize with your api key. This will also work in your browser via http://browserify.org/
  
    const app = new Clarifai.App({
    apiKey: window.CLARIFAI_API_KEY
    });
  
    app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, props.image).then(
      function(response) {
        // do something with response
        // console.log(response);
        // props.GetGender.bind(this, response);
        (() => {
          // console.log('response:', response)
          // console.log('props:', props)
          // props.imageDataProp = response;
          // props.setState({
          //     imageData: props.imageData
          //   });
          callback(response);
          // props.setImageDataState()
          // console.log('props:', props)
        })()
        // GetConceptInfo(props) {
        //   return response.outputs["0"].data.regions["0"].data.face.gender_appearance.concepts["0"];
        // }
        // GetConceptInfo(response) {
        //   response.outputs["0"].data.regions["0"].data.face.gender_appearance.concepts["0"];
        // }
      },
      function(err) {
        // there was an error
      }
    );
  }
  // componentDidMount(props) {
  //   GetData(this.state);
  // }
  
  // GetGender(response) {
  //   console.log('gender response:', response)
  //   this.setState = {
  //     gender: response
  //   }
  // }

  render() {
    // console.log('state', this.state)
    let genderData;
    let masculine;
    let feminine;
    let gender;
    // console.log('state', this.state);
    if (this.state.imageData !== null) {
      genderData = this.state.imageData.outputs[0].data.regions[0].data.face.gender_appearance;
      masculine = genderData.concepts[0].name + " " + genderData.concepts[0].value;
      feminine = genderData.concepts[1].name + " " + genderData.concepts[1].value;
      console.log(masculine);
      console.log(feminine);
      if (genderData.concepts[0].value > genderData.concepts[1].value) {
        gender = genderData.concepts[0].name;
      } else {
        gender = genderData.concepts[1].name;
      }
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={this.state.image} className="App-logo" alt="logo" />
          <h1 className="App-title"></h1>
          {/* <h1>{this.state.imageData}</h1> */}
          
        </header>
        {/* <GenderConcept /> */}
        <GenderConcept info={gender} />
        <p className="App-intro">
        
          
        </p>
        {/* <div update={this.setImageDataState(this.props)}/> */}
      </div>
    );
  }
}



// var GetData = (props) => {
//   console.log(props.image)
//   const Clarifai = require('clarifai');

//   // initialize with your api key. This will also work in your browser via http://browserify.org/

//   const app = new Clarifai.App({
//   apiKey: 'a9cc6b70dc1e4d0f99433c0454ee1590'
//   });

//   app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, props.image).then(
//     function(response) {
//       // do something with response
//       // console.log(response);
//       // props.GetGender.bind(this, response);
//       (() => {
//         console.log(response)
//         // console.log('happy')
//         props.imageData = response;
//         props.setImageDataState()
//       })()
//       // GetConceptInfo(props) {
//       //   return response.outputs["0"].data.regions["0"].data.face.gender_appearance.concepts["0"];
//       // }
//       // GetConceptInfo(response) {
//       //   response.outputs["0"].data.regions["0"].data.face.gender_appearance.concepts["0"];
//       // }
//     },
//     function(err) {
//       // there was an error
//     }
//   );
// }

export default App;
