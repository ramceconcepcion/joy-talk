import React from 'react';

//Others
import Users from './misc/users';
import WebSocket from './misc/websocket';
//import WebSocket from './misc/socketio';

//Components
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';

class App extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            //Web socket instance
            ws: WebSocket,

            //users
            users: Users.entries,
            user: null,
            userBroadcastTimeoutId: null,

            //chats
            chats: [],
            typing: null,
            typingTimeoutId: null,

            //local state
            connection: false,
            loginok: false,
        }

        this.login = this.login.bind(this);
        this.runWsCallback = this.runWsCallback.bind(this);
        this.receiveWsCallback = this.receiveWsCallback.bind(this);
    }

    login(el: any) {
        let user: any = this.state.users.find(u => atob(u.code.split(Users.ignoreStr)[1]) == el.value);
        if (user) {
            this.setState({ user });
            this.runWs();
            user.status = true;
        }
        this.setState({ loginok: true });
    }

    runWs() {
        this.state.ws.runCallback = this.runWsCallback;
        this.state.ws.receiveCallback = this.receiveWsCallback;
        this.state.ws.run();
    }

    runWsCallback(connected) {
        this.setState({ connection: connected });
        this.broadcastUserStatus();
    }

    broadcastUserStatus() {
        clearTimeout(this.state.userBroadcastTimeoutId);
        setTimeout(() => {
            this.state.ws.send({ dataType: "user", data: this.state.user });
            this.broadcastUserStatus();
        }, 2000);
    }

    receiveWsCallback(json) {
        const parsed = JSON.parse(json);
        if (parsed.dataType == "message") this.receiveChat(parsed.data || parsed);
        if (parsed.dataType == "typing") this.receiveTyping(parsed.data || parsed);
        if (parsed.dataType == "user") this.receiveStatus(parsed.data || parsed);
    }

    receiveChat(data) {
        this.state.chats.push(data);
        this.setState({ chats: this.state.chats });

        if (data.id != this.state.user.id) {
            document.title = data.name + " sent a new message!";
            this.setState({ typing: null });
        }
    }

    receiveTyping(data) {
        if (data.id != this.state.user.id) {
            this.setState({ typing: { name: data.name } });

            clearTimeout(this.state.typingTimeoutId);
            const func = () => { this.setState({ typing: null }) };
            this.setState({ typingTimeoutId: setTimeout(func, 2000) });
        }
    }

    receiveStatus(data) {
        if (data.id != this.state.user.id) {
            const user = this.state.users.find(u => u.id === data.id);
            user.status = true;

            clearTimeout(user.connectionTimeoutId);
            user.connectionTimeoutId = setTimeout(() => { user.status = false }, 3000);

            this.setState({ users: this.state.users });
        }
    }

    public render() {
        const checkLogin = () => {
            return !this.state.user ?
                <div className="passcodeError">You are not authorized to use this app.</div>
                :
                <Chat ws={this.state.ws}
                    user={this.state.user}
                    chats={this.state.chats}
                    typing={this.state.typing} />
        }

        return (
            <div className="container-wrapper">
                <div className="app-window">
                    {this.state.loginok ? null : <Login onSubmit={el => this.login(el)} />}
                    <Header user={this.state.user} users={this.state.users} connection={this.state.connection} />
                    {checkLogin()}
                </div>
            </div>
        )
    }

    componentDidMount() {
        //Apply theme from localStorage
        document.body.className = localStorage['joytalk_theme'] || 'deeporange';
    }
}

export default App;
