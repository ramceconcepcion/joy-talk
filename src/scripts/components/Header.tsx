import React from 'react';
import menuicon from '../../icons/menu.svg';


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

class ThemePicker extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }
    }

    getClass() {
        return "item" + "";
    }

    setStyle() {
        return { display: this.state.show ? "flex" : "none" }
    }

    applyTheme(el) {
        document.body.className = el.getAttribute('data-value');
        localStorage['joytalk_theme'] = el.getAttribute('data-value');
    }

    render() {
        const colors = ['primary', 'gray', 'purple', 'deeppurple', 'pink', 'red', 'indigo', 'lightblue', 'cyan',
            'teal', 'orange', 'deeporange', 'bluegrey', 'green', 'lime'];

        return (
            <div className="theme-menu" style={this.setStyle()}>
                {
                    colors.map(c => {
                        return <div className={this.getClass()} data-value={c} onClick={e => this.applyTheme(e.target)}></div>
                    })
                }
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show != this.props.show) {
            this.setState({ show: this.props.show });
        }
    }
}


export default Header