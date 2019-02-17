import React, { Component } from 'react';
import './App.css';
import LetterCanvas from './splashScreen/letter/LetterCanvas';
import { Icon, Sidebar, Popup } from 'semantic-ui-react';

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
    console.log(this.state)
    this.setState({
      sidebarOpen: true
    })
  }

  closeSidebar = () => {
    console.log(this.state)
    this.setState({
      sidebarOpen: false
    })
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
        <div>
          <Popup
            trigger={
              <Icon
              link
              name={iconName}
              style={styles.navIcon}/>
            }
            content={titles[index]}
            size="mini"
            basic
            inverted
            horizontalOffset={10}
            position='left center'
          />
        </div>
      )
    });
    return (
      <div style={{height: "100%", width: "100%", position: "relative"}}>
        <Icon
        onClick={() => {this.openSidebar()}}
        className={this.state.sidebarOpen ? 'menuIconOpen fadeOut' : 'menuIconOpen fadeIn'}
        name="bars"/>
        <LetterCanvas/>
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

export default App;
