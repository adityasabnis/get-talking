import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import CustomInput from "./CustomInput";

describe("CustomInput", () => {
  it("should correctly render custom input", () => {
    const valueChangeSpy = sinon.spy();

    const wrapper = mount(
      <CustomInput value={"This is awesome"} onValueChange={valueChangeSpy} />
    );

    const inputWrapper = wrapper.find("input");
    expect(inputWrapper).to.have.lengthOf(1);
    expect(inputWrapper.props().value).to.equal("This is awesome");
  });

  it("should correctly simulate change", () => {
    const valueChangeSpy = sinon.spy();

    const wrapper = mount(
      <CustomInput value={"This is awesome"} onValueChange={valueChangeSpy} />
    );

    let inputWrapper = wrapper.find("input");
    expect(inputWrapper).to.have.lengthOf(1);
    expect(inputWrapper.props().value).to.equal("This is awesome");

    inputWrapper
      .first()
      .simulate("change", { target: { value: "New awesome value" } });

    wrapper.update();

    inputWrapper = wrapper.find("input");
    expect(inputWrapper).to.have.lengthOf(1);
    expect(valueChangeSpy.calledOnce).to.equal(true);
    expect(valueChangeSpy.args[0][0].target).to.eql({
      value: "New awesome value",
    });
  });
});
