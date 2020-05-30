import React from "react";
import { AlertInput, WithSpeech } from "../src/components";
import { AlertInput as Component } from "adslot-ui";

const AlertInputWithSpeech = WithSpeech(Component);

class App extends React.Component {
  state = {
    value: "some text input 12",
  };

  render() {
    return (
      <React.Fragment>
        {/*        <AlertInput
          value={this.state.value}
          onValueChange={({ target }) => this.setState({ value: target.value })}
        />*/}
        <AlertInputWithSpeech
          value={this.state.value}
          onValueChange={({ target }) => this.setState({ value: target.value })}
        />
      </React.Fragment>
    );
  }
}

export default App;
