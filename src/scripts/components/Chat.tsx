import React from 'react';
import ReactDOM from 'react-dom';

class Chat extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            chats: [
                {
                    username: "Kevin Hsu",
                    content: "Hello World!",
                    timestamp: "1m ago",
                },
                {
                    username: "Alice Chen",
                    content: "Foo",
                    timestamp: "1m ago",
                },
                {
                    username: "Kevin Hsu",
                    content: "Hello World!",
                    timestamp: "1m ago",
                },
                {
                    username: "Alice Chen",
                    content: "Foo",
                    timestamp: "1m ago",
                },
                {
                    username: "Kevin Hsu",
                    content: "Hello World!",
                    timestamp: "1m ago",
                },
                {
                    username: "Alice Chen",
                    content: "Foo",
                    timestamp: "1m ago",
                },
                {
                    username: "Kevin Hsu",
                    content: "Hello World!",
                    timestamp: "1m ago",
                },
                {
                    username: "Alice Chen",
                    content: "Foo",
                    timestamp: "1m ago",
                },
                {
                    username: "Kevin Hsu",
                    content: "Hello World!",
                    timestamp: "1m ago",
                },
                {
                    username: "Alice Chen",
                    content: "Foo",
                    timestamp: "1m ago",
                },
                {
                    username: "Kevin Hsu",
                    content: "Hello World!",
                    timestamp: "1m ago",
                },
                {
                    username: "Alice Chen",
                    content: "Foo",
                    timestamp: "1m ago",
                },
                {
                    username: "Kevin Hsu",
                    content: "Hello World!",
                    timestamp: "1m ago",
                },
                {
                    username: "Alice Chen",
                    content: "Foo",
                    timestamp: "1m ago",
                },
            ]
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        const el: any = ReactDOM.findDOMNode(this.refs.chats);
        el.scrollTop = el.scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();

        // this.setState({
        //     chats: this.state.chats.concat([{
        //         username: "Kevin Hsu",
        //         content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
        //         img: "http://i.imgur.com/Tj5DGiO.jpg",
        //     }])
        // }, () => {
        //     ReactDOM.findDOMNode(this.refs.msg).value = "";
        // });
    }

    render() {
        const username = "Kevin Hsu";
        const { chats }: any = this.state;

        return (
            <div className="chatroom">
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat, idx) =>
                            <Message chat={chat} user={username} key={idx} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
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
            <li className={`chat ${this.state.user === this.state.chat.username ? "right" : "left"}`}>
                <span className="username">{this.state.chat.username}</span>
                <p>{this.state.chat.content}</p>
                <span className="date">{this.state.chat.timestamp}</span>
            </li>
        )
    }
}


export default Chat;