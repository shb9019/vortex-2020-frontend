import React from 'react';
import Comment from './Comment';
import Navbar from '../../Navbar';
import '../../../styles/clueless.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answer_value: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.checkAnswer(this.props.question.id, this.state.answer_value);
    };

    handleAnswerChange = (event) => {
        this.setState(Object.assign({}, this.state, {answer_value: event.target.value}));
    };

    render() {
        const {question} = this.props;
        return (
            <div className="container-fluid clueless">
                <Navbar clueless={true}/>
                <div style={{marginTop: 80}}>
                    <div>
                        <Comment text={question.sourceCode}/>
                    </div>
                    <div>
                        <div className="row question-row">
                            {(question.image1 && question.image2)
                                ? <Row style={{width: '100%', margin: 0}}>
                                    <Col sm={6} className={'text-center'}>
                                        <img
                                            className="img-responsive question-img"
                                            src={'/images/clueless/' + question.image1}
                                            alt="Loading"
                                            height="40px"
                                        />
                                    </Col>
                                    <Col sm={6} className={'text-center'}>
                                        <img
                                            className="img-responsive question-img"
                                            src={'/images/clueless/' + question.image2}
                                            alt="Loading"
                                            height="40px"
                                        />
                                    </Col>
                                </Row>
                                : ((question.image1 ? <Row style={{width: '100%', margin: 0}}>
                                    <Col sm={12} className={'text-center'}>
                                        <img
                                            className="img-responsive question-img"
                                            src={'/images/clueless/' + question.image1}
                                            alt="Loading"
                                            height="40px"
                                        />
                                    </Col>
                                </Row> : null))}
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group question-form-group">
                            <label id="answer-label" htmlFor="answer"> Answer : </label>
                            <input
                                type="text"
                                className="form-control"
                                id="answer"
                                name="answer"
                                onChange={this.handleAnswerChange}
                                value={this.state.answer_value}
                            />
                        </div>
                        <input type="submit" className="btn btn-default clueless-submit-button" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Question;
