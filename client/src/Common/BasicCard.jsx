import React, {Component} from 'react';
// import CardActions from './Partials/CardActions.jsx';
// import CardIcons from './Partials/CardIcons.jsx';
import CardInterests from './Partials/CardInterests.jsx';
// import CardContact from './Partials/CardContact.jsx';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'

class SharedCard extends Component {

  render(){
    const profile = this.props.profile;
    console.log(profile)
    return (
      <Card>
        <Card.Header>
          <Card.Title>
            {/* {profile.first_name} {profile.last_name} */}
          </Card.Title>
          {/* <CardIcons profile={profile}/> */}
        </Card.Header>

        <Card.Body>
          <Container>
            <Row>
              {/* <Col xs={4} md={4}>
                <Image src={profile.photo} rounded width={120} height={120} alt="120x120"/>
              </Col> */}
              {/* <Col xs={8} md={8}> */}
                <CardInterests profile={profile}/>
              {/* </Col> */}
            </Row>
          </Container>

          {/* <CardContact profile={profile}/> */}

          <Card.Text>
            {"This is my tagline " + profile.tagline}
          </Card.Text>

        </Card.Body>

        <Card.Footer>
          {/* <CardActions profile={profile}/> */}
        </Card.Footer>
      </Card>
    );
  }
}

export default SharedCard;

