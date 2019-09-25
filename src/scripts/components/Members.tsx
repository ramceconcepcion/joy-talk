import React from 'react';
import { applyStore } from '../store/store';

class Members extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
        }
    }

    setStyle() {
        return { display: this.state.show ? "flex" : "none" }
    }

    setStatus(user) {
        return user.status ? "status connected" : "status disconnected"
    }

    render() {
        return (
            <div className="members" style={this.setStyle()}>
                {
                    this.props.users.map((u, i) => {
                        return <div className="member-item" key={i} data-id={u.id}>
                            <span className={this.setStatus(u)}></span>
                            <span className="name">{u.name}</span>
                        </div>
                    })
                }
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
        // if (!arraysEqual(prevProps.users, this.props.users)) {
        //     this.setState({ users: this.props.users });
        // }
    }
}

export default applyStore(Members)