import React, { Component, Fragment } from "react";
import InputText from "./InputText/InputText";
import firebase from "../../Firebase/firebase";
import Message from "./Message/Message";
import OrderListChat from "./OrderListChat/OrderListChat";
// import Toggle from "./Toggle";

class ChatApp extends Component {
  state = {
    messages: []
  };

  // Runs when app starts and/or when page loads
  // "on" is to constantly listen to changes
  // Here we listen on changes on the databas and update the state
  // With the this.auth() we update our "user" state with the displayname of the logged in google account
  componentDidMount() {
    firebase
      .database()
      .ref("messages")
      .on("child_added", snapshot => {
        const currentMessages = [...this.state.messages];
        currentMessages.push({
          content: snapshot.val(),
          id: snapshot.key
        });
        this.setState({ messages: currentMessages });
      });

    firebase
      .database()
      .ref("messages")
      .on("child_removed", snapshot => {
        let currentMessages = [...this.state.messages];
        for (let i = 0; i < currentMessages.length; i++) {
          if (currentMessages[i].id === snapshot.key) {
            currentMessages.splice(i, 1);
          }
        }

        this.setState({ messages: currentMessages });
      });

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.state.messages.length) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Timestamp function that will be called everytime we submit a new message
  getCurrentDate = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return `${date}, ${time}`;
  };

  submitMessage = value => {
    const nextMessage = {
      sender: this.props.user.displayName,
      timestamp: this.getCurrentDate(),
      uniquePostId: firebase.database.ServerValue.TIMESTAMP,
      text: value // argument passed in submitMessage function
    };

    firebase
      .database()
      .ref("messages")
      .push(nextMessage);
  };

  // This function gets called when the admin deletemessage button is clicked. It deletes the message from the database
  deleteMessage = del => {
    firebase
      .database()
      .ref(`messages/${del}`)
      .remove();
  };

  currentMessage = messagesArray => {
    return messagesArray.map(message => (
      <Message
        key={message.content.uniquePostId}
        textvalue={message.content.text}
        timestamp={message.content.timestamp}
        getSender={message.content.sender}
        user={this.props.user}
        deleteMessage={this.deleteMessage}
        keyDelete={message.id}
      />
    ));
  };

  render() {
    return (
      <Fragment>
        <br />
        <div className="containerMessage">
          {this.currentMessage(this.state.messages)}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />

          {/* lägg diven här diven ska innehålla ett card tillsammans med meddelanden
          cardet ska ha position relative och bilden som läggs in i cardet ska ha position absolute
          bilden ska ha 50px top-25 left -25  */}
        </div>
        <InputText submitMessage={this.submitMessage} />
      </Fragment>
    );
  }
}

export default ChatApp;
