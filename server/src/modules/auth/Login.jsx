import React from 'react';
import Router from 'next/router';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleCredentialsChange = (e) => {
            let { credentials } = this.state;
            credentials[e.target.name] = e.target.value;
            this.setState({ credentials });
        };
        this.handleLoginSubmit = (e) => {
            e.preventDefault();
            this.setState({ isLoginLoading: true });
            setTimeout(() => {
                this.setState({ isLoginLoading: false });
                Router.replace('/cars');
            }, 500);
        };
        this.state = {
            isLoginLoading: false,
            credentials: {
                email: null,
                password: null
            }
        };
    }
    render() {
        const { credentials } = this.state;
        return (<div>
                <h1>Login</h1>
                <form>
                    <input id="formEmail" name="email" type="text" value={credentials.email} onChange={this.handleCredentialsChange}/>
                    <input name="password" type="password" value={credentials.password} onChange={this.handleCredentialsChange}/>

                    <button id="loginSubmit" onClick={this.handleLoginSubmit}>{this.state.isLoginLoading
            ? 'Logging in...'
            : 'Log in'}</button>
                </form>
            </div>);
    }
}
//# sourceMappingURL=Login.jsx.map