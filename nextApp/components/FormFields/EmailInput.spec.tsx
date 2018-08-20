/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import EmailInput from "./EmailInput";

describe("EmailInput", () => {
  it('renders an input[type="email"] with correct attributes', () => {
    const attributeWrapper = shallow(
      <EmailInput
        id="EmailInputter"
        name="input name"
        value="hello@domain.tld"
        label="Email input label"
        onChange={() => {}}
      />
    );

    expect(attributeWrapper.find("label").text()).toEqual("Email input label");
    //label for matches input id
    expect(attributeWrapper.find("label").props().htmlFor).toEqual(
      attributeWrapper.find("#EmailInputter").props().id
    );
    expect(attributeWrapper.find("#EmailInputter").props().value).toEqual(
      "hello@domain.tld"
    );
  });

  it("calls the given onChange function onChange when the email is valid", () => {
    const toBeCallback = jest.fn();
    const toBeWrapper = shallow(
      <EmailInput
        id="EmailInputter"
        name="input name"
        value=""
        label="Email input label"
        onChange={toBeCallback}
      />
    );

    toBeWrapper
      .find("#EmailInputter")
      .simulate("change", { target: { value: "hi@me.com" } });
    toBeWrapper
      .find("#EmailInputter")
      .simulate("change", { target: { value: "hi@you.com" } });
    expect(toBeCallback.mock.calls.length).toBe(2);
    expect(toBeCallback.mock.calls[0][0]).toBe("hi@me.com");
    expect(toBeCallback.mock.calls[1][0]).toBe("hi@you.com");
  });

  it("will not call the given onChange function onChange if the email is invalid", () => {
    const notToBeCallback = jest.fn();
    const notToBeWrapper = shallow(
      <EmailInput
        id="EmailInputter"
        name="input name"
        value=""
        label="Email input label"
        onChange={notToBeCallback}
      />
    );

    notToBeWrapper
      .find("#EmailInputter")
      .simulate("change", { target: { value: "hi" } });
    notToBeWrapper
      .find("#EmailInputter")
      .simulate("change", { target: { value: "ho" } });
    expect(notToBeCallback.mock.calls.length).toBe(0);
  });

  it("Shows an error message when an invalid email is typed in", () => {
    const TypedErrorWrapper = shallow(
      <EmailInput
        id="EmailInputter"
        name="input name"
        value=""
        label="Email input label"
        onChange={() => {}}
      />
    );

    expect(
      TypedErrorWrapper.find('[data-testid="emailinput-error"]').length
    ).toEqual(0);

    TypedErrorWrapper.find("#EmailInputter").simulate("change", {
      target: { value: "h" }
    });

    expect(
      TypedErrorWrapper.find('[data-testid="emailinput-error"]').length
    ).toEqual(1);
  });

  it("Shows an error message when the email passed in via props is not valid", () => {
    const ErroredWrapper = shallow(
      <EmailInput
        id="EmailInputter"
        name="input name"
        value="not an email"
        label="Email input label"
        onChange={() => {}}
      />
    );

    expect(
      ErroredWrapper.find('[data-testid="emailinput-error"]').length
    ).toEqual(1);
  });
});
