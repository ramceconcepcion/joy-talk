import React from 'react';
import ReactDOM from 'react-dom';

import sendicon from '../../icons/send.svg';
import { throwStatement } from '@babel/types';

class ChatInput extends React.Component<any, any>{
    typingTimeoutId: any;

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
        const text = input.value.replace(/\n/g, "<br/>").replace(/\s\s+/g, ' ');

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
        data.content = '';

        clearTimeout(this.typingTimeoutId);
        this.typingTimeoutId = setTimeout(() => { this.state.ws.send(data); }, 50);
    }

    allowNewLine(e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            this.sendChat(e);
        }
    }

    render() {
        return (
            <form className="input" onSubmit={(e) => this.sendChat(e)} style={this.getStyle()}>
                <textarea className="msgbox" ref="msg" placeholder="Type here..."
                    onKeyDown={e => this.allowNewLine(e)}
                    onInput={e => this.typingChat(e)} />
                <input className="submitbtn" type="submit" />
                <div className="sendimg" onClick={(e) => this.sendChat(e)}>
                    <img src={sendicon} alt="" />
                </div>
            </form>
        )
    }


}

export default ChatInput;