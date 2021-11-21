import React, { Component } from "react";
import { Segment, Header, Comment, Icon, Grid } from "semantic-ui-react";

export class Messages extends Component {
  displayMessage(message, currentMember) {
    const { id, text, timestamp, clientId, member } = message;

    const isMyMessage = () => {
      return currentMember === clientId
        ? "message-currentmember"
        : "message-others";
    };

    let unixTimestamp = timestamp;

    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    let date = new Date(unixTimestamp * 1000);

    let year = date.getFullYear();

    let month = months[date.getMonth()];

    let day = date.getDate();

    let hours = date.getHours();

    let minutes = "0" + date.getMinutes();

    let seconds = "0" + date.getSeconds();

    let newTimestamp =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      "|" +
      " " +
      hours +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2);

    return (
      <Comment key={id}>
        <Comment.Content className={isMyMessage()}>
          <Comment.Author as="a">{member.clientData.memberName}</Comment.Author>
          <Comment.Metadata>{newTimestamp}</Comment.Metadata>
          <Comment.Text>{text}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }

  render() {
    const { messages, currentMember } = this.props;

    return (
      <Grid.Column style={{ marginLeft: 320 }} className="messages-column">
        <React.Fragment>
          <Segment className="messages-segment">
            <Header as="h3" dividing style={{ color: "#1f61c4" }}>
              <Icon name="comments outline" /> Messages
            </Header>
            <Comment.Group className="messages">
              {messages.map((message) =>
                this.displayMessage(message, currentMember)
              )}
            </Comment.Group>
          </Segment>
        </React.Fragment>
      </Grid.Column>
    );
  }
}

export default Messages;
