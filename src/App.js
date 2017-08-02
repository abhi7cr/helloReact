import React, { Component } from 'react';
import logo from './logo.svg';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500, deepPurple500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router from './router';

injectTapEventPlugin();


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

   styles = {
      button: {
      margin: 12
    }
  };

  constructor(props){
    super(props);
    this.state = {status: 'initialized in the constructor', color: 'purple', ago: 0, toggle:'false'};
  }


   getChildContext() {
                return { muiTheme: getMuiTheme(baseTheme) };
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
              <RaisedButton label="Toggle state object's toggle property" 
                  secondary={true} 
                  onClick={this.handleClick}
                  icon={<FontIcon className="material-icons" color={deepPurple500}>
                    {this.state.toggle === 'true'?'check_box': 'check_box_outline_blank'}</FontIcon>}/> 
                    {this.state.toggle}
            </div>
);
  }
}

 ComponentWithState.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Router/>
         <ChildComponent name="I'm a child component" color="red"/>
      </div>
    );
  }
}


export default App;
