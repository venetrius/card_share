import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'

class CardInterests extends Component {

  render(){
    const attendee = this.props.attendee;

    return (
      <Container>
        <ListGroup>
          <ListGroup.Item>Haves {attendee.haves}</ListGroup.Item>
          <ListGroup.Item>Wants {attendee.wants}</ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

export default CardInterests;
