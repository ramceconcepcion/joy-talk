import React from 'react';
import ReactDOM from 'react-dom';

class Chat extends React.Component<any, any> {
    ws: any;

    constructor(props) {
        super(props);

        this.ws = props.ws;
        this.state = {
            user: props.user,
            chats: [],
        };

        this.sendChat = this.sendChat.bind(this);
        this.receiveChat = this.receiveChat.bind(this);
    }

    scrollToBot() {
        const el: any = ReactDOM.findDOMNode(this.refs.chats);
        el.scrollTop = el.scrollHeight;
    }

    sendChat(e) {
        e.preventDefault();
        const input: any = ReactDOM.findDOMNode(this.refs.msg);

        const data = {
            id: this.state.user.id,
            name: this.state.user.name,
            content: input.value,
            timestamp: new Date().getTime()
        };

        this.ws.send(data);
        input.value = ""
    }

    receiveChat(json) {
        const data = JSON.parse(json);
        // if (data.id !== this.state.user.id) {
        //     this.setState({ chats: this.state.chats.concat([data]) });
        // }

        this.setState({ chats: this.state.chats.concat([data]) });
    }

    render() {
        const { chats }: any = this.state;

        return (
            <div className="chatroom">
                <ul className="chats" ref="chats">
                    {
                        <Welcome user={this.state.user} />
                    }
                    {
                        chats.map((chat, idx) =>
                            <Message chat={chat} user={this.state.user.name} key={idx} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.sendChat(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBot();

        this.ws.setReceive(this.receiveChat)
    }

    componentDidUpdate() {
        this.scrollToBot();
    }
}

class Message extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            chat: props.chat,
            user: props.user
        }
    }

    public render() {
        return (
            <li className={`chat ${this.state.user === this.state.chat.name ? "right" : "left"}`}>
                <span className="username">{this.state.chat.name}</span>
                <p>{this.state.chat.content}</p>
                {/* <span className="date">{this.state.chat.timestamp}</span> */}
            </li>
        )
    }
}

class Welcome extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
        }
    }

    getWelcome() {
        return 'Welcome to JoyTalk, ' + this.state.user.name
    }

    public render() {
        return (
            <div className="chat-log" > {this.getWelcome()}</div>
        )
    }
}


export default Chat;