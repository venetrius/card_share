import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class CardActions extends Component {

  render(){
    return (
      <ButtonToolbar>
        <Button variant="outline-primary" size="sm">Send Connection</Button>
        <Button variant="outline-secondary" size="sm">Secondary</Button>
        <Button variant="outline-success" size="sm">Contact</Button>
        <Button variant="outline-warning" size="sm">Warning</Button>
        <Button variant="outline-danger" size="sm">Danger</Button>
        <Button variant="outline-info" size="sm">Info</Button>
        <Button variant="outline-light" size="sm">Light</Button>
        <Button variant="outline-dark" size="sm">Dark</Button>
      </ButtonToolbar>
    );
  }
}

export default CardActions;