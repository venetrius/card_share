import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Categories from '../Pages/Profile/Categories.jsx';

class LoginForm extends Component {

  render(){
    const user = this.props.user;
    console.log(user)
    return (

      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home" disabled>
          
        </Tab>

        <Tab eventKey="profile" title="Login Profile"> 
          <Card>
            <Card.Header>
              <Row>
                <Col xs={9} md={9}>
                  <Card.Title>
                    {user.first_name} {user.last_name}
                  </Card.Title>
                </Col>
                <Col xs={3} md={3}>
                  <Button as="input" type="submit" value="Submit" size="sm"/>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <Form>
              <Container>
                <Row>
                  <Col xs={5} md={5}>
                    <Image src="https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png" rounded width={100} height={100} alt="100x100"/>
                  </Col>
                  <Col xs={7} md={7}>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Control type="position" placeholder="Position"/>
                        <Form.Control type="company" placeholder="Company"/>
                        <Form.Control type="phone" placeholder="Phone Number"/>
                        <Form.Control type="email" placeholder="Email"/>
                    </Form.Group>
                  </Col>
                </Row>
              </Container>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Control type="tagline" placeholder="Enter Tagline Here!"/>
              </Form.Group>

              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="topics" title="Topic Selector">
          Select Some Topics of Interest Here!
          <Categories categories={this.props.categories} subCategories={this.props.subCategories} />
        </Tab>
      </Tabs>
    );
  }
}

export default LoginForm;





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
