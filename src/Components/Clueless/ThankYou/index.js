import React from 'react';
import Navbar from "../../Navbar";
import Footer from "../../Footer";

class ThankYou extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar clueless={true}/>
                <section style={{minHeight: '100vh'}} className={'coming-soon-section'}>
                    <h1>Thank you for playing clueless</h1>
                </section>
                <Footer/>
            </div>
        );
    }
}

export default ThankYou;
