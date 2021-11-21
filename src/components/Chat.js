import React, { Component } from "react";

import { Grid } from "semantic-ui-react";

import Aside from "./Aside";
import Messages from "./Messages";
import MessageForm from "./MessageForm";

import { connect } from "react-redux";

import { actionCreators } from "../actions/actionCreators";

export class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member: this.props.member,
      memberId: "",
      messages: [],
      members: [],
    };
  }

  componentDidMount() {
    if (this.props.member.memberName !== "empty") {
      this.drone = new window.Scaledrone("hFL3D3yCpvvPuKNX", {
        data: this.state.member,
      });

      this.drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }

        const memberId = this.drone.clientId;
        this.setState({ memberId: memberId, messages: [] });

        this.props.memberIdReducer(memberId);
      });

      const room = this.drone.subscribe("observable-room");

      room.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
      });

      room.on("members", (memberList) => {
        this.setState({ members: memberList });
      });

      room.on("member_join", (member) => {
        const members = this.state.members;

        members.push(member);
        this.setState({ members });
      });

      room.on("message", (message) => {
        const messages = this.state.messages;
        const { data, id, timestamp, clientId, member } = message;

        messages.push({ id, text: data, timestamp, clientId, member });
        this.setState({ messages });
      });
    }
  }

  render() {
    return (
      <Grid columns="equal" className="app">
        <Aside members={this.state.members} />
        <Messages
          messages={this.state.messages}
          currentMember={this.state.memberId}
        />
        <MessageForm sendMessage={this.sendMessage} />
      </Grid>
    );
  }

  sendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

const mapStateToProps = (state) => {
  return {
    member: state.memberReducer.member,
    memberId: state.memberIdReducer.memberId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memberIdReducer: (memberId) =>
      dispatch(actionCreators.addMemberId(memberId)),
    isLoggedInReducer: (isLoggedIn) =>
      dispatch(actionCreators.loggingIn(isLoggedIn)),
    isLoggedOutReducer: (isLoggedOut) =>
      dispatch(actionCreators.loggingOut(isLoggedOut)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
