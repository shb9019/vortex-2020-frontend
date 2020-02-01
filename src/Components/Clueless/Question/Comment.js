import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        this.setState({
            text: this.props.text
        });
        document.getElementById('clue').innerHTML = `<-- ${this.props.text} -->`;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            text: nextProps.text
        });
        document.getElementById('clue').innerHTML = `<-- ${nextProps.text} -->`;
    }


    render() {
        return <div id={'clue'}/>;
    }
}

export default Comment;