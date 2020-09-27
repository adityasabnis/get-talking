import React from "react";
import PropTypes from "prop-types";

class MockWrappedComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="comp__name">{this.props.name} </div>
        <div className="comp__label">{this.props.label} </div>
      </div>
    );
  }
}

MockWrappedComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MockWrappedComponent;
