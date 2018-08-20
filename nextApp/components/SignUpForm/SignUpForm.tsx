import * as React from "react";
import EmailInput from "../FormFields/EmailInput";

interface SignUpFormProps {
  onSubmit: Function;
  email: string;
}

interface SignUpFormState {
  emailValue: string;
}

class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
  constructor(props: SignUpFormProps) {
    super(props);

    this.state = {
      emailValue: props.email || ""
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  private onFormSubmit(e) {
    this.props.onSubmit({
      email: this.state.emailValue
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <EmailInput
          id={"signup-email"}
          data-testid="signup-email"
          name={"Sign up email"}
          value={this.state.emailValue}
          label="Email"
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
