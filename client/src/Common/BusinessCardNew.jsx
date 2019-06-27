import React, {Component} from 'react';
// import Interests from './Partials/Interests.jsx';
import CardActions from './Partials/CardActions.jsx';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'

class BusinessCard extends Component {

  render(){
    const attendee = this.props.attendee;
    return (
      <Card>
        <Card.Header>
          <Card.Title>
            {attendee.first_name} {attendee.last_name}
          </Card.Title>

        </Card.Header>


        <Card.Body>
          <Container>
            <Row>
              <Col xs={4} md={4}>
                <Image src="https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png" rounded width={120} height={120} alt="120x120"/>
              </Col>
              <Col xs={8} md={8}>
                <Container>
                  <ListGroup>
                    <ListGroup.Item>Haves {attendee.haves[0]}</ListGroup.Item>
                    <ListGroup.Item>Wants {attendee.wants[0]}</ListGroup.Item>
                  </ListGroup>
                </Container>
              </Col>
            </Row>
          </Container>

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


          <Card.Text>
            {attendee.tagline}
          </Card.Text>

        </Card.Body>




        <Card.Footer>
          <CardActions attendee={attendee}/>
        </Card.Footer>
      </Card>
    );
  }
}

export default BusinessCard;


// "id":1000003
// "user_id":1000003
// "event_id":1000001
// "email_address":"gi@gmail.com"
// "first_name":"Gi"
// "last_name":"Gilast"
// "position":null
// "company":null
// "linkedin-link":"https://www.linkedin.com"
// "tagline":null
// "created_at":"2019-06-26T20:22:13.722Z"
// "haves":["1000008","1000010","1000016","1000019","1000023"]
// "wants":["1000008","1000010","1000016","1000019","1000023"]
