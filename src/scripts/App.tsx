import React from 'react';

//Others
import Users from './misc/users';
//import WebSocket from './misc/websocket';
import WebSocket from './misc/sockets';

//Components
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';

class App extends React.Component<any, any> {
    ws: any = WebSocket;

    constructor(props) {
        super(props);

        this.state = {
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
        this.receiveTyping = this.receiveTyping.bind(this);
        this.receiveChat = this.receiveChat.bind(this);
        this.receiveUser = this.receiveUser.bind(this);
    }

    login(user) {
        this.runWs();
        this.setState({ user });
        this.setState({ loginok: true });
    }

    runWs() {
        this.ws.runCallback = this.runWsCallback;
        this.ws.receiveChatCallback = this.receiveChat;
        this.ws.receiveTypingCallback = this.receiveTyping;
        this.ws.receiveUserCallback = this.receiveUser;
        this.ws.run();
    }

    runWsCallback(connected) {
        this.setState({ connection: connected });
        this.broadcastUserStatus();
    }

    broadcastUserStatus() {
        clearTimeout(this.state.userBroadcastTimeoutId);
        setTimeout(() => {
            this.ws.sendUser(this.state.user);
            this.broadcastUserStatus();
        }, 5000);
    }

    receiveChat(data) {
        this.state.chats.push(data);
        this.setState({ chats: this.state.chats });

        if (data.id !== this.state.user.id) {
            document.title = data.name + " sent a new message!";
            this.setState({ typing: null });
        }
    }

    receiveTyping(data) {
        if (data.id !== this.state.user.id) {
            this.setState({ typing: { name: data.name } });

            clearTimeout(this.state.typingTimeoutId);
            const func = () => { this.setState({ typing: null }) };
            this.setState({ typingTimeoutId: setTimeout(func, 2000) });
        }
    }

    receiveUser(data) {
        if (data.id !== this.state.user.id) {
            const user = this.state.users.find(u => u.id === data.id);

            if (!user.status) {
                user.status = true;
                this.setState({ users: this.state.users });
            }

            clearTimeout(user.connectionTimeoutId);
            user.connectionTimeoutId = setTimeout(() => {
                user.status = false;
                this.setState({ users: this.state.users });
            }, 6000);

        }
    }

    public render() {
        return (
            <div className="container-wrapper">
                <div className="app-window">
                    <Header user={this.state.user} users={this.state.users} connection={this.state.connection} />
                    {
                        this.state.loginok ?
                            <Chat ws={this.ws}
                                user={this.state.user}
                                chats={this.state.chats}
                                typing={this.state.typing} /> :

                            <Login users={this.state.users} ignoreStr={Users.ignoreStr} onSubmit={el => this.login(el)} />
                    }


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
