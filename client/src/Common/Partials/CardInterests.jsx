import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup'

class CardInterests extends Component {

  render(){
    const subCategories = this.props.subCategories
    console.log("Logging from CardPage: ", subCategories);
    let userInfo = null;
    if (this.props.attendee) {
      userInfo = this.props.attendee;
    }
    if (this.props.profile) {
      userInfo = this.props.profile;
    }
    console.log("Logging from CardPage: ", userInfo.haves);

    return (
      <Container>
        <ListGroup>
          <ListGroup.Item>Haves
            {userInfo.haves.map(
              (have) =>
               console.log('fdsfsf', subCategories.find((category) => category.id === have))
               )}
          </ListGroup.Item>
          <ListGroup.Item>Wants {userInfo.wants}</ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

export default CardInterests;

// .map((category) => category.name)
