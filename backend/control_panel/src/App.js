import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import openSocket from "socket.io-client";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {

      },
      session: '',
      sessions: {},
      message: null,
    };
    this.user = {
      user_id: 'admin',
      client_id: '',
      socket_id: '',
    }
    this.socket = openSocket('https://bravetheheat.herokuapp.com');
    this.socket.on("connect", () => {
      console.log(`Connected with id ${this.socket.id}`);
      this.user.client_id = this.socket.id;

    });
    this.socket.on("open_sessions", (data) => {
      this.setState({ sessions: data })
      console.log(`Received open sessions ${JSON.stringify(data)}`);
    })
    this.socket.on("message", (data) => {
      let messages = this.state.messages;
      let id = Date.now().toString();
      messages[id] = data.message.text;
      this.setState({ messages: messages })

      console.log(data);
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.sessionSubmit = this.sessionSubmit.bind(this);
    this.join_rooms = this.join_rooms.bind(this);
    this.set_session = this.set_session.bind(this);

    this.query = this.query.bind(this);
  }

  get_rooms() {

    this.socket.emit("get_rooms", this.socket.id);
    console.log(`Requested rooms`);
  }

  join_rooms() {
    let data = {
      client_id: this.user.client_id,
      user_id: this.user.user_id,
      session_id: this.state.session
    };
    this.user.session_id = this.state.session;


    this.socket.emit("join_room", data);
    console.log(`${this.state.session} joined`);
  }



  send_message(message, cb) {

    let data = {
      client_id: this.user.client_id,
      user_id: this.user.user_id,
      session_id: this.user.session_id,
      message: { text: message, id: Date.now().toString(), sender: "operator" }
    }
    this.socket.emit("message", data);
    let messages = this.state.messages;
    let id = Date.now().toString();
    messages[id] = message;
    this.setState({ messages: messages });
    console.log(`${message} sent to room ${this.user.session_id}`);
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    this.send_message(this.state.message);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSession(event) {
    this.setState({ session: event.target.value });
  }

  sessionSubmit(e) {
    e.preventDefault();
    this.join_rooms();

  }

  query() {

    this.get_rooms();


  }

  list_sessions() {

  }

  set_session(session) {
    this.setState({ session: session });
    this.join_rooms();
  }


  render() {
    return (
      <div className={styles.root}>
        <Grid container spacing={24}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <form className="messageForm" onSubmit={this.handleSubmit}>
              <TextField
                id="message__"
                label="message"
                value={this.state.message}
                onChange={this.handleChange}
                margin="normal"
              />
              <Button type="submit" value="Submit">
                Submit
              </Button>
            </form>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={this.query}
              color="primary"
            >
              Get sessions
              </Button>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={10}>
            <form className="messageForm" onSubmit={this.sessionSubmit}>
              <TextField
                id="session"
                label="session"
                value={this.state.session}
                onChange={this.handleSession}
                margin="normal"
              />
              <Button type="submit" value="Submit">
                Join Session
              </Button>
            </form>
          </Grid>
          {this.state.messages && Object.keys(this.state.messages).map(id => {
            console.log(id);
            return (
              <Grid item xs={8}>
                {this.state.messages[id]}
              </Grid>
            )
          })}


        </Grid>




      </div>
    );
  }
}

export default App;
