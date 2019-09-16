import React from 'react';
import ReactDOM from 'react-dom';

class ChatMessage extends React.Component<any, any> {
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
                <p className="message">{
                    this.state.chat.content.split('<br/>').map((c, i) => <span key={i}>{c}</span>)
                }</p>
                <span className="date">{this.getTime()}</span>
            </li>
        )
    }
}

export default ChatMessage;
