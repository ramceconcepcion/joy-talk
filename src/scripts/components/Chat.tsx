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

        this.sendChat = this.sendChat.bind(this);
        this.receiveChat = this.receiveChat.bind(this);
        this.createChat = this.createChat.bind(this);
    }

    scrollToBot() {
        const el: any = ReactDOM.findDOMNode(this.refs.chats);
        el.scrollTop = el.scrollHeight;
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
            this.ws.send(data);
        }

        input.value = "";
        this.changeTitle("Joy Talk");
    }

    receiveChat(json) {
        const data = JSON.parse(json);
        // if (data.id !== this.state.user.id) {
        //     this.setState({ chats: this.state.chats.concat([data]) });
        // }

        this.setState({ chats: this.state.chats.concat([data]) });
        if (data.id != this.state.user.id) {
            this.changeTitle("You have a new message!");
        }
    }


    changeTitle(msg) {
        document.title = msg;
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
                    <input type="text" ref="msg" placeholder="Type here..." />
                    <input type="submit" id="submit" />
                    <div className="sendimg" onClick={(e) => this.sendChat(e)}>
                        <img src={sendicon} alt="" />
                    </div>
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

    getTime() {
        const ts = this.state.chat.timestamp;
        const date = new Date(ts);

        let h: any = date.getHours();
        h = h > 9 ? h : '0' + h;
        let m: any = date.getMinutes();
        m = m > 9 ? m : '0' + m;

        return `${h}:${m}`;
    }

    public render() {
        return (
            <li className={`chat ${this.state.user === this.state.chat.name ? "right" : "left"}`}>
                <span className="username">{this.state.chat.name}</span>
                <p>{this.state.chat.content}</p>
                <span className="date">{this.getTime()}</span>
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