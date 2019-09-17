import React from 'react';

class HeaderMenu extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }
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

export default HeaderMenu;