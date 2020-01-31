import React from 'react';
import axios from 'axios';

import '../../bootstrap/css/bootstrap.min.css';

class QuestionGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null,
            admin: this.props.admin
        };
    }

    componentDidMount() {
        this.getQuestions();
    }

    getQuestions = async () => {
        let res = await (axios.get('/api/question/getAll'));
        this.setState(Object.assign({}, this.state, {questions: res.data.questions}));
    }

    handleDelete = async (id) => {
        const res = await (axios.delete('/api/question/deleteById/' + id));
        alert("Successfully Deleted");

        this.getQuestions();
    }

    render() {
        const qs = this.state.questions;
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td> ID </td>
                            <td> Title Clue </td>
                            <td> URL Clue </td>
                            <td> Source Code Clue</td>
                            <td> Image1 </td>
                            <td> Image2 </td>
                            <td> Level No. </td>
                            <td> Answer </td>
                            <td> Action </td>
                        </tr>
                    </thead>
                    <tbody>
                        {qs ? qs.map(q => (
                                <tr key={q.id}>
                                    <td> {q.id} </td>
                                    <td> {q.title} </td>
                                    <td> {q.url} </td>
                                    <td> {q.sourceCode} </td>
                                    <td>  {q.image1}</td>
                                    <td>  {q.image2}</td>
                                    <td> {q.level ? q.level : (q.level === 0 ? 0 : 'not set')} </td>
                                    <td> {q.answer} </td>
                                    <td> 
                                        <button 
                                            type="button" 
                                            className="btn btn-danger" 
                                            onClick={() => {this.handleDelete(q.id)}}>
                                            
                                            <span className="glyphicon glyphicon-trash"></span> 
                                        </button>
                                    </td>
                                </tr>))
                            : ''
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default QuestionGallery;