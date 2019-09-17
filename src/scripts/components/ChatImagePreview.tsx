import React from 'react';

class ChatImagePreview extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }

        this.getSrc = this.getSrc.bind(this);
    }

    getStyle() {
        return { display: this.state.data ? "flex" : "none" };
    }

    getSrc() {
        return this.state.data ? this.state.data : "";
    }

    render() {
        return (
            <div className="chat-image-preview-wrapper" style={this.getStyle()} onClick={(e) => this.props.closePreview(e)}>
                <div className="chat-image-preview-close" onClick={(e) => this.props.closePreview(e)}>✕</div>
                <div className="chat-image-preview">
                    <img src={this.getSrc()} alt="" />
                </div>
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }
}

export default ChatImagePreview;