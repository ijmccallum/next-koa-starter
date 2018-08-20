/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";

import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
  it("Passes the form values to onSubmit on submit", () => {
    const submitCb = jest.fn();
    const wrapper = shallow(<SignUpForm email="emailyo" onSubmit={submitCb} />);
    wrapper.simulate("submit");
    //label for matches input id
    expect(submitCb.mock.calls.length).toBe(1);
    expect(submitCb.mock.calls[0][0]).toEqual({
      email: "emailyo"
    });
  });
});
