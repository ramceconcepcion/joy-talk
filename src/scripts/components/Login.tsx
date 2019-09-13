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
                <form className="login-form" onSubmit={(e) => this.props.onSubmit(this.refs.input1)}>
                    <label htmlFor="">Enter a passcode</label>
                    <input type="text" placeholder="" ref="input1" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}


export default Login;