import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, GridRow } from "semantic-ui-react";
import { connect } from "react-redux";
import { actionCreators } from "../actions/actionCreators";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

export class UserMenu extends Component {
  dropdownOptions = () => [
    {
      key: "memberName",
      text: (
        <span>
          Logged in as <strong>{this.props.member.memberName}</strong>
        </span>
      ),
    },
    {
      key: "memberId",
      text: (
        <span>
          User ID: <strong>{this.props.memberId}</strong>
        </span>
      ),
    },
    { key: "onLogout", text: <span onClick={this.onLogout}>Logout</span> },
  ];

  onLogout = () => {
    this.props.isLoggedInReducer(false);
    this.props.isLoggedOutReducer(true);
  };

  render() {
    if (this.props.isLoggedOut === true) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    return (
      <Grid style={{ background: "#1f61c4" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Icon name="comments outline" />
              <Header.Content>Chat</Header.Content>
            </Header>
          </Grid.Row>
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>USERNAME</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    member: state.memberReducer.member,
    memberId: state.memberIdReducer.memberId,
    isLoggedOut: state.isLoggedOutReducer.isLoggedOut,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedInReducer: (isLoggedIn) =>
      dispatch(actionCreators.loggingIn(isLoggedIn)),
    isLoggedOutReducer: (isLoggedOut) =>
      dispatch(actionCreators.loggingOut(isLoggedOut)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserMenu)
);
