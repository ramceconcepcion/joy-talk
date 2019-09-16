import React from 'react';

//Others
import Users from './misc/users';
import WebSocket from './misc/websocket';

//Components
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';

class App extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            connection: false,
            ws: WebSocket,
            loginok: false,
        }

        this.runCallback = this.runCallback.bind(this);
        this.login = this.login.bind(this);
    }

    login(el: any) {
        let user: any = Users.entries.find(u => atob(u.code.split(Users.ignoreStr)[1]) == el.value);

        this.setState({ user });
        this.setState({ loginok: true });

        if (user) this.state.ws.run(this.runCallback);
    }

    runCallback(connected, ws) {
        this.setState({ connection: connected });
        this.setState({ ws });
    }

    public render() {
        const checkLogin = () => {
            return !this.state.user ?
                <div className="passcodeError">You are not authorized to use this app.</div>
                :
                <Chat user={this.state.user} ws={this.state.ws} />
        }

        return (
            <div className="container-wrapper">
                <div className="app-window">
                    {this.state.loginok ? null : <Login onSubmit={el => this.login(el)} />}
                    <Header user={this.state.user} connection={this.state.connection} />
                    {checkLogin()}
                </div>
            </div>
        )
    }

    componentWillMount() {
    }

    componentDidMount() {
        //Apply theme from localStorage
        document.body.className = localStorage['joytalk_theme'] || 'deeporange';
    }
}

export default App;
