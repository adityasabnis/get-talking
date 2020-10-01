import React from "react";
import _ from "lodash";

const withSpeech = (Component, { voiceName, speechTextPropName }) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.componentRef = React.createRef();
      this.utterance = new SpeechSynthesisUtterance();

      // Check if the voices are already loaded before the object construction
      const voices = speechSynthesis.getVoices();

      // Set the voice as the initial state.voice value as the `voiceschanged` event won't be triggered if voices are
      // already loaded before the object construction
      this.state = {
        voice: voices.length
          ? _.find(voices, (voice) => voice.name === voiceName)
          : null,
      };

      // Add `voiceschanged` listener for scenarios when voices take long to load as they are loaded (async) by the browser
      speechSynthesis.addEventListener(
        "voiceschanged",
        this.handleVoicesChanged
      );
    }

    handleVoicesChanged = (event) => {
      event.preventDefault();

      const selectedVoice = _.find(
        speechSynthesis.getVoices(),
        (voice) => voice.name === voiceName
      );

      if (selectedVoice) {
        this.setState({
          voice: selectedVoice,
        });
      }
    };

    handleOnClick = () => {
      const wrappedComponent = _.get(this.componentRef, "current");

      this.utterance.text = _.get(
        wrappedComponent.props,
        `${speechTextPropName}`
      );

      this.utterance.voice = this.state.voice;
      speechSynthesis.speak(this.utterance);
    };

    handleOnMouseLeave = () => {
      speechSynthesis.cancel();
    };

    renderWrappedComponent = () => {
      return <Component {...this.props} ref={this.componentRef} />;
    };

    render() {
      return this.state.voice ? (
        <span
          className="gt__component-wrapper"
          onClick={this.handleOnClick}
          onMouseLeave={this.handleOnMouseLeave}
        >
          {this.renderWrappedComponent()}
        </span>
      ) : (
        this.renderWrappedComponent()
      );
    }
  };
};

export default withSpeech;
