import React from "react";
import { AlertInput, Textarea } from "adslot-ui";
import { withSpeech, VoiceList } from "../src";
import _ from "lodash";

const AlertInputWithSpeech = withSpeech(AlertInput);
const TextareaWithSpeech = withSpeech(Textarea);

class App extends React.Component {
  state = {
    voice: null,
  };

  render() {
    return (
      <React.Fragment>
        <AlertInputWithSpeech
          value={"Some Text Input 12"}
          onValueChange={_.noop}
          speechTextPropName={"value"}
          voiceUri={"Karen"}
        />
        <TextareaWithSpeech
          value={"Some Text Input long for text area"}
          onValueChange={_.noop}
          speechTextPropName={"value"}
          voiceUri={"Veena"}
        />
        <VoiceList onChange={(voice) => console.log(voice)} />
      </React.Fragment>
    );
  }
}

export default App;
