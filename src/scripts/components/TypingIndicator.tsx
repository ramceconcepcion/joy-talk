import React from 'react';

class TypingIndicator extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            user: props.user
        }
    }

    render() {
        return (
            <div className="typing-indicator">
                <div className="typing-name">{this.state.user.name}</div>
                <div className="typing-animation">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        )
    }
}

export default TypingIndicator;