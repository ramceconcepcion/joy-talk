import React from 'react';

import Chat from './components/Chat';

class App extends React.Component {
    public render() {
        return (
            <div className="container-wrapper">
                <div className="app-window">
                    <h3>JoyTalk</h3>
                    <Chat />
                </div>
            </div>
        )
    }
}

export default App;
