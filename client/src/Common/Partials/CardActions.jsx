import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'


function connectionActions(attendee_id, connection, actions) {
  if (!connection) {
    return (
      <Button onClick={() => actions.requestConnection(attendee_id)} variant="outline-success" size="sm">Connect</Button>
    );
  } else if(connection.status == 'CONNECTED') {
    return (<span>CONNECTED</span>);
  } else if(connection.status == 'DECLINED') {
    return (<span>DECLINED</span>);
  } else if(attendee_id == connection.sender) {
    return (
      <ButtonToolbar>
        <Button onClick={() => actions.acceptConnection(attendee_id)} variant="outline-success" size="sm">Accept</Button>
        <Button onClick={() => actions.ignoreConnection(attendee_id)} variant="outline-danger" size="sm">Ignore</Button>
      </ButtonToolbar>
    )
  } else {
    return (<span>PENDING CONNECTION</span>)
  }
}


function cardActionsSend(attendee_id, cards, actions) {
  if (!cards || cards.to !== 'SENT') {
    return (
      <Button onClick={() => actions.sendCard(attendee_id)} variant="outline-success" size="sm">Send Card</Button>
    );
    
  }
}

function cardActionsRecieved(attendee_id, cards, actions) {
  if (cards){
    const from = cards.from;
    if(from == 'PENDING') {
      return (
        <ButtonToolbar>
        <Button onClick={() => actions.saveCard(attendee_id)} variant="outline-success" size="sm">Save</Button>
        <Button onClick={() => actions.deleteCard(attendee_id)} variant="outline-danger" size="sm">Delete</Button>
      </ButtonToolbar>
      );
    } else if (cards.from == 'SAVED') {
      return (
        <Button onClick={() => actions.deleteCard(attendee_id)} variant="outline-success" size="sm">Delete</Button>
      )
    }
  }
}



class CardActions extends Component {

  render(){
    const attendee = this.props.attendee;
    const actions = this.props.actions;
    return (
      <ButtonToolbar>
        {cardActionsSend(attendee.id, attendee.cards, actions)}
        {cardActionsRecieved(attendee.id, attendee.cards, actions)}
        {connectionActions(attendee.id, attendee.connection, actions)}
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
