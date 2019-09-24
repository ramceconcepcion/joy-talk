import React from 'react';
import { connect } from 'react-redux';
import { applyStore } from '../store/map';

import menuicon from '../../icons/menu.svg';

import { arraysEqual } from '../misc/utils';

import ThemePicker from './ThemePicker';
import Members from './Members';

class Header extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            connection: props.connection,
            showThemeMenu: false,
            showMembers: false,
        }

        this.toggleThemeMenu = this.toggleThemeMenu.bind(this);
        this.toggleMembers = this.toggleMembers.bind(this);
    }

    isAuthorized() {
        return !this.props.user ? false : true
    }

    getConnection() {
        return this.state.connection ? 'connection connected' : 'connection disconnected';
    }

    getConnectionTitle() {
        return this.state.connection ? 'You are connected to the server.' : 'You are disconnected from the server.';
    }

    toggleThemeMenu() {
        this.setState({ showMembers: false });
        this.setState({ showThemeMenu: this.state.showThemeMenu ? false : true });
    }

    toggleMembers() {
        this.setState({ showThemeMenu: false });
        this.setState({ showMembers: this.state.showMembers ? false : true });
    }

    render() {
        return (
            <div className="app-header">
                <div className={this.getConnection()}
                    onClick={(e) => this.toggleMembers()}
                    title={this.getConnectionTitle()}></div>
                <div className="app-title">JoyTalk</div>
                <div className="menu" onClick={(e) => this.toggleThemeMenu()}>
                    <img src={menuicon} alt="" />
                </div>
                {/* <HeaderMenu show={false} /> */}
                {<ThemePicker show={this.state.showThemeMenu} close={this.toggleThemeMenu} />}
                {<Members show={this.state.showMembers} />}
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.connection !== this.props.connection) {
            this.setState({ connection: this.props.connection });
        }

        // if (prevProps.user !== this.props.user) {
        //     this.setState({ user: this.props.user });
        // }

        // if (!arraysEqual(prevProps.users, this.props.users)) {
        //     this.setState({ users: this.props.users });
        // }
    }
}


export default applyStore(Header)