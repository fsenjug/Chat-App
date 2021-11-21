import React, { Component } from "react";
import { Segment, Button, Input, Grid, Message, Form } from "semantic-ui-react";

export class MessageForm extends Component {
  state = { text: "", errors: [] };

  isMessageValid = () => {
    let errors = [];
    let error;

    if (this.isMessageEmpty(this.state)) {
      error = { message: "Write your message" };
      console.log("Write your message");
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isTextValid(this.state)) {
      error = {
        message: "The message can have a maximum of 160 characters",
      };
      console.log("The message can have a maximum of 160 characters");
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isMessageEmpty = ({ text }) => {
    return !text.length;
  };

  isTextValid = ({ text }) => {
    if (text.length > 160) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  onChange = (event) => {
    const entry = event.target.value;
    this.setState({ text: entry });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.isMessageValid()) {
      this.setState({ text: "", errors: [] });
      this.props.sendMessage(this.state.text);
    }
  };

  render() {
    const { text, errors } = this.state;

    return (
      <Grid.Column style={{ marginLeft: 320 }} className="message-form-column">
        <Form onSubmit={this.onSubmit}>
          <Segment className="message-form">
            <Input
              fluid
              name="text"
              onChange={this.onChange}
              value={text}
              style={{ marginBottom: "0.7em" }}
              label={
                <Button
                  content="Add Message"
                  labelPosition="left"
                  icon="edit"
                  style={{ background: "#1f61c4", color: "#ffffff" }}
                />
              }
              placeholder="Write your message"
            />
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {this.displayErrors(errors)}
          </Message>
        )}
      </Grid.Column>
    );
  }
}

export default MessageForm;
