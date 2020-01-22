import * as React from 'react';
import '../styles/Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className={'footer-div'}>
                <p className={'footer-text'}>Made with <a className={'footer-easter-egg'} href={'https://delta.nitt.edu'}>&#10084;&#65039;</a>️ by CSEA, NIT Trichy</p>
            </div>
        );
    }
}