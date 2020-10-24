import React from "react";
import PropTypes from "prop-types";

class CustomInput extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <input value={this.props.value} onChange={this.props.onValueChange} />
    );
  }
}

export default CustomInput;
