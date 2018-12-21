import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BubbleChart from '@weknow/react-bubble-chart-d3';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      planet: []
    }
    this.url = "https://swapi.co/api/planets/"
    this.currentPage = 0
    this.isLoading = false

    this.data = [
      { label: 'CRM', value: 1.3 },
      { label: 'API', value: 1 },
      { label: 'Data', value: 1 },
      { label: 'Commerce', value: 1 },
      { label: 'AI', value: 3 },
      { label: 'Management', value: 5 },
      { label: 'Testing', value: 6 },
      { label: 'Mobile', value: 9 },
      { label: 'Conversion', value: 9 },
      { label: 'Misc', value: 21 },
      { label: 'Databases', value: 22 },
      { label: 'DevOps', value: 22 },
      { label: 'Javascript', value: 23 },
      { label: 'Languages / Frameworks', value: 25 },
      { label: 'Front End', value: 26 },
      { label: 'Content', value: 26 },
    ]
  }

  render() {
    console.log(this.state.planet)

    if (this.state.planet) {
      return (<div > <div className = "content"><BubbleChart
        graph={{
          zoom: 1.1,
          offsetX: -0.05,
          offsetY: -0.01,
        }}
        width={1000}
        height={800}
        showLegend={true} // optional value, pass false to disable the legend.
        legendPercentage={22} // number that represent the % of with that legend going to use.
        legendFont={{
          family: 'Arial',
          size: 12,
          color: '#000',
          weight: 'bold',
        }}
        valueFont={{
          family: 'Arial',
          size: 12,
          color: '#fff',
          weight: 'bold',
        }}
        labelFont={{
          family: 'Arial',
          size: 16,
          color: '#fff',
          weight: 'bold',
        }}
        //Custom bubble/legend click functions such as searching using the label, redirecting to other page
        bubbleClickFunc={this.bubbleClick}
        legendClickFun={this.legendClick}
        // data={this.data}
        data={this.state.planet[this.currentPage]}
      /></div>
      <br/>
       <div className="paggingButtons" >
      <button onClick={this.prevPress.bind(this)} className="next-prevButtons">Prev</button>
      <button onClick={this.nextPress.bind(this)} className="next-prevButtons">Next</button>
    </div>
      </div>)
    } else {
      return (<h1>No data</h1>)
    }

  }

  prevPress() {
    if(this.isLoading || this.currentPage == 0){return}
    this.currentPage = this.currentPage - 1
    this.forceUpdate()

  }

  nextPress() {
      if(this.isLoading || this.currentPage >=3){return}
      this.currentPage = this.currentPage + 1
      this.loadData()
  }


  componentDidMount() {
    this.loadData()
  }

  loadData(){
    this.isLoading = true
    fetch(this.url, {
      method: "get",
      Headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        this.formateData(data)
        this.isLoading = false
      });
  }

  formateData(data) {
    debugger;
    this.url = data.next

    let localPlanet = []
    data.results.map((data, index) => {

      let diameter = parseInt(data.diameter == "unknown" ? "1" : parseInt(data.diameter)/ 1000 )
      if (diameter > 100) {
        diameter = diameter / 100
      }
      const planet = {
        label: data.name,
        value: diameter
      }
      localPlanet.push(planet)
    })
    console.log("Planet:", this.state.planet)
    this.setState(prev=>({
      planet: [...prev.planet , localPlanet]
    }))
  }
}

export default App;
