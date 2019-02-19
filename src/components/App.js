import React, { Component } from 'react';
import './App.css';
import LetterCanvas from './splashScreen/LetterCanvas';
import AboutMe from './aboutMe/AboutMe';
import Canvas from './canvasBackground/Canvas';
import { Icon, Sidebar, Popup } from 'semantic-ui-react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

const compare = (arr1, arr2) => {
    if (!arr1 || !arr2){
      return false;
    }

    if (arr1.length !== arr2.length){
      return false;
    }

    for (var i = 0, l=arr1.length; i < l; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            if (!arr1[i].equals(arr2[i])){
              return false;
            }
        }
        else if (arr1[i] !== arr2[i]) {
          return false;
        }
    }
    return true;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.easterEggKeys = ["F05T§"];

    this.state = {
      sidebarOpen: false,
      easterEggUnlocked: false,
      easterEggSteps: [],
      letterType: "bounce",
      currentRoute: "me"
    }
  }

  componentDidUpdate(prevProps) {
  }

  openSidebar = () => {
    this.setState({
      sidebarOpen: true
    });
  }

  closeSidebar = () => {
    this.setState({
      sidebarOpen: false
    });
  }

  handleLetterTypeChange = (type) => {
    this.setState({
      letterType: type
    })
  }

  setRoute = (route) => {
    console.log(route)
    this.setState({
      currentRoute: route.toLowerCase()
    })
    this.props.history.push('/' + route.toLowerCase());
    this.closeSidebar();
  }

  easterEggAction = (val, type) => {
    let foundKeys = this.state.easterEggSteps;
    foundKeys.push(val);
    let easterEggUnlocked = false;
    if(compare(foundKeys,this.easterEggKeys)) {
      easterEggUnlocked = true;
    }
    this.setState({
      easterEggSteps: foundKeys,
      easterEggUnlocked,
      letterType: type
    })
  }

  render() {
    const navIconNames = {
      "Home": {
        id: "home",
        disabled: false
      },
      "Me": {
        id: "id card",
        disabled: false
      },
      "Contact": {
        id: "coffee",
        disabled: false
      },
      "CC": {
        id: "cube",
        disabled: !this.state.easterEggUnlocked
      }
    }
    const navIcons = Object.keys(navIconNames).map((icon, index) => {
      return(
        <Popup
          key={navIconNames[icon].id+index}
          disabled={navIconNames[icon].disabled}
          trigger={
            <Icon
            link={!navIconNames[icon].disabled}
            disabled={navIconNames[icon].disabled}
            name={navIconNames[icon].id}
            onClick={() => {this.setRoute(icon)}}
            style={styles.navIcon}>
            </Icon>
          }
          content={icon}
          size="mini"
          basic
          inverted
          horizontalOffset={10}
          position='left center'
        />
      )
    });
    return (
      <div style={styles.parentContainer}>
        <Canvas canvasType={this.state.currentRoute}/>
        <Icon
        onClick={() => {this.openSidebar()}}
        className={this.state.sidebarOpen ? 'menuIconOpen fadeOut' : 'menuIconOpen fadeIn'}
        name="bars"/>
        <Sidebar
          className="menuSideBar"
          animation='scale down'
          visible={this.state.sidebarOpen}
          onHide={this.closeSidebar}
          width='thin'>
          <Icon
          onClick={this.closeSidebar}
          className={!this.state.sidebarOpen ? 'menuIconClose fadeOut' : 'menuIconClose fadeIn'}
          name="x"/>
          <div
          style={styles.sidebarContentContainer}>
          {navIcons}
          </div>
        </Sidebar>
        <Switch>
          <Route path="/home" exact
          render={(props) => {
            return(
              <LetterCanvas {...props}
              letterType={this.state.letterType}
              handleLetterTypeChange={this.handleLetterTypeChange}
              easterEggAction={this.easterEggAction}/>
            )
          }}/>
          <Route path='/' exact>
            <Redirect to="home" />
          </Route>
          <Route path="/me" component={AboutMe} />
          <Route path="/contact" component={AboutMe} />
          <Route>
            <Redirect to="home" />
          </Route>
        </Switch>
      </div>
    );
  }
}

const styles = {
  parentContainer: {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center"
  },
  sidebarContentContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  navIcon: {
    fontSize: 21,
    marginBottom: 30,
    color: "#0D14ED"
  }
}

export default withRouter(App);
