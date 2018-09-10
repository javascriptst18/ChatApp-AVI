import React, { Component } from "react";
import InputTextComponent from "./InputTextComponent";
import firebase from "./firebase";
import MessageComponent from "./MessageComponent";

class ChatAppComponent extends Component {
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
    // VARFÖR OM MAN FILTRERAR SIDAN UPPDATERAS INTE !! MAN MÅSTE LADDA OM SIDAN FÖR ATT UPPDATERA ORDENTLIGT CHAT LISTAN
    // firebase
    //   .database()
    //   .ref("messages")
    //   .on("child_removed", snapshot => {
    //     const currentMessagesAfterRemove = this.state.messages.filter(item => {
    //       return item.key !== snapshot.key;
    //     });
    //     this.setState({ messages: currentMessagesAfterRemove });
    //   });

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
  }

  // Timestamp function that will be called everytime we submit a new message
  getCurrentDate = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return `${date}, ${time}`;
  };

  submitMessage = value => {
    const nextMessage = {
      sender: this.props.user,
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
      <MessageComponent
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
      <div>
        <h1>Welcome {this.props.user}</h1>
        <ol>{this.currentMessage(this.state.messages)}</ol>
        <br />
        <InputTextComponent submitMessage={this.submitMessage} />
        <br />

        <button onClick={this.props.logOut}>{this.props.btnName}</button>
      </div>
    );
  }
}

export default ChatAppComponent;
