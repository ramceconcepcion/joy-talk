import React from 'react';
import ReactDOM from 'react-dom';

class Chat extends React.Component<any, any> {
    ws: any;

    constructor(props) {
        super(props);

        this.ws = props.ws;
        this.state = {
            user: props.user,
            chats: []
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    scrollToBot() {
        const el: any = ReactDOM.findDOMNode(this.refs.chats);
        el.scrollTop = el.scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        const msgNode: any = ReactDOM.findDOMNode(this.refs.msg);

        const data = {
            username: this.state.user.username,
            content: msgNode.value,
            timestamp: new Date().getTime()
        };

        this.setState({ chats: this.state.chats.concat([data]) }, () => msgNode.value = "");

        this.ws.send(data);
    }

    receiveChat(json) {
        const msgNode: any = ReactDOM.findDOMNode(this.refs.msg);
        const data = JSON.parse(json);
        if (data.username !== this.state.user.username) {
            this.setState({ chats: this.state.chats.concat([data]) }, () => msgNode.value = "");
        }
    }

    render() {
        const username = this.state.user.username;
        const { chats }: any = this.state;

        return (
            <div className="chatroom">
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat, idx) =>
                            <Message chat={chat} user={username} key={idx} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBot();

        this.ws.setReceive(this.receiveChat.bind(this))
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
            <li className={`chat ${this.state.user === this.state.chat.username ? "right" : "left"}`}>
                <span className="username">{this.state.chat.username}</span>
                <p>{this.state.chat.content}</p>
                {/* <span className="date">{this.state.chat.timestamp}</span> */}
            </li>
        )
    }
}


export default Chat;