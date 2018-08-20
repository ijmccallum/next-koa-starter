import * as React from "react";
import emailValidator from "./emailValidator";

interface EmailInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: Function;
}

interface EmailInputState {
  emailValue: string;
  emailErrored: boolean;
  emailErrorMessage: string;
}

class EmailInput extends React.Component<EmailInputProps, EmailInputState> {
  constructor(props: EmailInputProps) {
    super(props);

    let emailErrored = false;
    if (props.value !== "") {
      if (!emailValidator(props.value)) {
        emailErrored = true;
      }
    }

    this.state = {
      emailValue: props.value || "",
      emailErrored: emailErrored,
      emailErrorMessage: "Please enter a valid email"
    };
  }

  private onEmailChange(newValue) {
    if (emailValidator(newValue)) {
      this.setState({
        emailValue: newValue,
        emailErrored: false,
        emailErrorMessage: ""
      });
      this.props.onChange(newValue);
    } else {
      this.setState({
        emailValue: newValue,
        emailErrored: true
      });
    }
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type="email"
          id={this.props.id}
          name={this.props.name}
          value={this.state.emailValue}
          onChange={e => {
            this.onEmailChange(e.target.value);
          }}
        />
        {this.state.emailErrored && (
          <p data-testid="emailinput-error">{this.state.emailErrorMessage}</p>
        )}
      </div>
    );
  }
}

export default EmailInput;
