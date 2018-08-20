import * as React from "react";
import EmailInput from "../FormFields/EmailInput";

interface SignUpFormProps {
  onSubmit: Function;
}

interface SignUpFormState {
  emailValue: string;
  emailErrored: boolean;
  emailErrorMessage: string;
}

class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
  constructor(props: SignUpFormProps) {
    super(props);

    this.state = {
      emailValue: "",
      emailErrored: false,
      emailErrorMessage: ""
    };
  }

  public onFormSubmit(e) {
    console.log("form submission!", e);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <EmailInput
          id={"signup-email"}
          name={"Sign up email"}
          value={this.state.emailValue}
          label="Email"
          errored={this.state.emailErrored}
          errorText={this.state.emailErrorMessage}
          onChange={newValue => {
            this.setState({
              emailValue: newValue
            });
          }}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SignUpForm;
