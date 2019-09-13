import React from 'react';
import ReactDOM from 'react-dom';

import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

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
            this.setState({ typing: null });
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
                        <div className="welcome">{'Welcome to JoyTalk, ' + this.state.user.name}</div>
                    }
                    {
                        chats.map((chat, idx) =>
                            <ChatMessage chat={chat} user={this.state.user.name} key={idx} />
                        )
                    }
                    {!this.state.typing ? null :
                        <TypingIndicator user={this.state.typing} />
                    }
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


export default Chat;