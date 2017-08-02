import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import {red500} from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class Router extends Component {

  getChildContext() {
                return { muiTheme: getMuiTheme(baseTheme) };
   }

   render() {
       return (<div>
        <nav>
         <Link to="/dashboard">Dashboard</Link><br/>
         <Link to="/numbers">Numbers</Link>
         </nav>
         <div>
             <Route path='/dashboard' component={Dashboard}/>
             <Route path='/numbers' component={Numbers}/> 
             {/* <Route path="/numbers/:id" component={NumberDetail}/>  */}
             <Route exact path="/" component={Dashboard}/>
         </div>
      </div>
       )
}
}

 Router.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

class NumberList extends Component {
    constructor(props){
        super(props);    
    }
    styles = {
        marginLeft:'45px'
    }
    render(){  
        const listItems = this.props.numbers.map((number) => {
            const key = number.toString();
            const url =  '/numbers/'+ key;
            return <li key={key}><Link to={url}>{number}</Link></li>
        });
        return (<div>
                <Link to="/dashboard">
                    <FontIcon className="material-icons" color={red500} style={this.styles}>
                        home
                        </FontIcon>
                </Link>   
                <ul>{listItems}</ul>
                <Route path="/numbers/:id" component={NumberDetail}/> 
                </div>);
    }
}

const Home = () => {
    return <p>Hello, you are Home</p>;
}

const Dashboard = ({match}) => {
    return (<p>Hello, I'm the Dashboard section, url: {match.url}</p>);
}

const Numbers = ({location}) => {
    let path = location.pathname;
    const numbers = [1,2,3,4,5];
    return (<div>
                <p>Hello, I'm the Numbers Section, url: {path}</p>
                 <NumberList numbers={numbers} url={path}/>
            </div>);
}

class NumberDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            <Link to={`${this.props.match.url}/details`}>More Details about {this.props.match.params.id}</Link><br/>
            <Route path="/numbers/:id/details" component={NumberMoreDetail}/>
            </div>
    );
    }
}

const NumberMoreDetail = (props) => {
    return <span>{props.match.url}</span>
}


export default Router;