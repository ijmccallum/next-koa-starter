import * as React from 'react';
const NiceCheckbox = (props) => {
    return (<div className="NiceCheckbox" id={props.rootID}>
            <input type="checkbox" id={props.id} name={props.name} value={props.value}/>
            <label htmlFor={props.id}>{props.label}</label>
        </div>);
};
export default NiceCheckbox;
//# sourceMappingURL=index.jsx.map