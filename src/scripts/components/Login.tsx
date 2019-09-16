import React from 'react';

class Login extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        this.props.onSubmit(this.refs.input1);
    }

    render() {
        return (
            <div className="login">
                <div className="login-title">JoyTalk</div>
                <div className="login-subtitle">Your quick chat solution against workplace IT.</div>
                <form className="login-form" onSubmit={(evt) => this.submit(evt)}>
                    <label htmlFor="">Enter passcode:</label>
                    <input className="passcode" type="password" placeholder="" ref="input1" />
                    <input className="submitLogin" type="submit" value="Login" />
                </form>
            </div>
        )
    }

    componentDidMount() {
        const input: any = this.refs.input1;
        input.focus();
    }
}


export default Login;