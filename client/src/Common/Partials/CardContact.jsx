import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';

class CardContact extends Component {

  render(){
    let userInfo = null;
    if (this.props.attendee) {
      userInfo = this.props.attendee;
    }
    if (this.props.profile) {
      userInfo = this.props.profile;
    }

    if(userInfo.last_name){
      return (
        <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Contact Info
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {userInfo.position} <br/>
              {userInfo.company} <br/>
              {userInfo.email_address}
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
