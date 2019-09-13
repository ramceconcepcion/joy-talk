import React from 'react';
import ReactDOM from 'react-dom';

import sendicon from '../../icons/send.svg';

class Chat extends React.Component<any, any> {
    ws: any;
    notifyTimeoutId: any;

    constructor(props) {
        super(props);

        this.ws = props.ws;
        this.state = {
            user: props.user,
            chats: [],
        };

        this.receiveChat = this.receiveChat.bind(this);
    }

    scrollToBot() {
        const el: any = ReactDOM.findDOMNode(this.refs.chats);
        el.scrollTop = el.scrollHeight;
    }


    receiveChat(json) {
        const data = JSON.parse(json);
        const chats = this.state.chats;
        chats.push(data);

        this.setState({ chats });
        if (data.id != this.state.user.id) {
            document.title = "You have a new message!";
        }
    }

    render() {
        const { chats }: any = this.state;

        return (
            <div className="chatroom">
                <ul className="chats" ref="chats">
                    {
                        <div className="chat-log" > {'Welcome to JoyTalk, ' + this.state.user.name}</div>
                    }
                    {
                        chats.map((chat, idx) =>
                            <Message chat={chat} user={this.state.user.name} key={idx} />
                        )
                    }
                </ul>
                <ChatInput ws={this.ws} user={this.state.user} />
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBot();
        this.ws.setReceive(this.receiveChat);
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

    getTime() {
        const ts = this.state.chat.timestamp;
        const date = new Date(ts);

        let h: any = date.getHours();
        let m: any = date.getMinutes();
        const suffix = h > 12 ? "PM" : "AM";

        h = h > 12 ? h - 12 : h;
        h = h > 9 ? h : '0' + h;
        m = m > 9 ? m : '0' + m;

        return `${h}:${m}${suffix}`;
    }

    public render() {
        return (
            <li className={`chat ${this.state.user === this.state.chat.name ? "right" : "left"}`}>
                <span className="username">{this.state.chat.name}</span>
                <p className="message">{this.state.chat.content}</p>
                <span className="date">{this.getTime()}</span>
            </li>
        )
    }
}

class ChatInput extends React.Component<any, any>{

    constructor(props) {
        super(props);

        this.state = {
            ws: props.ws,
            user: props.user
        }

        this.sendChat = this.sendChat.bind(this);
        this.createChat = this.createChat.bind(this);
    }

    createChat(content) {
        return {
            id: this.state.user.id,
            name: this.state.user.name,
            content: content,
            timestamp: new Date().getTime()
        }
    }

    sendChat(e) {
        e.preventDefault();
        const input: any = ReactDOM.findDOMNode(this.refs.msg);
        const text = input.value.replace(/\s\s+/g, ' ');

        if (text != " " && text != "") {
            const data = this.createChat(text);
            this.state.ws.send(data);
        }

        input.value = "";
        document.title = "Joy Talk";
    }

    render() {
        return (
            <form className="input" onSubmit={(e) => this.sendChat(e)}>
                <input type="text" ref="msg" placeholder="Type here..." />
                <input type="submit" id="submit" />
                <div className="sendimg" onClick={(e) => this.sendChat(e)}>
                    <img src={sendicon} alt="" />
                </div>
            </form>
        )
    }
}

export default Chat;