import * as React from 'react';
import {Col, Row} from "react-bootstrap";
import '../styles/Sponsor.css';

export default class Sponsor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1,
            totalCount: 10,
            windowWidth: this.getWindowWidth()
        };
        window.addEventListener('resize', () => {
            this.setState({
                windowWidth: this.getWindowWidth()
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => {
            this.setState({
                windowWidth: this.getWindowWidth()
            });
        });
    }

    getWindowWidth = () => {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    };

    changeCurrentIndex = (currentIndex) => {
        if (currentIndex <= 0 || currentIndex > 10) return;
        this.setState({
            currentIndex
        });
    };

    render() {
        const current = this.state.currentIndex;
        const windowWidth = this.state.windowWidth;
        const sponsorDivs = [];

        for (let i = 0; i < 10; i++) {
            sponsorDivs.push(
                <div className={'logo-div'} style={{display: 'inline', padding: ((current !== (i+1)) ? 40 : 10)}}>
                    <img src={'images/some-logo.png'} className={'logo-img'} alt={'bosch'} width={((current !== (i+1)) ? 200 : 260)}/>
                </div>
            );
        }
        let width = windowWidth/2;
        const left = -((current-1)*280 + 140 - width);

        return (
            <div className={'sponsors-div'}>
                <Row style={{width: '100%'}}>
                    <Col sm={12}>
                        <div className={'sponsors-title'}>Our&nbsp;<b>Sponsors</b></div>
                    </Col>
                </Row>
                <Row style={{width: '100%'}} className={'sponsor-carousel-row'}>
                    <div className={'sponsor-carousel'} style={{ left }}>
                        {sponsorDivs}
                    </div>
                </Row>
                <Row style={{width: '100%'}}>
                    <Col className={'arrow-col'}>
                        <span className={'arrow arrow-left'} onClick={() => this.changeCurrentIndex(current - 1)}/>
                    </Col>
                    <Col className={'arrow-col'}>
                        {width >= 325 ? <p className={'sponsor-name'}>
                            HackerEarth
                        </p> : null}
                    </Col>
                    <Col className={'arrow-col'}>
                        <span className={'arrow arrow-right'} onClick={() => this.changeCurrentIndex(current + 1)}/>
                    </Col>
                </Row>
            </div>
        );
    }
}