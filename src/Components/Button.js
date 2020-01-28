import * as React from 'react';
import '../styles/Button.css';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cover">
                <div className="wrapper">
                    <a href={this.props.href} style={{padding: '15px 30px', border: '2px solid #FFF'}}
                       className="btn10" target={'_blank'}>
                        <span>{this.props.text}</span>
                        <div className="transition"/>
                    </a>
                </div>
            </div>
        )
    }
}
