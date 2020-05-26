import React from "react";
import _ from "lodash";
import { AlertInput } from "../src/components";

class App extends React.Component {
  render() {
    return <AlertInput value="some text input 12" onValueChange={_.noop} />;
  }
}

export default App;
