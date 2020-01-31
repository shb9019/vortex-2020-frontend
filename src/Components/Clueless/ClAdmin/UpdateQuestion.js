import React from 'react';
import axios from 'axios';
import validator from 'validator';

import '../../bootstrap/css/bootstrap.min.css';

class UpdateQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_value: null,
            question: null,
            showUpdateForm: 0,
            title_value: "",
            url_value: "",
            source_code_value: "",
            level_value: null,
            answer_value: "",
            admin: this.props.admin,
            err_msg: null
        }
    }

    handleIdChange = (event) => {
        this.setState(Object.assign({}, this.state, {id_value: event.target.value}));
    }

    handleTitleChange = (event) => {
        this.setState(Object.assign({}, this.state, {title_value: event.target.value}));
    }

    handleUrlChange = (event) => {
        this.setState(Object.assign({}, this.state, {url_value: event.target.value}));
    }

    handleSourceCodeChange = (event) => {
        this.setState(Object.assign({}, this.state, {source_code_value: event.target.value}));
    }

    handleLevelChange = (event) => {
        this.setState(Object.assign({}, this.state, {level_value: event.target.value}));
    }

    handleAnswerChange = (event) => {
        this.setState(Object.assign({}, this.state, {answer_value: event.target.value}));
    }

    handleGetIdSubmit = (event) => {
        event.preventDefault();
        this.getQuestion();
    }

    getQuestion = async () => {
        const res = await (axios.get('/api/question/getById/' + this.state.id_value));
        const q = res.data.question;

        this.setState(Object.assign({}, this.state, {
            title_value: q.title,
            url_value: q.url,
            source_code_value: q.sourceCode,
            answer_value: q.answer,
            level_value: q.level,
            showUpdateForm: 1
        }));
    }

    handleUpdateSubmit = (event) => {
        event.preventDefault();
        if(this.isDataValid()) {
            this.postQuestion();
        }
    }

    isDataValid = () => {
        const s = this.state;
        let msg = null;

        if(!s.url_value || validator.isEmpty(s.url_value)) {
            msg = "URL clue is needed";
        }
        else if(validator.contains(s.url_value, ' ')) {
            msg = "URL canot have spaces"
        }
        else if (!s.answer_value || validator.isEmpty(s.answer_value)) {
            msg="Answer is needed";
        }

        if(msg) {
            this.setState(Object.assign({}, this.state, {err_msg: msg}));
            return false;
        }
        else {
            return true;
        }
    }

    postQuestion = async () => {
        const s = this.state;
        let data = {
            title: s.title_value,
            url: s.url_value,
            sourceCode: s.source_code_value,
            answer: s.answer_value,
            level: s.level_value
        };

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let res = await (axios.put('/api/question/update/' + this.state.id_value, data, config));

        if(res.success) {
            alert("successful");
        }

        this.setState(Object.assign({}, this.state, {
            title_value: "",
            url_value: "",
            source_code_value: "",
            showUpdateForm: 0,
            err_msg: null
        }));
    }

    render() {
        return (
            <div>
                {this.state.err_msg
                    ? (<div class="alert alert-danger">
                            <strong>{this.state.err_msg}</strong>
                    </div>)
                    : ''
                }
                {this.state.showUpdateForm
                    ? (<form onSubmit={this.handleUpdateSubmit}>
                        <div className="form-group">
                            <label htmlFor="title"> Title Clue: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                onChange={this.handleTitleChange}
                                value={this.state.title_value}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="url"> URL Clue: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="url"
                                name="url"
                                onChange={this.handleUrlChange}
                                value={this.state.url_value}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceCode"> Source Code Clue: </label>
                            <textarea
                                className="form-control"
                                id="sourceCode"
                                name="sourceCode"
                                onChange={this.handleSourceCodeChange}
                                value={this.state.source_code_value}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="level"> Level: </label>
                            <input
                                type="number"
                                className="form-control"
                                id="level"
                                name="level"
                                onChange={this.handleLevelChange}
                                value={this.state.level_value}
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="answer"> Answer: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="answer"
                            name="answer"
                            onChange={this.handleAnswerChange}
                            value={this.state.answer_value}
                        />
                    </div>
                        <input type="submit" className="btn btn-default" value="Submit" />
                    </form>)
                    : (<form onSubmit={this.handleGetIdSubmit}>
                        <div className="form-group">
                            <label htmlFor="id"> Question ID: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                name="id"
                                onChange={this.handleIdChange}
                                value={this.state.id_value}
                            />
                        </div>
                        <input type="submit" className="btn btn-default" value="Submit" />
                    </form>)
                }
            </div>
        );
    }
}

export default UpdateQuestion;
