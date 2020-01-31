import React from 'react';
import Comment from './Comment';

import '../../css/clueless.css';

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
    }

    handleAnswerChange = (event) => {
        this.setState(Object.assign({}, this.state, {answer_value: event.target.value}));
    }

    render() {
        const { question } = this.props;
        return (
            <div className="container-fluid clueless">
                <div>
                    <Comment text={question.sourceCode} />
                </div>
                <div>
                    <a href="/">
                      <button className="btn btn-default home-fa-button">
                        <i class="fa fa-home" id="home-fa"></i>
                      </button>
                    </a>
                    <p id="clueless-heading">Level {this.props.question.level}</p>
                    <a href="/clueless/leaderboard/1">
                      <button className="btn btn-default leaderboard-button">
                        <i class="fa fa-trophy" id="leaderboard"></i>
                      </button>
                    </a>
                    <div class="row question-row">
                    { (question.image1 && question.image2)
                      ?
                      <div>
                        <div class="col-md-6">
                          <img
                                      className="img-responsive question-img"
                                      src={'/images/clueless/' + question.image1}
                                      alt="Loading"
                                      height="40px"
                                      download="asdf.jpg"
                                  />
                        </div>
                        <div class="col-md-6">
                          <img
                                      className="img-responsive question-img"
                                      src={'/images/clueless/' + question.image2}
                                      alt="Loading"
                                      height="40px"
                                      download="asdf.jpg"
                                  />
                        </div>
                      </div>
                      : (question.image1)
                        ?  <div class="col-md-12">
                            <img
                                        className="img-responsive question-img"
                                        src={'/images/clueless/' + question.image1}
                                        alt="Loading"
                                        height="40px"
                                        download="asdf.jpg"
                                    />
                          </div>
                        : ''
                    }
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group question-form-group">
                        <label id="answer-label" htmlFor="answer"> Answer: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="answer"
                            name="answer"
                            onChange={this.handleAnswerChange}
                            value={this.state.answer_value}
                        />
                    </div>
                    <input type="submit" className="btn btn-default clueless-submit-button" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Question;
