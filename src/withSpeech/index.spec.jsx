import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import _ from "lodash";
import withSpeech from "./index";
import MockWrappedComponent from "../mock/MockWrappedComponent/MockWrappedComponent";

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

    const eventListenerStub = sandbox.stub().callsFake((event, listener) => {
      eventMap[event] = listener;
    });

    const getVoicesStub = sandbox.stub().callsFake(() => [
      { voiceURI: "uri/Karen", name: "Karen" },
      { voiceURI: "uri/Alex", name: "Alex" },
    ]);

    global.speechSynthesis = {
      addEventListener: eventListenerStub,
      getVoices: getVoicesStub,
      speak: sandbox.spy(),
      cancel: sandbox.spy(),
    };

    ComponentWithSpeech = withSpeech(MockWrappedComponent, {
      voiceName: "Karen",
      speechTextPropName: "label",
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should correctly render original wrapped component when voices are not loaded", () => {
    const getVoicesStub = sandbox.stub().returns([]);
    global.speechSynthesis.getVoices = getVoicesStub;

    const wrapper = mount(
      <ComponentWithSpeech name="Component Name 1" label="This is some text" />
    );

    const wrapperComponentWrapper = wrapper.find(MockWrappedComponent);
    expect(wrapperComponentWrapper).to.have.lengthOf(1);
  });

  it("should correctly render component with speech wrapper when voices are loaded", () => {
    const wrapper = mount(
      <ComponentWithSpeech name="Component Name 1" label="This is some text" />
    );

    eventMap["voiceschanged"]({ preventDefault: _.noop });
    wrapper.update();

    const hocSpeechActionWrapper = wrapper.find(".gt__component-wrapper");
    expect(hocSpeechActionWrapper).to.have.lengthOf(1);
  });

  it("should correctly render component without error if selected voice does not belong to voice list", () => {
    ComponentWithSpeech = withSpeech(MockWrappedComponent, {
      voiceName: "Some_Unknown_Voice",
      speechTextPropName: "label",
    });

    const wrapper = mount(
      <ComponentWithSpeech name="Component Name 1" label="This is some text" />
    );

    eventMap["voiceschanged"]({ preventDefault: _.noop });
    wrapper.update();

    // Since the selected voice does not belong to the list of voice, render the raw wrapper component
    const hocSpeechActionWrapper = wrapper.find(".gt__component-wrapper");
    expect(hocSpeechActionWrapper).to.have.lengthOf(0);

    const mockedComponentElementWrapper = wrapper.find(".comp__name");
    expect(mockedComponentElementWrapper).to.have.lengthOf(1);
  });

  it("should correctly trigger speech with correct utterance when click is simulated", () => {
    const wrapper = mount(
      <ComponentWithSpeech name="Component Name 1" label="This is some text" />
    );

    eventMap["voiceschanged"]({ preventDefault: _.noop });
    wrapper.update();

    const hocSpeechActionWrapper = wrapper.find(".gt__component-wrapper");
    const hocSpeechAction = hocSpeechActionWrapper.first();

    hocSpeechAction.simulate("click");
    wrapper.update();

    expect(global.speechSynthesis.speak.calledOnce).to.equal(true);
    expect(global.speechSynthesis.speak.args[0]).to.eql([
      {
        text: "This is some text",
        voice: { voiceURI: "uri/Karen", name: "Karen" },
      },
    ]);
  });

  it("should correctly trigger speech cancel when mouseLeave is simulated", () => {
    const wrapper = mount(
      <ComponentWithSpeech name="Component Name 1" label="This is some text" />
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
