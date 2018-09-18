import React, { Component } from "react";

class InputText extends Component {
  state = {
    input: "",
    inputPlaceholder: "Chat here..."
  };

  // Updates input state with text from input
  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  // Clear input text (placeholder) on focus
  clearInput = () => {
    this.setState({ inputPlaceholder: "" });
  };

  // Sets input text (placeholder) when not focus (blur)
  setInput = () => {
    this.setState({
      inputPlaceholder: "Chat here..."
    });
  };

  // This function gets called everytime SEND is clicked and the input text is empty
  emptyWarning = () => {
    alert("Empty input, please write something!");
  };

  render() {
    const { input } = this.state; // same as ==> const input = this.state.input;
    return (
      <div className="chatFooterChat">
        <input
          className="noteInput"
          onFocus={this.clearInput}
          onBlur={this.setInput}
          type="textarea"
          value={this.state.input}
          placeholder={this.state.inputPlaceholder}
          onChange={this.handleChange}
        />
        <button
          className="noteButtonChat"
          type="submit"
          onClick={() => {
            if (this.state.input === "") {
              this.emptyWarning();
            } else {
              this.props.submitMessage(input);
              this.setState({ input: "" });
            }
          }}
        >
          <p className="p3">Message</p>
        </button>
      </div>
    );
  }
}

export default InputText;
