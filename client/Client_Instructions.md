## Start up client server

 - navigate to the client folder `cd client`.
 - install dependencies `npm install`.
 - start server `npm start`
 - open a web browser at `http://localhost:3000/`


 ### Planning

 User
  - first name
  - last name
  - title
  - company
  - contact
    - phone number
    - email
    - linkedin (link)

User - Views
  - view and edit user profile

Attendee - Additional Information
  - event-id
  - tagline
  - want x 5 max
  - have x 5 max

Attendee - Views
 - view and edit attendee profile


## General View Setup
  Edit option for all profile items (edit icon)

Views - Contect of an Event

- profile - PERSON
  - basic
    - edit
  - connected
    - edit
  - shared
    - edit


- network/group - attendee list - everyone except for saved cards - GROUP
  - filter - they have, they want, connections
  - attendee
    - connection
      - send request
      - recieve request
      - connected
    - messages
      - send message
      - uread/recieved
    - card exchange
      - send card
      - save card
      - delete card
      - recieved card


- contacts/contact cards (saved cards) - CARD
  - search
  - delete


- notifications - BELL - Top
  - someone requested a connection
  - someone accepted your connection
  - someone sent you a message
  - someone sent you a contact card

- messages - MESSAGE/TEXT - SPEACH BUBBLE



### App Header

### App Footer