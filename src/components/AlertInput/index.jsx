import React from "react";
import PropTypes from "prop-types";
import { AlertInput as Component } from "adslot-ui";

class AlertInput extends React.Component {
  render() {
    return <React.Fragment>
      <div>Hello World</div>
      <Component {...this.props} />
    </React.Fragment>;
  }
}

AlertInput.propTypes = {
  // ...AdslotUiAlertInput.props,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onStop: PropTypes.func,
};

export default AlertInput;
