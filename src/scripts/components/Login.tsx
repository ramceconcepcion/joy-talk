import React from 'react';
import { applyStore } from '../store/map';

class Login extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            ignoreStr: props.ignoreStr,
            error: false,
        }

        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        const el: any = this.refs.input1;
        const text = el.value.replace(/\n/g, "<br/>").replace(/\s\s+/g, ' ');

        if (text !== " " && text !== "") {
            let user = this.props.users.find(u => {
                return atob(u.code.split(this.state.ignoreStr)[1]) === el.value;
            });

            if (user) {
                user.status = true;
                this.props.onSubmit(user);
            }
            else this.setState({ error: true });

            el.value = "";
        }
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
                    {this.state.error ? <span className="error">No such passcode.</span> : null}
                </form>
            </div>
        )
    }

    componentDidMount() {
        const input: any = this.refs.input1;
        input.focus();
    }
}


export default applyStore(Login);