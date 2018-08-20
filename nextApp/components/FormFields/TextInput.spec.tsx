/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import TextInput from "./TextInput";

describe("TextInput", () => {
  const mockCallback = jest.fn();
  const wrapper = shallow(
    <TextInput
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

  it("calls the given onChange function onChange", () => {
    wrapper
      .find("#textInputter")
      .simulate("change", { target: { value: "h" } });
    wrapper
      .find("#textInputter")
      .simulate("change", { target: { value: "hi" } });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[0][0]).toBe("h");
    expect(mockCallback.mock.calls[1][0]).toBe("hi");
  });

  it("Shows the given error message when errored", () => {
    expect(wrapper.find('[data-testid="textinput-error"]').text()).toBe(
      "errored"
    );
  });

  it("Hides the given error message when not errored", () => {
    const nonErroredWrapper = shallow(
      <TextInput
        id="textInputter"
        name="is_available"
        value="hello"
        label="Text input label"
        onChange={mockCallback}
        errored={false}
        errorText="errored"
      />
    );

    expect(
      nonErroredWrapper.find('[data-testid="textinput-error"]').length
    ).toEqual(0);
  });
});
