import React from 'react';
import ReactDOM from 'react-dom';

import sendicon from '../../icons/send.svg';

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
        const data = this.createChat(input.value);
        this.ws.send(data);
        input.value = "";
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