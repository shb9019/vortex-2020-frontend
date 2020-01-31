import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    componentDidMount() {
        let el = ReactDOM.findDOMNode(this);
        ReactDOM.unmountComponentAtNode(el);
        el.outerHTML = this.createComment();
    }

    createComment() {
        let text = this.props.text;

        return `<!-- ${text} -->`;
    }

    render() {
        return <div />;
    }
}

export default Comment;