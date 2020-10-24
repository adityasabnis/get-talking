import React, { useState } from "react";
import _ from "lodash";
import CustomInput from "../src/mock/CustomInput";
import { withSpeech } from "../src";

const CustomInputWithSpeech = withSpeech(CustomInput, {
  voiceName: "Alex",
  speechTextPropName: "value",
});

const App = () => {
  const [alertInputText, setAlertInputText] = useState("My name is John Snow");

  return (
    <div>
      <div>Click inside the component</div> <br />
      <div>Custom Input</div>
      <CustomInputWithSpeech
        value={alertInputText}
        onValueChange={({ target }) =>
          setAlertInputText(_.get(target, "value"))
        }
      />
    </div>
  );
};

export default App;
