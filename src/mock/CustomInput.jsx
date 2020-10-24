import React, { useState } from "react";
import _ from "lodash";

const CustomInput = ({ defaultValue, onValueChange }) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeHandler = (event) => {
    setValue(_.get(event, "target.value"));
    onValueChange();
  };

  return <input value={value} onChange={onChangeHandler} />;
};

export default CustomInput;
