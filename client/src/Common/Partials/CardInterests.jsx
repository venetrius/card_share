import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'

class CardInterests extends Component {

  render(){
    let userInfo = null;
    if (this.props.attendee) {
      userInfo = this.props.attendee;
    }
    if (this.props.profile) {
      userInfo = this.props.profile;
    }

    return (
      <Container>
        <ListGroup>
          <ListGroup.Item>Haves {userInfo.haves}</ListGroup.Item>
          <ListGroup.Item>Wants {userInfo.wants}</ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

export default CardInterests;
