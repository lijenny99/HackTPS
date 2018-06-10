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
    this.socket.on("message", (data) => {
      let messages = this.state.messages;
      let id = Date.now().toString();
      messages[id] = data.message.text;
      this.setState({ messages: messages })

      console.log(data);
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }




  send_message(message, cb) {

    let data = {
      client_id: this.user.client_id,
      user_id: this.user.user_id,
      message: { text: message, id: Date.now().toString(), sender: "operator" }
    }
    this.socket.emit("message", data);
    let messages = this.state.messages;
    let id = Date.now().toString();
    messages[id] = message;
    this.setState({ messages: messages });
    console.log(`${message} sent`);
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
          <Grid item xs={2} />
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
