import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { AlertInput as Component, Button, Select } from "adslot-ui";

class AlertInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSupported: false,
      voices: [],
      currentVoice: null,
      currentCharacter: 0,
      language: null,
    };

    this.utterance = new SpeechSynthesisUtterance();
    this.textInput = React.createRef();
  }

  componentDidMount = () => {
    if (speechSynthesis || _.isFunction(speechSynthesis.getVoices)) {
      speechSynthesis.addEventListener("voiceschanged", this.populateVoices);
      this.setState({ isSupported: true });

      speechSynthesis.addEventListener("boundary", ({ charindex }) => {
        this.setState({ currentCharacter: charindex });
      });
    }
  };

  populateVoices = () => {
    this.setState({
      voices: _.map(speechSynthesis.getVoices(), (voice) => ({
        value: voice,
        label: _.get(voice, "name"),
      })),
    });
  };

  handleVoiceChange = (value) => {
    this.setState({ currentVoice: value });
  };

  handleOnPlayClick = () => {
    if (speechSynthesis.speaking && speechSynthesis.paused)
      return speechSynthesis.resume();

    const alertInput = this.textInput.current;
    console.log({ alertInput });
    this.utterance.text = alertInput.props.value;
    this.utterance.voice = this.state.currentVoice.value;
    speechSynthesis.speak(this.utterance);
  };

  handleOnPauseClick = () => {
    if (speechSynthesis.speaking) speechSynthesis.pause();
  };

  renderBody() {
    return this.state.voices.length ? (
      <React.Fragment>
        <div className="card panel w-25 border-dark m-4 p-2">
          <div className="card-body">
            <div className="row">
              <div className="col-6"> Select Voice</div>
              <div className="col-6">
                <Select
                  isClearable={false}
                  placeholder="Voice"
                  options={_.map(speechSynthesis.getVoices(), (voice) => ({
                    value: voice,
                    label: `${voice.name} (${voice.lang})`,
                  }))}
                  value={
                    this.state.currentVoice && this.state.currentVoice.name
                  }
                  onChange={this.handleVoiceChange}
                  dts="speech_language_select"
                />
                <div className="language-code"></div>
              </div>
            </div>
            {this.state.currentVoice && (
              <div className="row">
                <Button onClick={this.handleOnPlayClick}>Play</Button>
                <Button onClick={this.handleOnPauseClick}>Pause</Button>
                <Button
                  onClick={() => {
                    speechSynthesis.resume();
                    speechSynthesis.cancel();
                  }}
                >
                  Stop
                </Button>
              </div>
            )}
          </div>
        </div>
        <Component {...this.props} ref={this.textInput} />
      </React.Fragment>
    ) : (
      <div>Loading Voices</div>
    );
  }

  render() {
    return this.state.isSupported ? (
      this.renderBody()
    ) : (
      <div>Browser does not WebSpeech Api</div>
    );
  }
}

AlertInput.propTypes = {
  // ...AdslotUiAlertInput.props,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onStop: PropTypes.func,
};

export default AlertInput;
