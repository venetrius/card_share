import React, {Component} from 'react';
// import Interests from './Interests.jsx';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'

class BusinessCard extends Component {

  render(){
    return (
      <Card>
        <Card.Header>
          <Card.Title>
            {this.props.first_name} {this.props.last_name}
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
                    <ListGroup.Item>Haves {this.props.haves[0]}</ListGroup.Item>
                    <ListGroup.Item>Wants {this.props.wants[0]}</ListGroup.Item>
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
                  {this.props.position} <br/>
                  {this.props.company} <br/>
                  {this.props.email}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>


          <Card.Text>
            {this.props.tagline}
          </Card.Text>

        </Card.Body>




        <Card.Footer>
          <Button variant="primary"> Send Contact</Button>
          <Button variant="primary"> + Connect</Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default BusinessCard;


{/* <div class="contact-card">
  <div class="card-header">
    <span class="name">Mickey Mouse</span>
    <span class="icons">@ :) :(</span>
  </div>

  <div class="card-body">
    <div class="body-top">
      <img
        class="photo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl4bUaJNFWtDHNtymDHN23ZZjwNCF7h_TnU6CycbuTQDI45b3i"
      />
      <div class="topics">
        <img src="https://i.stack.imgur.com/CiB0A.png" />
      </div>
    </div>

    <div class="body-middle">
      <p>
        Title: Actor <br />
        Company: Disney<br />
        Phone: 555-555-5555<br />
        Email: m_mouse@disney.com<br />
        LinkedIn Button
      </p>
    </div>

    <div class="body-bottom">
      <p>
        Out of work actor looking for a new show on the Disney Channel
      </p>
    </div>
  </div>

  <div class="card-footer">
    <button>Sent Contact</button>
    <button>Connect</button>
  </div>
</div> */}



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
