import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var ChildComponent = (props) => {
  return (
      <div>
          <h3 style={{color:props.color}}> Hello, I am the immutable props object with a name and color property: {props.name}</h3>
            <GrandChildComponent name="I'm a grandchild component" color="green"/>
    </div>
  );
}

var GrandChildComponent = (props) => {
  return (<div>
    <h4 style={{color:props.color}}> Hello, I am the immutable props object, with a name and color property:{props.name}</h4>
    <ComponentWithState/>
  </div>);
}


class ComponentWithState extends Component {

  constructor(props){
    super(props);
    this.state = {status: 'initialized in the constructor', color: 'purple', ago: 0, toggle:'false'};
  }

  componentDidMount() {
   setInterval(
     () => {
     this.setState( (prevState, props) => {
       return {
          status: 'i was mounted ' + prevState.ago +' seconds ago!',
          color: 'blue',
          ago: prevState.ago+1
        }
     }

  )}, 1000);
  }

  handleClick = () => {
    this.setState((prevState, props) => {
      return {
        toggle: prevState.toggle === 'true'? 'false':'true'
      }
    })
  }

  render(){
      return (
            <div>
              <h5>Hello, I am the state object, here is my status:<i style={{color: this.state.color}}>{this.state.status}</i></h5>
              <button class="mdc-button mdc-button--accent" onClick={this.handleClick}>Toggle state object's toggle property</button>{this.state.toggle}
            </div>
);
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
         <ChildComponent name="I'm a child component" color="red"/>
      </div>
    );
  }
}


export default App;
