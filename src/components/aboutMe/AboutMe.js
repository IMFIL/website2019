import React, { Component } from 'react';
import './AboutMe.css';
import { Grid, Header } from 'semantic-ui-react';
import anime from 'animejs';

class AboutMe extends Component {
  constructor(props) {
    super(props);

    const schools = [
      {
        name: "University Of Ottawa",
        title: "Bachelor of Applied Science (B.A.Sc.), Software Engineering (CO-OP)",
        description: "• Dean's Honour List | GPA 4.0/4.0. " +
        "• Recipient of the RBC Entrepreneurship Scholarship. " +
        "• Recipient of the Dean's List Schorlarship 4 years in a row. "
      },
    ]

    this.topicTexts = [
      "about",
      "interests",
      "work",
      "education"
    ];

    const workPlaces = [
      {
        name: "Noibu",
        title: "Co-Founder | Technical Lead",
        description: "• Lead a team of 3 engineers to create virtual store experiences. "+
      "• Implemented workflow processes to increase technical output. "+
      "• Designed scalable architecture that allows clients to create their own virtual store experiences. "+
      "• Met with clients, investors and users in order to ensure optimal technological decisions."
      },
      {
        name: "Neappoli",
        title: "Architect | Founding Team Member",
        description: "• Met with numerous city officials to validate the service and partner with their respective cities. "+
        "• Ported business logic into a scalable server architecture, increasing response speed by 80%. "+
        "• Developed Neappoli’s Android mobile application."
      },
      {
        name: "IBM",
        title: "EB | Software Engineer Intern",
        description: "• Ideated and developed a mobile ecosystem for IBM’s security suite that allowed users to react 7X "+
        "faster when a security threat was detected. "+
        "• Pitched a prototype in front of executives and received 2M$ in funding to develop the product. "+
        "• Received executive level training to present, communicate and act in front of customers and "+
        "business partners"
      },
      {
        name: "Ciena",
        title: "Software Developer",
        description: "• Created an Ember web application which allowed Telecommunication companies to view, edit and "+
        "delete networking nodes. "+
        "• Redesigned a network route provisioning view which received 93% customer approval. "
      },
      {
        name: "Nokia",
        title: "Software Designer",
        description: "• Developed, tested and maintained a multitude of networking alarms which allowed communication "+
        "companies to understand the states of their cellular towers. "+
        "• Abstracted the concept of network alarms to enable dynamic creation of alarms, which allowed an "+
        "unlimited amount of alarms to be created "
      },
    ];

    const workElements = workPlaces.map(wObject => {
      return(
        <div key={wObject.name} style={styles.workContainer}>
          <p style={styles.workText}>
            {wObject.name}
          </p>
          <p style={styles.workTitleText}>
            {wObject.title}
          </p>
          <p style={styles.workTextDescription}>
            {wObject.description}
          </p>
        </div>
      )
    });

    const schoolElements = schools.map(sObject => {
      return (
        <div key={sObject.name} style={styles.workContainer}>
          <p style={styles.workText}>
            {sObject.name}
          </p>
          <p style={styles.workTitleText}>
            {sObject.title}
          </p>
          <p style={styles.workTextDescription}>
            {sObject.description}
          </p>
        </div>
      )
    });

    this.topicContent = [
      <p style={styles.meText}>
        Co-Founder and Technical lead at Noibu,
        a startup that helps retailers create a consistent online and offline customer journey.
        Strong technical experience gained through working at IBM, Nokia and Ciena in software engineering roles.
        I am passionate about how business strategy translates into a strong technical product.
      </p>,
      <p style={styles.meText}>
        Reading | Running | Product Development | Coding
      </p>
      ,
      workElements
      ,
      schoolElements
    ]

    this.sinAngles = [];
    this.boxRefs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef()
    ]

    this.state = {
      width: "70%",
      currentTopic: 0,
      maxHeight: "90%",
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.deleteAnimeRef();
  }

  componentDidMount() {
    this.sinAngles = this.topicTexts.map((topic, index) => {
       return (Math.PI*2/this.topicTexts.length * index);
    });
    this.animate();
    window.addEventListener("resize", this.handleResize);
  }

  handleTopicClick = (index) => {
    this.setState({
      currentTopic: index
    })
  }

  deleteAnimeRef = () => {
    this.boxRefs.forEach(ref => {
      anime.remove(ref.current);
    })
  }

  animate = () => {
    this.topicTexts.forEach((topic, index) => {
      const animateObject = {
        ref: this.boxRefs[index].current,
        angle: this.sinAngles[index]
      }
      this._animate(animateObject);
    })
  }
  _animate = (aObject) => {
    anime({
      targets: aObject.ref,
      translateY: Math.sin(aObject.angle) * 2 + 10,
      duration: 0,
      loop: false,
      autostart: false,
      easing: 'linear',
      complete: () => {
        const animateObject = {
          angle: aObject.angle + Math.PI/180*4,
          ref: aObject.ref
        }
        this._animate(animateObject);
      }
    });
  }

  handleResize = () => {
    const wWidth = window.innerWidth;
    let width = "70%";
    let maxHeight = "90%";

    if(wWidth >= 550 && wWidth <= 1000) {
      width = "85%"
    }

    else if(wWidth <= 550) {
      width = "90%"
    }

    if(wWidth <= 765) {
      maxHeight = "fit-content";
    }

    this.setState({
      width,
      maxHeight
    })
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    let aboutMeContainerProps = {
      ...styles.aboutMeContainer,
      width: this.state.width
    };

    const textualContentCol = {
      ...styles.textualContentCol,
      maxHeight: this.state.maxHeight
    }

    const topics = this.topicTexts.map((topic, index) => {
      let borderColorStyle = {

      }
      if(index === this.state.currentTopic) {
        borderColorStyle.borderColor = "#0D14ED"
      }
      return(
        <div
        className="topicContainer"
        ref={this.boxRefs[index]}
        id={topic.toUpperCase()}
        key={topic}
        onClick={() => this.handleTopicClick(index)}
        style={{
          ...styles.singleTopicContainer,
          ...borderColorStyle
        }}>
          <p
          className="topicText"
          style={styles.topicText}>
            {topic.toUpperCase()}
          </p>
        </div>
      )
    })
    return (
      <div style={aboutMeContainerProps}>
        <Grid style={styles.aboutMeGrid} stackable columns={2} padded>
          <Grid.Column style={textualContentCol} width={8}>
            <Header
            style={styles.header}
            as='h1'>
              Hey, I'm Fil.
            </Header>
              {this.topicContent[this.state.currentTopic]}
          </Grid.Column>
          <Grid.Column width={8}>
            <div style={styles.topicsContainer}>
              {topics}
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const styles = {
  aboutMeGrid: {
    height: "100%"
  },
  textualContentCol: {
    overflowX: "hidden"
  },
  workTextDescription: {
    fontSize: 19,
    color: "#C0C0C0",
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif"
  },
  workContainer: {
    marginBottom: 30
  },
  workText: {
    margin: 0,
    fontSize: 22,
    color: "#C0C0C0",
    fontWeight: 300,
    fontFamily: "'Nunito', sans-serif",
  },
  workTitleText: {
    fontSize: 20,
    color: "#C0C0C0",
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif",
  },
  singleTopicContainer: {
    border: "0.7px white solid",
    borderRadius: "0.2em",
    width: "70%",
    cursor: "pointer",
    height: 50,
    marginBottom:15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topicText: {
    fontSize: 13,
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif",
  },
  topicsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  aboutMeContainer: {
    marginTop: 100,
  },
  meText: {
    fontSize: 22,
    marginBottom: 20,
    color: "#C0C0C0",
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif",
  },
  techText: {
    fontSize: 22,
    color: "#C0C0C0",
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif",
  },
  header: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: 300,
    fontFamily: "'Nunito', sans-serif",
    marginBottom: 50
  }
}

export default AboutMe;
