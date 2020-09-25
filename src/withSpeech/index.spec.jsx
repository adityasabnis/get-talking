import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import _ from "lodash";
import withSpeech from "./index";
import MockWrappedComponent from "../helpers/MockWrappedComponent";

describe("withSpeech", () => {
  let sandbox;
  let ComponentWithSpeech;
  let eventMap;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    eventMap = {};
    global.SpeechSynthesisUtterance = () => ({
      text: "",
      voice: "",
    });

    const eventListenerStub = sinon.stub().callsFake((event, listener) => {
      eventMap[event] = listener;
    });

    const getVoicesStub = sinon
      .stub()
      .callsFake(() => [{ voiceURI: "Karen" }, { voiceURI: "Alex" }]);

    global.speechSynthesis = {
      addEventListener: eventListenerStub,
      getVoices: getVoicesStub,
      speak: sandbox.spy(),
      cancel: sandbox.spy(),
    };

    ComponentWithSpeech = withSpeech(MockWrappedComponent);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should correctly render original wrapped component when voices are not loaded", () => {
    const wrapper = mount(
      <ComponentWithSpeech
        name="Component Name 1"
        label="This is some text"
        speechTextPropName={"label"}
        voiceUri={"Karen"}
      />
    );

    const wrapperComponentWrapper = wrapper.find(MockWrappedComponent);
    expect(wrapperComponentWrapper).to.have.lengthOf(1);
  });

  it("should correctly render component with speech wrapper when voices are loaded", () => {
    const wrapper = mount(
      <ComponentWithSpeech
        name="Component Name 1"
        label="This is some text"
        speechTextPropName={"label"}
        voiceUri={"Karen"}
      />
    );

    eventMap["voiceschanged"]({ preventDefault: _.noop });
    wrapper.update();

    const hocSpeechActionWrapper = wrapper.find(".gt__component-wrapper");
    expect(hocSpeechActionWrapper).to.have.lengthOf(1);
  });

  it("should correctly trigger speech with correct utterance when click is simulated", () => {
    const wrapper = mount(
      <ComponentWithSpeech
        name="Component Name 1"
        label="This is some text"
        speechTextPropName={"label"}
        voiceUri={"Karen"}
      />
    );

    eventMap["voiceschanged"]({ preventDefault: _.noop });
    wrapper.update();

    const hocSpeechActionWrapper = wrapper.find(".gt__component-wrapper");
    const hocSpeechAction = hocSpeechActionWrapper.first();

    hocSpeechAction.simulate("click");
    wrapper.update();

    expect(global.speechSynthesis.speak.calledOnce).to.equal(true);
    expect(global.speechSynthesis.speak.args[0]).to.eql([
      { text: "This is some text", voice: { voiceURI: "Karen" } },
    ]);
  });

  it("should correctly trigger speech cancel when mouseLeave is simulated", () => {
    const wrapper = mount(
      <ComponentWithSpeech
        name="Component Name 1"
        label="This is some text"
        speechTextPropName={"label"}
        voiceUri={"Karen"}
      />
    );

    eventMap["voiceschanged"]({ preventDefault: _.noop });
    wrapper.update();

    const hocSpeechActionWrapper = wrapper.find(".gt__component-wrapper");
    const hocSpeechAction = hocSpeechActionWrapper.first();

    hocSpeechAction.simulate("mouseLeave");
    wrapper.update();

    expect(global.speechSynthesis.cancel.calledOnce).to.equal(true);
  });
});
