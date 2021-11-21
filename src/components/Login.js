import React, { Component } from "react";
import styles from "./login.module.css";
import {
  Grid,
  Header,
  Icon,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";

import { connect } from "react-redux";

import { actionCreators } from "../actions/actionCreators";

import { Redirect } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: { memberName: "" },
      errors: [],
      loading: false,
    };
  }

  isLoginValid = () => {
    let errors = [];
    let error;

    if (this.isLoginEmpty(this.state)) {
      error = { message: "Fill in username field" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isMemberNameValid(this.state)) {
      error = {
        message: "The username can have a maximum of 8 characters",
      };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isLoginEmpty = ({ member: { memberName } }) => {
    return !memberName.length;
  };

  isMemberNameValid = ({ member: { memberName } }) => {
    if (memberName.length > 8) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  onChange = (event) => {
    const entry = event.target.value;
    this.setState({ member: { memberName: entry } });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.isLoginValid()) {
      this.setState({ errors: [], loading: true });

      this.props.memberReducer(this.state.member);
      this.props.isLoggedInReducer(true);
      this.props.isLoggedOutReducer(false);
    }
  };

  render() {
    const {
      member: { memberName },
      errors,
      loading,
    } = this.state;

    if (this.props.isLoggedIn === true) {
      return <Redirect to={{ pathname: "/chat" }} />;
    }

    return (
      <div className={styles.wrapper}>
        <Grid className={styles.app}>
          <Grid.Column className={styles.loginstyle}>
            <Header
              className={styles.header}
              as="h1"
              icon
              textAlign="center"
              style={{ color: "#1f61c4" }}
            >
              <Icon name="comments outline" />
              Chat Login
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Input
                  className={styles.loginform}
                  fluid
                  icon="user"
                  iconPosition="left"
                  type="text"
                  placeholder="Username"
                  onChange={this.onChange}
                  value={memberName}
                />
                <div>
                  <Button animated color="black">
                    <Button.Content visible>LOGIN</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </div>
              </Segment>
            </Form>
            {errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedInReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memberReducer: (member) => dispatch(actionCreators.addMember(member)),
    isLoggedInReducer: (isLoggedIn) =>
      dispatch(actionCreators.loggingIn(isLoggedIn)),
    isLoggedOutReducer: (isLoggedOut) =>
      dispatch(actionCreators.loggingOut(isLoggedOut)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
