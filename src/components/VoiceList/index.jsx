import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Select } from "adslot-ui";

const VoiceList = ({ onChange }) => {
  const [voices, setVoices] = useState([]);
  const [currentVoice, setCurrentVoice] = useState();

  const populateVoices = (event) => {
    event.preventDefault();
    setVoices(
      _.map(speechSynthesis.getVoices(), (voice) => ({
        value: voice,
        label: `${voice.name} (${voice.lang})`,
      }))
    );
  };

  speechSynthesis.addEventListener("voiceschanged", populateVoices);

  return voices.length ? (
    <Select
      isClearable={false}
      placeholder="Select Voice"
      options={voices}
      value={currentVoice && _.get(currentVoice, "name")}
      onChange={(voice) => {
        setCurrentVoice(voice);
        onChange(voice);
      }}
      dts="speech--component--speech_select"
    />
  ) : null;
};

VoiceList.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default VoiceList;
