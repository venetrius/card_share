import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Categories extends Component {
  render() {
    const { categories, subCategories } = this.props;
    return (
      <Accordion>
        {categories.map((category) => (
        <Card>
          <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {category.name}
              </Accordion.Toggle>          
          </Card.Header>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Row>
                  <Col xs={6} md={6}> 
                  </Col>
                  <Col xs={3} md={3}>
                    <Form.Text>Wants</Form.Text>
                  </Col>
                  <Col xs={3} md={3}>
                    <Form.Text>Haves</Form.Text>                     
                  </Col>
                </Row>
              {subCategories.filter((subCategory) => subCategory.category_id === category.id).map(subCategory => (             
                <Row>
                  <Col xs={6} md={6}>
                    {subCategory.name}
                  </Col>
                  <Col xs={3} md={3}>
                      <Form.Check inline id={`inline-${'checkbox'}-1`} />
                  </Col>
                  <Col xs={3} md={3}>
                      <Form.Check inline id={`inline-${'checkbox'}-2`} />                      
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        ))}
      </Accordion>
    );
  }
}

export default Categories;