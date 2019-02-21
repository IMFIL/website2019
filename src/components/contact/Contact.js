import React, { Component } from 'react';
import './Contact.css';
import { Grid } from 'semantic-ui-react';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "70%"
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }


  handleResize = () => {
    const wWidth = window.innerWidth;
    let width = "70%"

    if(wWidth >= 550 && wWidth <= 1000) {
      width = "85%"
    }

    else if(wWidth <= 550) {
      width = "90%"
    }

    this.setState({
      width,
    })
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    let contactContainerProps = {
      ...styles.contactContainer,
      width: this.state.width
    };

    return (
      <div style={contactContainerProps}>
        <Grid style={styles.contactGrid} stackable columns={2} padded>
          <Grid.Column width={8}>
            <p style={styles.contactMeText}>
            Speaking with other developers, designers, entrepreneurs and people in general is
            always refreshing. Contact me through this form if you have any recomendations, critiques
            or if you just want to say hello.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div style={styles.formContainer}>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const styles = {
  contactGrid: {
    height: "100%"
  },
  contactContainer: {
    marginTop: 100,
  },
  contactText: {
    fontSize: 22,
    marginBottom: 20,
    color: "#C0C0C0",
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif",
  },
  contactMeText: {
    fontSize: 22,
    marginBottom: 20,
    color: "#C0C0C0",
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
}

export default Contact;
