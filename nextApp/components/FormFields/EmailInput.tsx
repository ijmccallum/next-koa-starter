import * as React from "react";
import TextInput from "../FormFields/TextInput";

/**
 * Wraps the simple input component with validation for emails
 */

interface EmailInputProps {
  id: string;
  name: string;
  label: string;
  email: string;
  onEmailChange: Function;
}

interface EmailInputState {
  emailValue: string;
  emailErrored: boolean;
  emailErrorMessage: string;
}

class EmailInput extends React.Component<EmailInputProps, EmailInputState> {
  constructor(props: EmailInputProps) {
    super(props);

    this.state = {
      emailValue: props.email || "",
      emailErrored: false,
      emailErrorMessage: ""
    };
  }

  public onEmailChange(newValue) {
    // ?@??.?? <- email will be at least that
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(newValue)) {
      this.setState({
        emailValue: newValue,
        emailErrored: false,
        emailErrorMessage: ""
      });
      this.props.onEmailChange(newValue);
    } else {
      this.setState({
        emailValue: newValue,
        emailErrored: true,
        emailErrorMessage: "Please enter a valid email"
      });
    }
  }

  render() {
    return (
      <TextInput
        id={this.props.id}
        name={this.props.name}
        value={this.state.emailValue}
        label={this.props.label}
        errored={this.state.emailErrored}
        errorText={this.state.emailErrorMessage}
        onChange={this.onEmailChange}
      />
    );
  }
}

export default EmailInput;
