import React, { Component } from 'react';
import './App.css';
import LetterCanvas from './splashScreen/letter/LetterCanvas';
import { Icon, Sidebar, Popup } from 'semantic-ui-react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
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

  setRoute = (route) => {
    this.props.history.push('/' + route);
    this.closeSidebar();
  }

  render() {
    const navIconNames = [
      "home",
      "id card",
      "coffee"
    ];

    const titles = [
      "Home",
      "Me",
      "Contact"
    ]
    const navIcons = navIconNames.map((iconName, index) => {
      return(
        <Popup
          key={iconName+index}
          trigger={
            <Icon
            link
            name={iconName}
            onClick={() => {this.setRoute(titles[index].toLowerCase())}}
            style={styles.navIcon}>
            </Icon>
          }
          content={titles[index]}
          size="mini"
          basic
          inverted
          horizontalOffset={10}
          position='left center'
        />
      )
    });
    return (
      <div style={{height: "100%", width: "100%", position: "relative"}}>
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
          <Route path="/home" exact component={LetterCanvas} />
          <Route path='/' exact>
            <Redirect to="home" />
          </Route>
          <Route path="/me" component={LetterCanvas} />
          <Route path="/contact" component={LetterCanvas} />
          <Route component={LetterCanvas} />
        </Switch>
      </div>
    );
  }
}

const styles = {
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
