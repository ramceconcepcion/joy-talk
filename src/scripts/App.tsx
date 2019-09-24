import React from 'react';
import { connect } from 'react-redux';
import { applyStore } from './store/map';

//3rd parties
import Push from 'push.js';

//Components
import Chat from './components/Chat';
import Header from './components/Header';
import Login from './components/Login';

//Misc
import { entries, str as ignoreStr } from './misc/usrs';
import WebSocket from './misc/sockets';

class App extends React.Component<any, any> {
    ws: any = WebSocket;

    constructor(props) {
        super(props);

        this.state = {
            //users
            userBroadcastTimeoutId: null,

            //chats
            chatNotifTimeoutId: null,
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
        this.blinkChatNotif = this.blinkChatNotif.bind(this);

        this.props.SET_USERS(entries);
    }

    login(user) {
        this.runWs();
        this.setState({ loginok: true });
        this.props.SET_CURRENT_USER(user);
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
        const func = setTimeout(() => {
            this.ws.sendUser(this.props.user);
            this.broadcastUserStatus();
        }, 5000);
        this.setState({ userBroadcastTimeoutId: func });
    }

    blinkChatNotif(run, name) {
        if (run) {
            clearTimeout(this.state.chatNotifTimeoutId);

            const func = setTimeout(() => {
                document.title = name + " sent a new message!";
                this.blinkChatNotif(true, name);

                setTimeout(() => document.title = "Joy Talk", 1000);
            }, 1500);

            this.setState({ chatNotifTimeoutId: func });
        }
        else {
            clearTimeout(this.state.chatNotifTimeoutId);
            document.title = "Joy Talk";
        }
    }

    sendPushNotification(data) {

        if (data.type == 'text') {
            Push.create(data.name + ' sent a new message!', {
                body: data.content,
                timeout: 3000
            });
        }
        else {
            Push.create(data.name + ' sent a new message!', {
                body: 'Photo',
                icon: data.content,
                timeout: 3000
            });
        }
    }

    receiveChat(data) {
        this.state.chats.push(data);
        this.setState({ chats: this.state.chats });

        if (data.id !== this.props.user.id) {
            this.sendPushNotification(data);
            this.blinkChatNotif(true, data.name);
            this.setState({ typing: null });
        }
    }

    receiveTyping(data) {
        if (data.id !== this.props.user.id) {
            this.setState({ typing: { name: data.name } });

            clearTimeout(this.state.typingTimeoutId);
            const func = () => { this.setState({ typing: null }) };
            this.setState({ typingTimeoutId: setTimeout(func, 2000) });
        }
    }

    receiveUser(data) {
        if (data.id !== this.props.user.id) {
            const user = this.props.users.find(u => u.id === data.id);

            if (!user.status) {
                user.status = true;
                this.setState({ users: this.props.users });
            }

            clearTimeout(user.connectionTimeoutId);
            user.connectionTimeoutId = setTimeout(() => {
                user.status = false;
                this.setState({ users: this.props.users });
            }, 6000);
        }
    }

    public render() {
        return (
            <div className="container-wrapper">
                <div className="app-window">
                    <Header connection={this.state.connection} />
                    {
                        this.state.loginok ?
                            <Chat ws={this.ws}
                                user={this.props.user}
                                chats={this.props.chats}
                                typing={this.props.typing}
                                blinkChatNotif={this.blinkChatNotif} /> :

                            <Login ignoreStr={ignoreStr} onSubmit={el => this.login(el)} />
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

export default applyStore(App);
