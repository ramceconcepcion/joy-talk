import React from 'react';

//Others
import Users from './users';
import WebSocket from './services/websocket';

//Components
import Chat from './components/Chat';
import Header from './components/Header';


class App extends React.Component<any, any> {
    ws: any = WebSocket;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            connection: false,
        }

        this.checkConnection = this.checkConnection.bind(this);
    }

    getUser() {
        const code = prompt("Enter passcode: ");
        let user: any = Users.find(u => u.code == code);
        this.setState({ user });
    }

    isAuthorized() {
        return !this.state.user ? false : true
    }

    checkConnection(connected) {
        this.setState({ connection: connected })
    }

    public render() {
        return (
            <div className="container-wrapper">
                <div className="app-window">
                    <Header user={this.state.user} connection={this.state.connection} />
                    {
                        this.isAuthorized() ? <Chat user={this.state.user} ws={this.ws} />
                            : <div className="passcodeError">You are not authorized to use this app.</div>
                    }
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.ws.run(this.checkConnection);
        this.getUser();
    }

    componentDidMount() {
    }
}

export default App;
