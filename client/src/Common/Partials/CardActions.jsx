import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

function connectionActions(attendee_id, connection) {
  if (!connection) {
    return (
      <Button variant="outline-primary" size="sm">Connect</Button>
    );
  } else if(connection.status == 'CONNECTED') {
    return (<span>CONNECTED</span>);
  } else if(attendee_id == connection.sender) {
    return (
      <span>
        <Button variant="outline-success" size="sm">Accept</Button>
        <Button variant="outline-danger" size="sm">Ignore</Button>
      </span>
    )
  } else {
    return (<span>PENDING CONNECTION</span>)
  }
}



class CardActions extends Component {

  render(){
    const attendee = this.props.attendee;

    return (
      <ButtonToolbar>
        {connectionActions(attendee.id, attendee.connection)}
        <Button variant="outline-primary" size="sm">Share Card</Button>
      </ButtonToolbar>
    );
  }
}

export default CardActions;

{/*
connection: {"sender":1000002,"status":"SENT"}

---> if(!attendee.connection) {
  <button onClick={() => this.requestConnection() } > Connect </button>
  
  else if(attendee.connection.status != 'CONNECTED')
  <button onClick={() => this.acceptConnection() } > Accept </button>
  <button onClick={() => this.ignoreConnection() } > Ignore </button>

}


cards: {"from":"PENDING"}
<button onClick={() => this.sendCard() } > sendCard </button>

<button onClick={() => this.saveCard() } > saveCard </button>
<button onClick={() => this.deleteCard() } > deleteCard </button> 
*/}
