import React from 'react';
import menuicon from '../../icons/menu.svg';


class Header extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            connection: props.connection
        }
    }

    isAuthorized() {
        return !this.state.user ? false : true
    }

    getConnection() {
        return this.state.connection ? 'connection connected' : 'connection disconnected';
    }

    getConnectionTitle() {
        return this.state.connection ? 'You are connected to the server.' : 'You are disconnected from the server.';
    }

    render() {
        return (
            <div className="app-header">
                {
                    this.isAuthorized() ? <div className={this.getConnection()} title={this.getConnectionTitle()}></div>
                        : null
                }
                <div className="app-title">JoyTalk</div>


                {
                    this.isAuthorized() ? <div className="menu">
                        <img src={menuicon} alt="" />
                    </div> : null
                }
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.connection != this.props.connection) {
            this.setState({ connection: this.props.connection });
        }
    }
}


export default Header