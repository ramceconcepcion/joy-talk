import React from 'react';

//Others
import Users from './misc/users';
import WebSocket from './misc/websocket';

//Components
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';

class App extends React.Component<any, any> {
    ws: any = WebSocket;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            connection: false,
            ws: this.ws,
            loginok: false,
        }

        this.checkConnection = this.checkConnection.bind(this);
        this.login = this.login.bind(this);
    }

    login(el: any) {
        let user: any = Users.find(u => u.code == el.value);

        this.setState({ user });
        this.setState({ loginok: true });

        if (user) this.ws.run(this.checkConnection);
    }

    checkConnection(connected, ws) {
        this.setState({ connection: connected });
        this.setState({ ws })
    }

    applyThemeFromLocal() {
        document.body.className = localStorage['joytalk_theme'] || 'primary';
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
        this.applyThemeFromLocal();
    }
}

export default App;
