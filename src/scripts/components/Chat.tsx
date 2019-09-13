import React from 'react';
import ReactDOM from 'react-dom';

import sendicon from '../../icons/send.svg';

class Chat extends React.Component<any, any> {
    ws: any;
    typingTimeoutId: any;

    constructor(props) {
        super(props);

        this.ws = props.ws;
        this.state = {
            user: props.user,
            chats: [],
            typing: null,
        };

        this.onWsReceive = this.onWsReceive.bind(this);
        this.receiveChat = this.receiveChat.bind(this);
        this.showTyping = this.showTyping.bind(this);
    }

    scrollToBottom() {
        const el: any = ReactDOM.findDOMNode(this.refs.chats);
        el.scrollTop = el.scrollHeight;
    }

    receiveChat(data) {
        const chats = this.state.chats;
        chats.push(data);

        this.setState({ chats });
        if (data.id != this.state.user.id) {
            document.title = "You have a new message!";
        }
    }

    showTyping(data) {
        if (data.id != this.state.user.id) {
            const typing = { name: data.name }
            this.setState({ typing });

            clearTimeout(this.typingTimeoutId);
            this.typingTimeoutId = setTimeout(() => { this.setState({ typing: null }) }, 2000);
        }
    }

    onWsReceive(json) {
        const data = JSON.parse(json);

        if (data.dataType == "message") this.receiveChat(data);
        if (data.dataType == "typing") this.showTyping(data);
    }

    render() {
        const { chats }: any = this.state;

        return (
            <div className="chatroom">
                <ul className="chats" ref="chats">
                    {
                        <div className="chat-log">{'Welcome to JoyTalk, ' + this.state.user.name}</div>
                    }
                    {
                        chats.map((chat, idx) =>
                            <Message chat={chat} user={this.state.user.name} key={idx} />
                        )
                    }
                    {this.state.typing ? <div className="chat-log">{this.state.typing.name + ' is typing...'}</div> : null}
                </ul>
                <ChatInput ws={this.ws} user={this.state.user} />
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBottom();
        this.ws.setReceive(this.onWsReceive);
    }

    componentDidUpdate() {
        this.scrollToBottom();
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
        this.typingChat = this.typingChat.bind(this);
    }

    getStyle(): any {
        if (!this.state.ws.connected) return { opacity: 0.6, pointerEvents: "none" };
        else return { opacity: 1, pointerEvents: "initial" };
    }

    createChat(content) {
        return {
            id: this.state.user.id,
            name: this.state.user.name,
            content: content,
            timestamp: new Date().getTime(),
            dataType: 'message',
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

    typingChat(e) {
        const input: any = ReactDOM.findDOMNode(this.refs.msg);
        const text = input.value.replace(/\s\s+/g, ' ');
        const data = this.createChat(text);
        data.dataType = 'typing';
        this.state.ws.send(data);
    }

    render() {
        return (
            <form className="input" onSubmit={(e) => this.sendChat(e)} style={this.getStyle()}>
                <input type="text" ref="msg" placeholder="Type here..." onInput={e => this.typingChat(e)} />
                <input type="submit" id="submit" />
                <div className="sendimg" onClick={(e) => this.sendChat(e)}>
                    <img src={sendicon} alt="" />
                </div>
            </form>
        )
    }


}

export default Chat;