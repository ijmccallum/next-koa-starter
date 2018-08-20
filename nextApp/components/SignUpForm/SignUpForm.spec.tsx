/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
  const mockCallback = jest.fn();
  const wrapper = shallow(
    <SignUpForm
      id="textInputter"
      name="is_available"
      value="hello"
      label="Text input label"
      onChange={mockCallback}
      errored={true}
      errorText="errored"
    />
  );

  it('renders an input[type="text"] with correct attributes', () => {
    expect(wrapper.find("label").text()).toEqual("Text input label");
    //label for matches input id
    expect(wrapper.find("label").props().htmlFor).toEqual(
      wrapper.find("#textInputter").props().id
    );
    expect(wrapper.find("#textInputter").props().value).toEqual("hello");
  });
});
