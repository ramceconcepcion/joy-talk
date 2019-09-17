import React from 'react';

class ThemePicker extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            show: props.show
        }
    }

    setStyle() {
        return { display: this.state.show ? "flex" : "none" }
    }

    applyTheme(el) {
        document.body.className = el.getAttribute('data-value');
        localStorage['joytalk_theme'] = el.getAttribute('data-value');

        this.props.close();
    }

    render() {
        const colors = ['primary', 'brown', 'purple', 'deeppurple', 'pink', 'red', 'indigo', 'lightblue', 'cyan',
            'teal', 'orange', 'deeporange', 'bluegrey', 'green', 'lime'];

        return (
            <div className="theme-menu" style={this.setStyle()}>
                {
                    colors.map((c, idx) => {
                        return <div key={idx} className="item" data-value={c} onClick={e => this.applyTheme(e.target)}></div>
                    })
                }
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
    }
}

export default ThemePicker;