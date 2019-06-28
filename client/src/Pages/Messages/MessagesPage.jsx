import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import LoginForm from '../../Common/LoginForm.jsx';

class MessagesPage extends Component {

  render(){
    return (
      <div>
        Hello from the MessagesPage!!

        Temp Storage for Login Form!
        <Container>
          <LoginForm categories={this.props.categories} subCategories={this.props.subCategories} user={this.props.user}/>
        </Container>
      </div>
    );
  }
}

export default MessagesPage;