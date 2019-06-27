import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

class BusinessCard extends Component {

  render(){
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <Card.Title>Mickey Mouse</Card.Title>

        </Card.Header>
      


        <Card.Body>

          <Card.Text>
            This is my tagline!!
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
