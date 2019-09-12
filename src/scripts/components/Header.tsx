import React from 'react';
import menuicon from '../../icons/menu.svg';

import ThemePicker from './ThemePicker';

class Header extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            connection: props.connection,
            showThemeMenu: false,
        }

        this.toggleThemeMenu = this.toggleThemeMenu.bind(this);
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

    toggleThemeMenu() {
        this.setState({ showThemeMenu: this.state.showThemeMenu ? false : true });
    }

    render() {
        return (
            <div className="app-header">
                {
                    !this.isAuthorized() ? null :
                        <div className={this.getConnection()} title={this.getConnectionTitle()}></div>
                }
                <div className="app-title">JoyTalk</div>
                {
                    !this.isAuthorized() ? null :
                        <div className="menu" onClick={(e) => this.toggleThemeMenu()}>
                            <img src={menuicon} alt="" />
                        </div>
                }

                {/* <Menu /> */}
                {<ThemePicker show={this.state.showThemeMenu} />}
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



export default Header