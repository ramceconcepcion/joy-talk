import React from 'react';
import ReactDOM from 'react-dom';

import { arraysEqual } from '../misc/utils';

import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

class Chat extends React.Component<any, any> {
    scrollToBottomTimeoutId: any = null;

    constructor(props) {
        super(props);

        this.state = {
            ws: props.ws,
            user: props.user,
            chats: props.chats,
            typing: props.typing,
        };

        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom() {
        const func = () => {
            const el: any = ReactDOM.findDOMNode(this.refs.chats);
            el.scrollTop = el.scrollHeight;
            console.log('scroll to bottom');
        }

        clearTimeout(this.scrollToBottomTimeoutId);
        this.scrollToBottomTimeoutId = setTimeout(func, 100);
    }

    render() {
        const { chats }: any = this.state;

        return (
            <div className="chat-wrapper">
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
                <ChatInput ws={this.state.ws} user={this.state.user} />
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottom();

        if (!arraysEqual(prevProps.chats, this.props.chats)) {
            this.setState({ chats: this.props.chats });
        }
        if (prevProps.typing != this.props.typing) {
            this.setState({ typing: this.props.typing });
        }
    }
}


export default Chat;