import React, { Component } from 'react';
import './Contact.css';
import { Grid,
  Form,
  Icon,
  Header,
  Input,
  TextArea,
  Message,
  Button } from 'semantic-ui-react';
  import axios from 'axios';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: "70%",
      email: "",
      message: "",
      success: false,
      failed: false,
      sending: false
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.setState({ sending: true }, () => {
      axios({
        method: "post",
        url: "https://us-central1-personalwebsite2019.cloudfunctions.net/sendFeedback",
        data: {
          email: this.state.email,
          message: this.state.message
        }
      })
        .then(response => {
          this.setState({ success: true, sending: false });
        })
        .catch(error => {
          this.setState({ failed: true, sending: false });
        });
    });
  };


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
            or if you just want to say hey.
            </p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div style={styles.formContainer}>
              <Form
                style={styles.submitFeedbackForm}
                onSubmit={this.handleSubmit}
                inverted
                success={this.state.success}
                error={this.state.failed}
              >
                <Form.Field
                  required
                  control={Input}
                  label="Email:"
                  name="email"
                  value={this.state.email}
                  type="email"
                  onChange={this.handleChange}
                  placeholder="email@example.com"
                  disabled={this.state.success || this.state.failed}
                />
                <Form.Field
                  required
                  control={TextArea}
                  label="Message:"
                  name="message"
                  value={this.state.message}
                  placeholder="Hey"
                  style={styles.feedbackTextArea}
                  onChange={this.handleChange}
                  disabled={this.state.success || this.state.failed}
                />
                <Message
                  error
                  header="Oops! Something went wrong"
                  content="Try again later"
                />
                <Message
                  success
                  header="Sent !"
                  content="Thank you for the feedback"
                />
                <Form.Group style={styles.buttonGroup}>
                  <Form.Button
                    icon
                    style={styles.sendButton}
                    disabled={
                      this.state.success || this.state.failed || this.state.sending
                    }
                    loading={this.state.sending}
                  >
                    <Icon name="mail forward" />
                  </Form.Button>
                </Form.Group>
              </Form>

            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const styles = {
  sendButton: {
    backgroundColor: "#0D14ED",
    color: "white"
  },
  submitFeedbackForm: {
    width: "80%"
  },
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
  feedbackTextArea: {
    minHeight: 150
  },
  buttonGroup: {
    float: "right",
    paddingTop: 6
  }
}

export default Contact;
