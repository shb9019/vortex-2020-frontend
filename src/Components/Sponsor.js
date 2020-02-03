import * as React from 'react';
import {Col, Row} from "react-bootstrap";
import '../styles/Sponsor.css';

export default class Sponsor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 2,
            totalCount: 4,
            windowWidth: this.getWindowWidth(),
            sponsorImgs: ['souled-store.png', 'practisc.svg', 'zoomin.svg', 'tcf.svg', 'uniq.jpeg'],
            sponsorDescriptions: ['Official Gifting Partner', 'Memento Sponsor', 'Associate Partner', 'Official Ticketing Partner', 'Merchandise Sponsor'],
            sponsorLinks: ['https://www.thesouledstore.com/', 'https://www.practisclabs.com', 'https://www.zoomin.com/', 'https://www.thecollegefever.com/', 'https://www.uniqtechnologies.co.in/']
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
        const {sponsorImgs} = this.state;
        if (currentIndex < 0 || currentIndex > (sponsorImgs.length - 1)) return;
        this.setState({
            currentIndex
        });
    };

    render() {
        const {currentIndex, windowWidth, sponsorImgs, sponsorDescriptions, sponsorLinks} = this.state;
        const sponsorDivs = [];

        sponsorImgs.forEach((sponsorImg, index) => {
            sponsorDivs.push(
                <div className={'logo-div'} style={{display: 'inline', padding: ((currentIndex !== index) ? 40 : 10)}}>
                    <a href={sponsorLinks[index]} target={'_blank'}><img src={`images/${sponsorImg}`} className={'logo-img'} alt={sponsorImg}
                         width={((currentIndex !== index) ? 200 : 260)}/></a>
                </div>
            );
        });

        let width = windowWidth / 2;
        const left = -((currentIndex) * 280 + 140 - width);

        return (
            <div className={'sponsors-div'} style={{paddingBottom: 80}}>
                <Row style={{width: '100%', margin: 0}}>
                    <Col sm={12}>
                        <div className={'sponsors-title'}>Our&nbsp;<b>Sponsors</b></div>
                    </Col>
                </Row>
                <Row style={{width: '100%'}} className={'sponsor-carousel-row'}>
                    <div className={'sponsor-carousel'} style={{left}}>
                        {sponsorDivs}
                    </div>
                </Row>
                <Row style={{width: '100%'}}>
                    {width >= 325 ? <Col sm={2} className={'arrow-col'}>
                        <span className={'arrow arrow-left'} onClick={() => this.changeCurrentIndex(currentIndex - 1)}/>
                    </Col> : <Col className={'arrow-col'}>
                        <span className={'arrow arrow-left'} onClick={() => this.changeCurrentIndex(currentIndex - 1)}/>
                    </Col>}
                    {width >= 325 ? <Col sm={8} className={'arrow-col'}>
                        <p className={'sponsor-name'}>
                            {sponsorDescriptions[currentIndex]}
                        </p>
                    </Col> : <Col className={'arrow-col'}>
                        {width >= 325 ? <p className={'sponsor-name'}>
                            {sponsorDescriptions[currentIndex]}
                        </p> : null}
                    </Col>}
                    {width >= 325 ? <Col sm={2} className={'arrow-col'}>
                        <span className={'arrow arrow-right'}
                              onClick={() => this.changeCurrentIndex(currentIndex + 1)}/>
                    </Col> : <Col className={'arrow-col'}>
                        <span className={'arrow arrow-right'}
                              onClick={() => this.changeCurrentIndex(currentIndex + 1)}/>
                    </Col>}
                </Row>
            </div>
        );
    }
}