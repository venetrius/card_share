import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';

class CardContact extends Component {

  render(){
    const attendee = this.props.attendee;

    if(attendee.last_name){
      return (
        <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Contact Info
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {attendee.position} <br/>
              {attendee.company} <br/>
              {attendee.email}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      );
    } else {
      return (null);
    }
  }
}

export default CardContact;
