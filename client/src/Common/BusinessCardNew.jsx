import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

class BusinessCard extends Component {

  render(){
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <Card.Title>{this.props.first_name} {this.props.last_name}</Card.Title>

        </Card.Header>
      


        <Card.Body>

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
