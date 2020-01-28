import * as React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import '../styles/ComingSoon.css';

export default class ComingSoon extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <section style={{minHeight: '100vh'}} className={'coming-soon-section'}>
                    <h1>COMING SOON</h1>
                </section>
                <Footer/>
            </div>
        );
    }
}