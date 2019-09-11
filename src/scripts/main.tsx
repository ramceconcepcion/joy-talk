import React from 'react';

import Chat from './components/Chat';
import WebSocket from './services/websocket';

class App extends React.Component<any, any> {
    ws: any = WebSocket

    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "Potato"
            }
        }
    }

    getUser() {
        const code = prompt("Enter passcodes: ");

        if (code === "123") this.state.user.username = "Joy";
        else if (code === "321") this.state.user.username = "Potato";
    }

    public render() {
        return (
            <div className="container-wrapper">
                <div className="app-window">
                    <h3>JoyTalk</h3>
                    <Chat user={this.state.user} ws={this.ws} />
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.ws.run();
        this.getUser();
    }

    componentDidMount() {
    }
}

export default App;
