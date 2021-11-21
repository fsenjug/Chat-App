import React, { Component } from "react";
import { Menu, List, Grid, Header, Dropdown } from "semantic-ui-react";
import UserMenu from "./UserMenu";

export class Aside extends Component {
  dropdownOptions = () => [
    {
      key: "members",
      text: (
        <List>
          {this.props.members.map((member) => (
            <List.Item key={member.id} style={{ color: "#000000" }}>
              {member.clientData.memberName}
            </List.Item>
          ))}
        </List>
      ),
    },
  ];

  render() {
    return (
      <Menu
        size="huge"
        inverted
        fixed="left"
        vertical
        style={{ background: "#1f61c4", fontSize: "1.2rem" }}
        className="menu"
      >
        <UserMenu />
        <Grid style={{ background: "#1f61c4" }}>
          <Grid.Column>
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={<span>CHAT ROOM</span>}
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Column>
        </Grid>
      </Menu>
    );
  }
}

export default Aside;
