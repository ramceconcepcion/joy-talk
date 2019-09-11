import React from 'react';

import Chatroom from './components/Chatroom'

class App extends React.Component {
    public render() {
        return (
            <div className="app-wrapper">
                <Chatroom />
            </div>
        )
    }
}


export default App;
