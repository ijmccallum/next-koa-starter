import * as React from "react";

interface TextInputProps {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: Function;
  errored: boolean;
  errorText: string;
}

const TextInput: React.SFC<TextInputProps> = (
  props: TextInputProps
): JSX.Element => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={e => {
          props.onChange(e.target.value);
        }}
      />
      {props.errored && <p data-testid="textinput-error">{props.errorText}</p>}
    </div>
  );
};

export default TextInput;
