import React from "react";
import { AlertInput } from "../src/components";

class App extends React.Component {
  state = {
    value: "some text input 12",
  };

  render() {
    return (
      <AlertInput
        value={this.state.value}
        onValueChange={({ target }) => this.setState({ value: target.value })}
      />
    );
  }
}

export default App;
