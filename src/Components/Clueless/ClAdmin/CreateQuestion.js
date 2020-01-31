import React from 'react';
import axios from 'axios';
import validator from 'validator';

import '../../bootstrap/css/bootstrap.min.css';

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title_value: "",
            url_value: "",
            source_code_value: "",
            level_value: null,
            answer_value: "",
            selectedFiles: null,
			loaded : 0,
            admin: this.props.admin,
            err_msg: null
        };
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

    handleImageChange = (event) => {
		    this.setState(Object.assign({}, this.state, {selectedFiles: event.target.files}));
	  }

    handleSubmit = (event) => {
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
        else if(Array.from(s.selectedFiles).length > 2) {
            msg="Max 2 images can be uploaded";
        }

        if(msg) {
            this.setState(Object.assign({}, this.state, {err_msg: msg}));
            return false;
        }
        else {
            this.setState(Object.assign({}, this.state, {err_msg: msg}));
            return true;
        }
    }

    postQuestion = async () => {
        const question = {
            title: this.state.title_value,
            url: this.state.url_value,
            sourceCode: this.state.source_code_value,
            level: this.state.level_value,
            answer: this.state.answer_value
        }
        const images = Array.from(this.state.selectedFiles);

        const data = new FormData();
		images.forEach(image => {
            data.append('images[]', image);
        });
		data.append('question', JSON.stringify(question)); //didn't want to add all values separately

        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const res = await (axios.post('/api/question/create', data, config));

        if(res.data.success) {
            alert("successful");
        }

        this.setState(Object.assign({}, this.state, {
            title_value: "",
            url_value: "",
            source_code_value: "",
            answer_value: "",
            level_value: null,
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
                <form onSubmit={this.handleSubmit}>
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
                    <div className="form-group">
                        <label htmlFor="image"> Images: </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={this.handleImageChange}
                            multiple
                        />
                    </div>
                    <input type="submit" className="btn btn-default" value="Submit" />
                </form>
            </div>
        )
    }

}

export default QuestionForm;
