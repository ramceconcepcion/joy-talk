import React from 'react';
import ReactDOM from 'react-dom';

import { applyStore } from '../store/store';

import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ChatImagePreview from './ChatImagePreview';

class Chat extends React.Component<any, any> {
    scrollToBottomTimeoutId: any = null;
    ws: any = null;

    constructor(props) {
        super(props);

        this.state = {
            preview: null,
        };

        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.previewImage = this.previewImage.bind(this);
        this.closePreview = this.closePreview.bind(this);
    }

    scrollToBottom() {
        const func = () => {
            const el: any = ReactDOM.findDOMNode(this.refs.chats);
            el.scrollTop = el.scrollHeight;
        }

        clearTimeout(this.scrollToBottomTimeoutId);
        this.scrollToBottomTimeoutId = setTimeout(func, 100);
    }

    previewImage(e) {
        const src = e.target.getAttribute('data-content');
        this.setState({ preview: src });
    }

    closePreview(e) {
        this.setState({ preview: null })
    }

    render() {
        return (
            <div className="chat-wrapper">
                <ul className="chats" ref="chats">
                    {
                        <div className="welcome">{'Welcome to JoyTalk, ' + this.props.user.name}</div>
                    }
                    {
                        this.props.chats.map((chat, idx) =>
                            <ChatMessage chat={chat} key={idx} previewImage={this.previewImage} />
                        )
                    }
                    {!this.props.typing ? null :
                        <TypingIndicator />
                    }
                </ul>
                <ChatInput blinkChatNotif={this.props.blinkChatNotif} />
                <ChatImagePreview data={this.state.preview} closePreview={this.closePreview} />
            </div>
        );
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottom();
    }
}


export default applyStore(Chat);