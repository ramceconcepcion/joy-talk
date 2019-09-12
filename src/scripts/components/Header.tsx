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

    toggleMenu() {

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

                {/* <Menu /> */}
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.connection != this.props.connection) {
            this.setState({ connection: this.props.connection });
        }
    }
}

class Menu extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-menu">
                <div className="item">Themes</div>
                <div className="item">Name</div>
                <div className="item">Passcode</div>
            </div>
        )
    }
}

class ThemePicker extends React.Component<any, any>{

}


export default Header