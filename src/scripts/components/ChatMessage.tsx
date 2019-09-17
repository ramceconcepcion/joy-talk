import React from 'react';
import ReactDOM from 'react-dom';

class ChatMessage extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            chat: props.chat,
            user: props.user
        }

        this.getContent = this.getContent.bind(this);
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

    getContent() {
        if (this.state.chat.type == "text") {
            return this.state.chat.content.split('<br/>').map((c, i) => <span key={i}>{c}</span>)
        }
        else if (this.state.chat.type == "image") {
            return <img src={this.state.chat.content} data-content={this.state.chat.content} alt={this.state.chat.name} onClick={e => this.props.previewImage(e)} />
        }
    }

    public render() {
        return (
            <li className={`chat ${this.state.user === this.state.chat.name ? "right" : "left"}`}>
                <span className="username">{this.state.chat.name}</span>
                <p className="message">{this.getContent()}</p>
                <span className="date">{this.getTime()}</span>
            </li>
        )
    }
}

export default ChatMessage;
