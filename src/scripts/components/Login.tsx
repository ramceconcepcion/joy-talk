import React from 'react';

class Login extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login">
                <div className="login-title">JoyTalk</div>
                <div className="login-subtitle">Your quick chat solution against workplace IT.</div>
                <div className="login-form">
                    <label htmlFor="">Enter a passcode</label>
                    <input type="text" placeholder="" ref="input1" />
                    <button onClick={(e) => this.props.onSubmit(this.refs.input1)}>Login</button>
                </div>
            </div>
        )
    }
}


export default Login;