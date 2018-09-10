import React, { Component } from "react";

class InputTextComponent extends Component {
  state = {
    input: "",
    inputPlaceholder: "Write your message here and press enter"
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
      inputPlaceholder: "Write your message here and press enter"
    });
  };

  // This function gets called everytime SEND is clicked and the input text is empty
  emptyWarning = () => {
    alert("Empty input, please write something!");
  };

  render() {
    const { input } = this.state; // same as ==> const input = this.state.input;
    return (
      <div>
        <input
          onFocus={this.clearInput}
          onBlur={this.setInput}
          type="text"
          value={this.state.input}
          placeholder={this.state.inputPlaceholder}
          onChange={this.handleChange}
        />
        <button
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
          SEND
        </button>
      </div>
    );
  }
}

export default InputTextComponent;
