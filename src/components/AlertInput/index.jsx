import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { AlertInput as Component, Button, Select, SvgSymbol } from "adslot-ui";
import { SVG_ICON_PATH } from "../../constants";

class AlertInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSupported: false,
      voices: [],
      currentVoice: null,
      language: null,
    };

    this.textInput = React.createRef();
  }

  componentDidMount = () => {
    if (speechSynthesis || _.isFunction(speechSynthesis.getVoices)) {
      speechSynthesis.addEventListener("voiceschanged", this.populateVoices);
      this.setState({ isSupported: true });
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
    const value = alertInput.props.value;

    var utterThis = new SpeechSynthesisUtterance(value);
    console.log(this.state.currentVoice);
    utterThis.voice = this.state.currentVoice.value;
    speechSynthesis.speak(utterThis);
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
                <SvgSymbol
                  href={`${SVG_ICON_PATH}/pause.svg`}
                  onClick={this.handleOnPauseClick}
                />
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
