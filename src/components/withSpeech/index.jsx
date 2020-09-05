import React from "react";
import _ from "lodash";

const withSpeech = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        voice: null,
      };

      this.utterance = new SpeechSynthesisUtterance();
      this.componentRef = React.createRef();
      speechSynthesis.addEventListener("voiceschanged", this.setSelectedVoice);
    }

    setSelectedVoice = (event) => {
      console.log(
        "In setSelectedVoice: ",
        speechSynthesis.getVoices(),
        this.props.voiceUri
      );
      event.preventDefault();

      const selectedVoice = _.find(
        speechSynthesis.getVoices(),
        (voice) => voice.voiceURI === this.props.voiceUri
      );
      console.log({ selectedVoice });
      if (selectedVoice) {
        this.setState({
          voice: selectedVoice,
        });
      }
    };

    handleOnClick = () => {
      const alertInput = this.componentRef.current;
      console.log({ oo: this.props.speechTextPropName });
      console.log({ pp: alertInput.props });
      this.utterance.text = _.get(
        alertInput.props,
        `${this.props.speechTextPropName}`
      );
      this.utterance.voice = this.state.voice;

      speechSynthesis.speak(this.utterance);
    };

    handleOnMouseLeave = () => {
      speechSynthesis.cancel();
    };

    renderWrappedComponent = () => {
      return (
        <Component
          {..._.omit(this.props, ["speechTextPropName", "voiceUri"])}
          ref={this.componentRef}
        />
      );
    };

    render() {
      return this.state.voice ? (
        <span
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
