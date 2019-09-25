import React from 'react';
import { applyStore } from '../store/store';

class TypingIndicator extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="typing-indicator">
                <div className="typing-name">{this.props.user.name}</div>
                <div className="typing-animation">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        )
    }
}

export default applyStore(TypingIndicator);