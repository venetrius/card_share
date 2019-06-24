import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

class BusinessCard extends Component {

  render(){
    return (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>First Last</Card.Title>
        <Card.Text>
          This is my tagline!!
        </Card.Text>
        <Button variant="primary"> + Connect</Button>
      </Card.Body>
    </Card>
    );
  }
}

export default BusinessCard;